// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setPage: "LOAD" | "done.invoke.loadPage";
    setError: "error.platform.savePage" | "error.platform.loadPage";
  };
  internalEvents: {
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
    savePage: "done.invoke.savePage";
    loadPage: "done.invoke.loadPage";
  };
  missingImplementations: {
    actions: never;
    services: "loadPage";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    savePage: "SAVE";
    loadPage: "xstate.init";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "idle"
    | "pageEditor"
    | "pageEditor.idle"
    | "pageEditor.save"
    | "pageEditor.load"
    | "pageEditor.saving"
    | "pageEditor.loading"
    | { pageEditor?: "idle" | "save" | "load" | "saving" | "loading" };
  tags: never;
}
