// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setSession: "SET_SESSION";
    completeSignIn: "done.invoke.fabble.unauthenticated.startSignIn:invocation[0]";
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
    "xstate.init": { type: "xstate.init" };
    "done.invoke.savePage": {
      type: "done.invoke.savePage";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
  };
  invokeSrcNameMap: {
    signIn: "done.invoke.fabble.unauthenticated.startSignIn:invocation[0]";
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
      | "getProfile"
      | "signOut"
      | "saveProfile"
      | "savePage"
      | "loadPage";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    signIn: "SIGN_IN";
    getProfile: "SET_SESSION" | "TO_ACCOUNT";
    signOut: "SIGN_OUT";
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
    | "authenticated.signOut"
    | "authenticated.loadAccount"
    | "authenticated.account"
    | "authenticated.account.profile"
    | "authenticated.account.updateProfile"
    | "authenticated.composer"
    | "authenticated.data"
    | "authenticated.pageEditor"
    | "authenticated.pageEditor.idle"
    | "authenticated.pageEditor.save"
    | "authenticated.pageEditor.load"
    | "authenticated.pageEditor.saving"
    | "authenticated.pageEditor.loading"
    | {
        unauthenticated?: "idle" | "startSignIn";
        authenticated?:
          | "signOut"
          | "loadAccount"
          | "account"
          | "composer"
          | "data"
          | "pageEditor"
          | {
              account?: "profile" | "updateProfile";
              pageEditor?: "idle" | "save" | "load" | "saving" | "loading";
            };
      };
  tags: never;
}
