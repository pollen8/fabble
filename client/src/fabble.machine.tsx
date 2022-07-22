import {
  createMachine,
  EventFrom,
  InterpreterFrom,
} from 'xstate';

import { ThemeConfig } from '@chakra-ui/react';
import {
  Session,
  User,
} from '@supabase/supabase-js';

import { TApp } from './apps/Apps';

export const fabbleMachine =
  createMachine({
    tsTypes: {} as import('./fabble.machine.typegen').Typegen0,
    schema: {
      context: {} as {
        page: string;
        apps: TApp[],
        activeAppId: string,
        editingApp: Partial<TApp>,
        appToDelete: TApp | undefined,
        session: Session | null;
        profile: User;
        app: {
          theme: Record<string, ThemeConfig>,
        },
        error: string;
      },
      events: {} as
        | { type: 'SIGN_IN'; provider: string }
        | { type: 'SIGN_OUT' }
        | { type: 'TO_DATA' }
        | { type: 'TO_APPS' }
        | { type: 'TO_PAGE_EDITOR' }
        | { type: 'TO_COMPOSER' }
        | { type: 'TO_SIGN_IN' }
        | { type: 'SET_SESSION'; session: Session | null }
        | { type: 'TO_ACCOUNT' }
        | { type: 'SET_APP_THEME', theme: Record<string, any> }
        | { type: 'SAVE' }
        | { type: 'OPEN_SAVE_AS' }
        | { type: 'CANCEL' }
        | { type: 'OPEN_LOAD' }
        | { type: 'UPDATE_PROFILE'; profile: User }
        | { type: 'SET_PROFILE'; profile: User }
        | { type: 'LOAD'; data: { page: string } }
        | { type: 'OPEN_DELETE_APP', app: TApp }
        | { type: 'DELETE_APP', id: string }
        | { type: 'SAVE_APP', app: Partial<TApp> }
        | { type: 'SET_EDITING_APP', app: TApp }
        | { type: 'CANCEL_EDIT_APP' }
        | { type: 'LOAD_APP', app: TApp }
        | { type: 'UPDATE_EDITING_APP', data: Partial<TApp> }
        | { type: 'error.platform.savePage'; data: { message: string } }
        | { type: 'error.platform.loadPage'; data: { message: string } }
        | { type: 'done.invoke.loadPage'; data: { page: string } },
      services: {} as {
        signIn: {
          data: { user: User; session: Session };
        };
        loadApps: {
          data: { apps: TApp[] };
        };
        deleteApp: { data: void };
        saveApp: { data: void };
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
        initial: 'apps',
        on: {
          SIGN_OUT: 'authenticated.signOut',
          TO_ACCOUNT: 'authenticated.loadAccount',
          TO_APPS: 'authenticated.apps',
          TO_COMPOSER: 'authenticated.editingApp.composer',
          TO_DATA: 'authenticated.editingApp.data',
          TO_PAGE_EDITOR: 'authenticated.editingApp.pageEditor',
          SET_APP_THEME: {
            actions: 'setAppTheme',
          },
        },
        states: {
          apps: {
            initial: 'loading',
            states: {
              loading: {
                invoke: {
                  src: 'loadApps',
                  onDone: {
                    actions: 'setApps',
                    target: 'idle',
                  },
                  onError: {
                    actions: () => console.log('error setting spp'),
                  },
                },
              },
              confirmDelete: {
                on: {
                  DELETE_APP: 'deleteApp',
                },
              },
              deleteApp: {
                invoke: {
                  src: 'deleteApp',
                  onDone: {
                    target: 'loading',
                  },
                },
              },
              saveApp: {
                invoke: {
                  src: 'saveApp',
                  onDone: {
                    actions: 'clearEditingApp',
                    target: 'loading',
                  },
                },
              },
              idle: {
                on: {
                  CANCEL_EDIT_APP: {
                    actions: 'clearEditingApp',
                  },
                  SET_EDITING_APP: {
                    actions: 'setEditingApp',
                  },
                  UPDATE_EDITING_APP: {
                    actions: 'updateEditingApp',
                  },
                  SAVE_APP: {
                    target: 'saveApp',
                  },
                  OPEN_DELETE_APP: {
                    actions: 'setAppToDelete',
                    target: 'confirmDelete',
                  },
                  LOAD_APP: {
                    actions: 'setActiveAppId',
                    target: '#fabble.authenticated.editingApp',
                  },
                },
              },
            },

          },
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
          editingApp: {
            initial: 'composer',
            states: {
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
      },
    },
  }, {
    actions: {
      updateEditingApp: (context, event) => context.editingApp = { ...context.editingApp, ...event.data },
      setEditingApp: (context, event) => context.editingApp = event.app,
      clearEditingApp: (context) => {
        console.log('clearEditingApp ', context);
        context.editingApp = {};
      },
      setApps: (context, event) => context.apps = event.data.apps,
      setAppToDelete: (context, event) => context.appToDelete = event.app,
      setActiveAppId: (context, event) => context.activeAppId = event.app.id,
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
      setAppTheme: (context, event) => context.app.theme = event.theme,
    },
  });

export type Service = InterpreterFrom<typeof fabbleMachine>;
export type Events = EventFrom<typeof fabbleMachine>;
