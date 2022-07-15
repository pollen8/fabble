import {
  FormEvent,
  useState,
} from 'react';

import { Button } from '@chakra-ui/react';
import { useSelector } from '@xstate/react';

import { useFabbleMachine } from '../App';
import { supabase } from '../supabaseClient';

export const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const { service, send } = useFabbleMachine();
  const isSignIn = useSelector(
    service,
    (state) => state.matches("profile.signin"),
  );

  if (!isSignIn) {
    return null;
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">Supabase + React</h1>
        <Button
          onClick={async () => {
            send({ type: "SIGN_IN", provider: "google" });
          }}
        >
          Sign in with google
        </Button>
      </div>
    </div>
  );
};
