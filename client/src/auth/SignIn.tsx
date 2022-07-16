
import { Button } from '@chakra-ui/react';
import { useSelector } from '@xstate/react';

import { useFabbleMachine } from '../App';

export const SignIn = () => {
  const { service, send } = useFabbleMachine();
  const isSignIn = useSelector(
      service,
      (state) => state.matches('profile.signin'),
  );

  if (!isSignIn) {
    return null;
  }


  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">Supabase + React</h1>
        <Button
          onClick={async () => {
            send({ type: 'SIGN_IN', provider: 'google' });
          }}
        >
          Sign in with google
        </Button>
      </div>
    </div>
  );
};
