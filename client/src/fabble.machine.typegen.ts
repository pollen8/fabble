// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setSession: "SET_SESSION";
    completeSignIn: "done.invoke.fabble.unauthenticated.startSignIn:invocation[0]";
    setAppTheme: "SET_APP_THEME";
    setApps: "done.invoke.fabble.authenticated.apps.loading:invocation[0]";
    clearEditingApp:
      | "done.invoke.fabble.authenticated.apps.saveApp:invocation[0]"
      | "CANCEL_EDIT_APP";
    setEditingApp: "SET_EDITING_APP";
    updateEditingApp: "UPDATE_EDITING_APP";
    setAppToDelete: "OPEN_DELETE_APP";
    setActiveAppId: "LOAD_APP";
    setProfile: "done.invoke.fabble.authenticated.loadAccount:invocation[0]";
    setPage: "LOAD" | "done.invoke.loadPage";
    setError: "error.platform.savePage" | "error.platform.loadPage";
  };
  internalEvents: {
    "done.invoke.fabble.unauthenticated.startSignIn:invocation[0]": {
      type: "done.invoke.fabble.unauthenticated.startSignIn:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.fabble.authenticated.apps.loading:invocation[0]": {
      type: "done.invoke.fabble.authenticated.apps.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.fabble.authenticated.apps.loading:invocation[0]": {
      type: "error.platform.fabble.authenticated.apps.loading:invocation[0]";
      data: unknown;
    };
    "done.invoke.fabble.authenticated.apps.saveApp:invocation[0]": {
      type: "done.invoke.fabble.authenticated.apps.saveApp:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.fabble.authenticated.loadAccount:invocation[0]": {
      type: "done.invoke.fabble.authenticated.loadAccount:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.loadPage": {
      type: "done.invoke.loadPage";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.savePage": {
      type: "error.platform.savePage";
      data: unknown;
    };
    "error.platform.loadPage": {
      type: "error.platform.loadPage";
      data: unknown;
    };
    "done.invoke.fabble.authenticated.apps.deleteApp:invocation[0]": {
      type: "done.invoke.fabble.authenticated.apps.deleteApp:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
    "done.invoke.savePage": {
      type: "done.invoke.savePage";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
  };
  invokeSrcNameMap: {
    signIn: "done.invoke.fabble.unauthenticated.startSignIn:invocation[0]";
    loadApps: "done.invoke.fabble.authenticated.apps.loading:invocation[0]";
    deleteApp: "done.invoke.fabble.authenticated.apps.deleteApp:invocation[0]";
    saveApp: "done.invoke.fabble.authenticated.apps.saveApp:invocation[0]";
    signOut: "done.invoke.fabble.authenticated.signOut:invocation[0]";
    getProfile: "done.invoke.fabble.authenticated.loadAccount:invocation[0]";
    saveProfile: "done.invoke.fabble.authenticated.account.updateProfile:invocation[0]";
    savePage: "done.invoke.savePage";
    loadPage: "done.invoke.loadPage";
  };
  missingImplementations: {
    actions: never;
    services:
      | "signIn"
      | "loadApps"
      | "signOut"
      | "getProfile"
      | "deleteApp"
      | "saveApp"
      | "saveProfile"
      | "savePage"
      | "loadPage";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    signIn: "SIGN_IN";
    loadApps:
      | "SET_SESSION"
      | "TO_APPS"
      | "done.invoke.fabble.authenticated.apps.deleteApp:invocation[0]"
      | "done.invoke.fabble.authenticated.apps.saveApp:invocation[0]";
    signOut: "SIGN_OUT";
    getProfile: "TO_ACCOUNT";
    deleteApp: "DELETE_APP";
    saveApp: "SAVE_APP";
    saveProfile: "xstate.init";
    savePage: "SAVE";
    loadPage: "xstate.init";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "unauthenticated"
    | "unauthenticated.idle"
    | "unauthenticated.startSignIn"
    | "authenticated"
    | "authenticated.apps"
    | "authenticated.apps.loading"
    | "authenticated.apps.confirmDelete"
    | "authenticated.apps.deleteApp"
    | "authenticated.apps.saveApp"
    | "authenticated.apps.idle"
    | "authenticated.signOut"
    | "authenticated.loadAccount"
    | "authenticated.account"
    | "authenticated.account.profile"
    | "authenticated.account.updateProfile"
    | "authenticated.editingApp"
    | "authenticated.editingApp.composer"
    | "authenticated.editingApp.data"
    | "authenticated.editingApp.pageEditor"
    | "authenticated.editingApp.pageEditor.idle"
    | "authenticated.editingApp.pageEditor.save"
    | "authenticated.editingApp.pageEditor.load"
    | "authenticated.editingApp.pageEditor.saving"
    | "authenticated.editingApp.pageEditor.loading"
    | {
        unauthenticated?: "idle" | "startSignIn";
        authenticated?:
          | "apps"
          | "signOut"
          | "loadAccount"
          | "account"
          | "editingApp"
          | {
              apps?:
                | "loading"
                | "confirmDelete"
                | "deleteApp"
                | "saveApp"
                | "idle";
              account?: "profile" | "updateProfile";
              editingApp?:
                | "composer"
                | "data"
                | "pageEditor"
                | {
                    pageEditor?:
                      | "idle"
                      | "save"
                      | "load"
                      | "saving"
                      | "loading";
                  };
            };
      };
  tags: never;
}
