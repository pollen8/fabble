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

import {
  TApp,
  TAppCreateDTO,
} from './apps/Apps';

export const fabbleMachine =
  createMachine({
    tsTypes: {} as import('./fabble.machine.typegen').Typegen0,
    schema: {
      context: {} as {
        page: string;
        apps: TApp[];
        activeAppIndex: number;
        activePageIndex: number;
        editingApp?: TApp;
        appToDelete: TApp | undefined;
        editingPageIndex: number;
        session: Session | null;
        profile: User;
        app: {
          theme: Record<string, ThemeConfig>;
        };
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
        | { type: 'SET_APP_THEME'; theme: Record<string, any> }
        | { type: 'CANCEL' }
        | { type: 'UPDATE_PROFILE'; profile: User }
        | { type: 'SET_PROFILE'; profile: User }
        // | { type: 'LOAD'; data: { page: string } }
        | { type: 'OPEN_DELETE_APP'; app: TApp }
        | { type: 'DELETE_APP'; id: string }
        | { type: 'SAVE_APP'; app: TAppCreateDTO }
        | { type: 'SET_EDITING_APP', app: TApp }
        | { type: 'CANCEL_EDIT_APP' }
        | { type: 'LOAD_APP'; index: number }
        | { type: 'UPDATE_EDITING_APP'; key: keyof TApp, value: any }
        | { type: 'LOAD_PAGE'; index: number }
        | { type: 'SET_PAGE_MARKUP'; markup: string }
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
                    actions: ['setActiveAppIndex', 'resetActivePageIndex'],
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
              composer: {
                initial: 'idle',

                states: {
                  idle: {
                    on: {
                      LOAD_PAGE: {
                        actions: 'setActivePageIndex',
                        target: '#fabble.authenticated.editingApp.pageEditor',
                      },
                      SAVE_APP: {
                        actions: 'setPages',
                        target: 'saving',
                      },
                    },
                  },
                  saving: {
                    invoke: {
                      src: 'saveApp',
                      onDone: 'idle',
                    },
                  },
                },
              },
              data: {},
              pageEditor: {
                initial: 'idle',
                states: {
                  idle: {
                    on: {
                      SET_PAGE_MARKUP: {
                        actions: ['setActivePageMarkup'],
                        target: 'saving',
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
                },
              },
            },
          },
        },
      },
    },
  }, {
    actions: {
      updateEditingApp: (context, event) => context.editingApp ? context.editingApp[event.key] = event.value: null,
      setEditingApp: (context, event) => context.editingApp = event.app,
      clearEditingApp: (context) => {
        console.log('clearEditingApp ', context);
        context.editingApp = undefined;
      },
      setApps: (context, event) => context.apps = event.data.apps,
      setAppToDelete: (context, event) => context.appToDelete = event.app,
      resetActivePageIndex: (context) => context.activePageIndex = 0,
      setActiveAppIndex: (context, event) => context.activeAppIndex = event.index,
      setActivePageIndex: (context, event) => context.activePageIndex = event.index,
      setActivePageMarkup: (context, event) => {
        console.log('setActivePagemarku[', event);
        context.apps[context.activeAppIndex].config.pages[context.activePageIndex].markup = event.markup;
      },
      setPages: (context, event) => {
        console.log('set pages', context, event);
        context.apps[context.activeAppIndex] = event.app as TApp;
      },
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
      setAppTheme: (context, event) => context.app.theme = event.theme,
    },
  });

export type Service = InterpreterFrom<typeof fabbleMachine>;
export type Events = EventFrom<typeof fabbleMachine>;
