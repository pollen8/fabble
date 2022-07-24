import './App.css';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { State } from 'xstate';

import {
  Box,
  extendTheme,
  Flex,
} from '@chakra-ui/react';
import { Session } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import {
  useInterpret,
  useSelector,
} from '@xstate/react';

import {
  Apps,
  TApp,
} from './apps/Apps';
import { Account } from './auth/Account';
import { SignIn } from './auth/SignIn';
import { MainMenu } from './common/header/MainMenu';
import { Composer } from './composer/Composer';
import { Data } from './data/Data';
import {
  fabbleMachine,
  Service,
} from './fabble.machine';
import { PageEditor } from './pageEditor/PageEditor';
import { supabase } from './supabaseClient';
import { queryClient } from './utils/queryClient';

type MachineContext = {
  service: Service;
  send: Service['send'];
};

type C = typeof fabbleMachine['context'];
type S = State<C>;

export const selectApps = ({ context } : S) => context.apps;
export const selectAppToDelete = ({ context }: S) => context.appToDelete;
export const selectActiveApp = ({ context }: S) => context.apps[context.activeAppIndex];

export const selectPages = (state: S) => {
  const app = selectActiveApp(state);
  return app?.config?.pages ?? [];
};

export const selectActivePage = (state: S) =>{
  const pages = selectPages(state);
  return pages[state.context.editingPageIndex] ?? {};
};
export const FabbleMachineContext = createContext({} as MachineContext);

export const selectAppTheme = (state: S) => {
  return extendTheme(state.context.app.theme);
};
export const useFabbleMachine = () => useContext(FabbleMachineContext);

const App = () => {
  const [session, setSession] = useState<Session>();

  const deleteAppMutation = useMutation(async (id: string) => {
    const { data, error } = await supabase.from<TApp>('apps').delete().match({ id });
    if (error) {
      throw error;
    }
    return data;
  });

  const createAppMutations = useMutation(async (app: Partial<TApp>) => {
    const { error } = await supabase.from<TApp>('apps').upsert((app), {
      returning: 'minimal', // Don't return the value after inserting
    });
    if (error) {
      throw error;
    }
  });


  const service = useInterpret(fabbleMachine, {
    context: {
      session,
      editingPageIndex: 0,
      apps: [],
      editingApp: {},
      app: {
        theme: {},
      },
    },
    services: {
      loadApps: async () => {
        const user = supabase.auth.user();
        const apps = await queryClient.fetchQuery<TApp[]>(['apps'], async () => {
          const { data, error } = await supabase
              .from<TApp>('apps')
              .select(`id, name, created_at, config`)
              .eq('user_id', user?.id ?? '');
          if (error) {
            throw error;
          }
          return data ?? [];
        });
        ;
        return { apps };
      },
      saveApp: async (context, event) => {
        console.log('supabase save app', event.app);
        await createAppMutations.mutateAsync(event.app);
        queryClient.invalidateQueries(['apps']);
      },
      deleteApp: async (context) => {
        if (!context?.appToDelete) {
          return;
        }
        await deleteAppMutation.mutateAsync(context?.appToDelete?.id ?? '');
        queryClient.invalidateQueries(['apps']);
      },
      loadPage: async () => ({ page: '' }),
      signOut: async () => {
        await supabase.auth.signOut();
      },
      signIn: async () => {
        const { user, session, error } = await supabase.auth.signIn({
          provider: 'google',
        });
        if (!user || !session) {
          throw new Error('no user found');
        }
        if (error) {
          throw new Error(error.message);
        }
        return { user, session };
      },
      getProfile: async () => {
        const user = supabase.auth.user();
        console.log('get profile user', user);
        const { data, error } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', user?.id)
            .single();
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
      savePage: async () => {
        return true;
      },
      saveProfile: async (context) => {
        const updates = {
          ...context.profile,
          updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates, {
          returning: 'minimal', // Don't return the value after inserting
        });
        return true;
      },
    },
  });

  useEffect(() => {
    setSession(supabase?.auth?.session() ?? undefined);

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('on auth change', session);
      service.send({ type: 'SET_SESSION', session });
      setSession(session ?? undefined);
    });
  }, [service]);

  return (
    <FabbleMachineContext.Provider value={{ service, send: service.send }}>
      <Flex flexDirection="column" h="full">
        <div>
          <MainMenu />
        </div>
        <Box h="full">
          <PageEditor />
          <Data />
          <Composer />
          <SignIn />
          <Account />
          <Apps />
        </Box>
      </Flex>
    </FabbleMachineContext.Provider>
  );
};
export default App;
