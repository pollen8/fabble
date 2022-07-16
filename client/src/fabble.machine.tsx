import {
  assign,
  createMachine,
  EventFrom,
  InterpreterFrom,
  spawn,
} from 'xstate';

import {
  Session,
  User,
} from '@supabase/supabase-js';

import { authorisationMachine } from './authorisation.machines';

export const fabbleMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QDMCGAjdAbMA6ADqjAKIQCWALgPYBOuZEOAxAPIAKxAcgPoDKAggDViiUPiqxKZKgDtRIAB6IAtAGYALAE5cAVnUA2fQAYATKp0n9OiwHYANCACeiG7nUmzNkzqM6AjDaqRkZ+AL6hDmiYOAREYKSUtPSMYKwcPAAyLPwAIvLikhTSckiKKjaa6rgAHCZGmiGaNgGWOg7OCK7uZpq11X46+n7eNuGRGNh4hCTk1HSwqABuqQDC-JwrxBn5ElKy8koIygE6uKomfpp1mnoWqtVtTiqaqriGqqqB-kY2NtWBYxAUUmsRmiXmS1SAmEO0KxQOKj8+leOmqqnevi81k0+naiA8r36fg+qj8fn6QXUOkBwJi03isySWCoqAgTCyuVhexKoEOyk0ZLe5J8+i01QpfjxCHc1VwZKaTUCwQe1RpEzpcQSc1wzNZTDWGy2XKK+1KfKuJlwFw8enqJi8pKl-Ne70+5j8Pz+AIiQPVU01jIhizIMigTAgsjwIcWVAA1ngFss2HFjfCzSp0acHgLkeKbL59Jopeofm8zMS-rY9Dc1dF-WDtYmQ2GwDQaEl8FhUBRkLQALa4RNgZMwVOm3kqAzacV1C7uepDItPBDWPy4X4-dTVTQ3dw72sg+lapks8ih8OR+gyGPxnWnkdgMc8spHP7aH7k4Y7wYDYtGWWLjYOifDuQGkuoB4ag2J6ss2TCtu2dCdt2vY0AOuoQA+T4Ikc+jVFUiqfNYHhXPUUo6C8uCmJclx4dYgyaOEPoyFQEBwPItJRik2HpkcFiWi8IpaOYRiikuHTKB4srVL4LQVKigznJB9YMuCyQ4DxE64QMuANKolS9PoHjqOYToekYcrIuihiBNuLyMT6nGgqpjaQppL7HP8NR4TJO72gK+FSsSVTkv++hKkYJYqspznHnQGHueaGjrhRxIhL8VzokFyWhdU4VBJF-6ojFR6BoOSzNolKiWGuOjNC8Jj4e46g2Oo6jkfpVr5l4fhaKiLyqCVAZqRhlWlAU3I4ccwSuB+Rm9OYfy9eRMm6BcAoVEZUX6EN0E0FVRweqSVHNPNaJ1f0uLLscgSWR8lZogFgzKQd03WCdSImAtF1Ik6QRrjJ-jNP0Nh4b1TGhEAA */
  createMachine({
    tsTypes: {} as import('./fabble.machine.typegen').Typegen0,
    schema: {
      context: {} as {
        page: string;
        session: Session | null;
        profile: User;
        error: string;
      },
      events: {} as
        | { type: 'SIGN_IN'; provider: string }
        | { type: 'SIGN_OUT' }
        | { type: 'TO_DATA' }
        | { type: 'TO_PAGE_EDITOR' }
        | { type: 'TO_COMPOSER' }
        | { type: 'TO_SIGN_IN' }
        | { type: 'SET_SESSION'; session: Session | null }
        | { type: 'TO_ACCOUNT' }
        | { type: 'SAVE' }
        | { type: 'OPEN_SAVE_AS' }
        | { type: 'CANCEL' }
        | { type: 'OPEN_LOAD' }
        | { type: 'UPDATE_PROFILE'; profile: User }
        | { type: 'SET_PROFILE'; profile: User }
        | { type: 'LOAD'; data: { page: string } }
        | { type: 'error.platform.savePage'; data: { message: string } }
        | { type: 'error.platform.loadPage'; data: { message: string } }
        | { type: 'done.invoke.loadPage'; data: { page: string } },
      services: {} as {
        signIn: {
          data: { user: User; session: Session };
        };
        savePage: {
          data: boolean;
        };
        getProfile: {
          data: User;
        };
        saveProfile: {
          data: boolean;
        };
        signOut: { data: void },
      },
    },
    id: 'fabble',
    initial: 'unauthenticated',
    states: {
      unauthenticated: {
        initial: 'idle',
        on: {
          SIGN_IN: 'unauthenticated.startSignIn',
          SET_SESSION: {
            actions: 'setSession',
            target: 'authenticated',
          },
        },
        states: {
          idle: {},
          startSignIn: {
            invoke: {
              src: 'signIn',
              onDone: {
                actions: 'completeSignIn',
                target: '#fabble.authenticated.account',
              },
            },
          },
        },
      },
      authenticated: {
        initial: 'loadAccount',
        on: {
          SIGN_OUT: 'authenticated.signOut',
          TO_ACCOUNT: 'authenticated.loadAccount',
          TO_COMPOSER: 'authenticated.composer',
          TO_DATA: 'authenticated.data',
          TO_PAGE_EDITOR: 'authenticated.pageEditor',
        },
        states: {
          signOut: {
            invoke: {
              src: 'signOut',
              onDone: '#fabble.unauthenticated',
            },
          },
          loadAccount: {
            invoke: {
              src: 'getProfile',
              onDone: [
                {
                  actions: 'setProfile',
                  target: 'account',
                },
              ],
            },
          },
          account: {
            initial: 'profile',
            states: {
              profile: {},
              updateProfile: {
                invoke: {
                  src: 'saveProfile',
                  onDone: {
                    target: '#fabble.authenticated.account',
                  },
                },
              },
            },
          },
          composer: {},
          data: {},
          pageEditor: {
            initial: 'idle',
            states: {
              idle: {
                on: {
                  OPEN_SAVE_AS: {
                    target: 'save',
                  },
                  OPEN_LOAD: {
                    target: 'load',
                  },
                },
              },
              save: {
                on: {
                  CANCEL: {
                    target: 'idle',
                  },
                  SAVE: {
                    target: 'saving',
                  },
                },
              },
              load: {
                on: {
                  LOAD: {
                    target: 'idle',
                    actions: 'setPage',
                  },
                  CANCEL: {
                    target: 'idle',
                  },
                },
              },
              saving: {
                invoke: {
                  src: 'savePage',
                  id: 'savePage',
                  onDone: [
                    {
                      target: 'idle',
                    },
                  ],
                  onError: [
                    {
                      actions: 'setError',
                      target: 'idle',
                    },
                  ],
                },
              },
              loading: {
                invoke: {
                  src: 'loadPage',
                  id: 'loadPage',
                  onDone: [
                    {
                      actions: 'setPage',
                      target: 'idle',
                    },
                  ],
                  onError: [
                    {
                      actions: 'setError',
                      target: 'idle',
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  }, {
    actions: {
      setSession: (context, event) => context.session = event.session,
      completeSignIn: (context, event) => {
        context.profile = event.data.user;
        context.session = event.data.session;
      },
      setProfile: (context, event) => {
        console.log('set profile', event);
        return;
        // return context.profile = event.data;
      },
      setError: (context, event) => context.error = event.data.message,
      setPage: (context, event) => context.page = event.data.page,
    },
  });

export type Service = InterpreterFrom<typeof fabbleMachine>;
export type Events = EventFrom<typeof fabbleMachine>;
