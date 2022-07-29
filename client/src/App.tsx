import './App.css';

import {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ContextFrom,
  State,
  StateValueFrom,
} from 'xstate';

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
  TAppCreateDTO,
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
import { transitionFromPath } from './utils/routes';

type MachineContext = {
  service: Service;
  send: Service['send'];
};

type C = ContextFrom<typeof fabbleMachine>;
type S = State<C>;

export const selectApps = ({ context } : S) => context.apps;
export const selectAppToDelete = ({ context }: S) => context.appToDelete;
export const selectActiveApp = ({ context }: S) => context.apps[context.activeAppIndex];
export const selectActiveAppDataConfig = (state: S) => {
  const activeApp = selectActiveApp(state);
  if (!activeApp) {
    return '';
  }
  return activeApp.config.data;
};
export const selectActivePageMarkup= (state : S) => {
  const activeApp = selectActiveApp(state);
  if (!activeApp) {
    return '';
  }
  return activeApp.config.pages[state.context.activePageIndex ?? 0].markup ?? '';
};
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

  const createAppMutations = useMutation(async (app: TAppCreateDTO) => {
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
      editingApp: undefined,
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
      savePage: async (context, event) => {
        await createAppMutations.mutateAsync(context.apps[context.activeAppIndex]);
        queryClient.invalidateQueries(['apps']);
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
      service.send({ type: 'SET_SESSION', session });
      setSession(session ?? undefined);
    });
  }, [service]);

  service.send(transitionFromPath() as any);

  return (
    <FabbleMachineContext.Provider value={{ service, send: service.send }}>
      <Flex flexDirection="column" h="full">
        <div>
          <MainMenu />
        </div>
        <Box h="full">
          <Route match="authenticated.editingApp.pageEditor">
            <PageEditor />
          </Route>
          <Route match="authenticated.editingApp.data">
            <Data />
          </Route>
          <Route match="authenticated.editingApp.composer">
            <Composer />
          </Route>
          <Route match="unauthenticated">
            <SignIn />
          </Route>
          <Route match="authenticated.account">
            <Account />
          </Route>
          <Route match="authenticated.apps">
            <Apps />
          </Route>
        </Box>

      </Flex>
    </FabbleMachineContext.Provider>
  );
};
export default App;

const Route: FC<{ match: StateValueFrom<typeof fabbleMachine> }> = ({ children, match }) => {
  const { service } = useFabbleMachine();
  const matches = useSelector(service, (state) => state.matches(match));

  if (!matches) {
    return null;
  }
  return <>{children}</>;
};
