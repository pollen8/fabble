// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
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
    "error.platform.savePage": {
      type: "error.platform.savePage";
      data: unknown;
    };
    "xstate.after(50)#fabble.authenticated.editingApp.data.saved": {
      type: "xstate.after(50)#fabble.authenticated.editingApp.data.saved";
    };
    "done.invoke.savePage": {
      type: "done.invoke.savePage";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.fabble.authenticated.apps.deleteApp:invocation[0]": {
      type: "done.invoke.fabble.authenticated.apps.deleteApp:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    signIn: "done.invoke.fabble.unauthenticated.startSignIn:invocation[0]";
    loadApps: "done.invoke.fabble.authenticated.apps.loading:invocation[0]";
    deleteApp: "done.invoke.fabble.authenticated.apps.deleteApp:invocation[0]";
    saveApp:
      | "done.invoke.fabble.authenticated.apps.saveApp:invocation[0]"
      | "done.invoke.fabble.authenticated.editingApp.composer.saving:invocation[0]";
    signOut: "done.invoke.fabble.authenticated.signOut:invocation[0]";
    getProfile: "done.invoke.fabble.authenticated.loadAccount:invocation[0]";
    saveProfile: "done.invoke.fabble.authenticated.account.updateProfile:invocation[0]";
    savePage: "done.invoke.savePage";
  };
  missingImplementations: {
    actions: never;
    services:
      | "signIn"
      | "loadApps"
      | "deleteApp"
      | "saveApp"
      | "signOut"
      | "getProfile"
      | "saveProfile"
      | "savePage";
    guards: never;
    delays: never;
  };
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
    setActiveAppIndex: "LOAD_APP";
    resetActivePageIndex: "LOAD_APP";
    setProfile: "done.invoke.fabble.authenticated.loadAccount:invocation[0]";
    setActivePageIndex: "LOAD_PAGE";
    setPages: "SAVE_APP";
    setAppDataConfig: "SET_APP_DATA_CONFIG";
    setError: "error.platform.savePage";
    setActivePageMarkup: "SET_PAGE_MARKUP";
  };
  eventsCausingServices: {
    signIn: "SIGN_IN";
    loadApps:
      | "TO_ACCOUNT"
      | "TO_APPS"
      | "TO_COMPOSER"
      | "TO_DATA"
      | "TO_PAGE_EDITOR"
      | "SET_SESSION"
      | "done.invoke.fabble.unauthenticated.startSignIn:invocation[0]"
      | "SIGN_OUT"
      | "done.invoke.fabble.authenticated.apps.deleteApp:invocation[0]"
      | "done.invoke.fabble.authenticated.apps.saveApp:invocation[0]";
    deleteApp: "DELETE_APP";
    saveApp: "SAVE_APP";
    signOut: "SIGN_OUT";
    getProfile: "TO_ACCOUNT";
    saveProfile: never;
    savePage: "SET_APP_DATA_CONFIG" | "SET_PAGE_MARKUP";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "init"
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
    | "authenticated.editingApp.composer.idle"
    | "authenticated.editingApp.composer.saving"
    | "authenticated.editingApp.data"
    | "authenticated.editingApp.data.idle"
    | "authenticated.editingApp.data.saving"
    | "authenticated.editingApp.data.saved"
    | "authenticated.editingApp.pageEditor"
    | "authenticated.editingApp.pageEditor.idle"
    | "authenticated.editingApp.pageEditor.saving"
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
                    composer?: "idle" | "saving";
                    data?: "idle" | "saving" | "saved";
                    pageEditor?: "idle" | "saving";
                  };
            };
      };
  tags: never;
}
