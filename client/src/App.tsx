import './App.css';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Session } from '@supabase/supabase-js';
import {
  useInterpret,
  useSelector,
} from '@xstate/react';

import { Account } from './auth/Account';
import { SignIn } from './auth/SignIn';
import { MainMenu } from './components/header/MainMenu';
import { Composer } from './composer/Composer';
import { Data } from './data/Data';
import {
  fabbleMachine,
  Service,
} from './fabble.machine';
import { PageEditor } from './pageEditor/PageEditor';
import { supabase } from './supabaseClient';

type MachineContext = {
  service: Service;
  send: Service["send"];
};
export const FabbleMachineContext = createContext({} as MachineContext);

export const useFabbleMachine = () => useContext(FabbleMachineContext);

const App = () => {
  const [session, setSession] = useState<Session>();

  useEffect(() => {
    setSession(supabase?.auth?.session() ?? undefined);

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("on auth change", session);
      service.send({ type: "SET_SESSION", session });
      setSession(session ?? undefined);
    });
  }, []);

  const service = useInterpret(fabbleMachine, {
    context: {
      session,
    },
    services: {
      loadPage: async () => ({ page: "" }),
      signOut: async () =>  {
        await supabase.auth.signOut();
      },
      signIn: async () => {
        const { user, session, error } = await supabase.auth.signIn({
          provider: "google",
        });
        if (!user || !session) {
          throw new Error("no user found");
        }
        if (error) {
          throw new Error(error.message);
        }
        return { user, session };
      },
      getProfile: async () => {
        const user = supabase.auth.user();
        console.log("get profile user", user);
        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, website, avatar_url`)
          .eq("id", user?.id)
          .single();

        return data;
        // if (error && status !== 406) {
        //   throw error
        // }

        // if (data) {
        //   setUsername(data.username)
        //   setWebsite(data.website)
        //   setAvatarUrl(data.avatar_url)
        // }
      },
      savePage: async () => {
        return true;
      },
      saveProfile: async (context) => {
        const updates = {
          ...context.profile,
          updated_at: new Date(),
        };

        let { error } = await supabase.from("profiles").upsert(updates, {
          returning: "minimal", // Don't return the value after inserting
        });
        return true;
      },
    },
  });
  console.log(service);
  const profile = useSelector(service, (s) => s.context.profile);
  console.log("propfile", profile);
  return (
    <FabbleMachineContext.Provider value={{ service, send: service.send }}>
      <MainMenu />
      <PageEditor />
      <Data />
      <Composer />
      <SignIn />
      <Account />
    </FabbleMachineContext.Provider>
  );
};
export default App;
