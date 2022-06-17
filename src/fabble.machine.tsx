import {
  createMachine,
  InterpreterFrom,
} from 'xstate';

export const fabbleMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QDMCGAjdAbMA6ADqjAKIQCWALgPYBOuZEOAxAPIAKxAcgPoDKAggDViiUPiqxKZKgDtRIAB6IAtAGYALAE5cAVnUA2fQAYATKp0n9OiwHYANCACeiG7nUmzNkzqM6AjDaqRkZ+AL6hDmiYOAREYKSUtPSMYKwcPAAyLPwAIvLikhTSckiKKjaa6rgAHCZGmiGaNgGWOg7OCK7uZpq11X46+n7eNuGRGNh4hCTk1HSwqABuqQDC-JwrxBn5ElKy8koIygE6uKomfpp1mnoWqtVtTiqaqriGqqqB-kY2NtWBYxAUUmsRmiXmS1SAmEO0KxQOKj8+leOmqqnevi81k0+naiA8r36fg+qj8fn6QXUOkBwJi03isySWCoqAgTCyuVhexKoEOyk0ZLe5J8+i01QpfjxCHc1VwZKaTUCwQe1RpEzpcQSc1wzNZTDWGy2XKK+1KfKuJlwFw8enqJi8pKl-Ne70+5j8Pz+AIiQPVU01jIhizIMigTAgsjwIcWVAA1ngFss2HFjfCzSp0acHgLkeKbL59Jopeofm8zMS-rY9Dc1dF-WDtYmQ2GwDQaEl8FhUBRkLQALa4RNgZMwVOm3kqAzacV1C7uepDItPBDWPy4X4-dTVTQ3dw72sg+lapks8ih8OR+gyGPxnWnkdgMc8spHP7aH7k4Y7wYDYtGWWLjYOifDuQGkuoB4ag2J6ss2TCtu2dCdt2vY0AOuoQA+T4Ikc+jVFUiqfNYHhXPUUo6C8uCmJclx4dYgyaOEPoyFQEBwPItJRik2HpkcFiWi8IpaOYRiikuHTKB4srVL4LQVKigznJB9YMuCyQ4DxE64QMuANKolS9PoHjqOYToekYcrIuihiBNuLyMT6nGgqpjaQppL7HP8NR4TJO72gK+FSsSVTkv++hKkYJYqspznHnQGHueaGjrhRxIhL8VzokFyWhdU4VBJF-6ojFR6BoOSzNolKiWGuOjNC8Jj4e46g2Oo6jkfpVr5l4fhaKiLyqCVAZqRhlWlAU3I4ccwSuB+Rm9OYfy9eRMm6BcAoVEZUX6EN0E0FVRweqSVHNPNaJ1f0uLLscgSWR8lZogFgzKQd03WCdSImAtF1Ik6QRrjJ-jNP0Nh4b1TGhEAA */
  createMachine({
    tsTypes: {} as import("./fabble.machine.typegen").Typegen0,
    schema: {
      context: {} as {
        page: string;

        error: string;
      },
      events: {} as
        | { type: "SAVE" }
        | { type: "OPEN_SAVE_AS" }
        | { type: "CANCEL" }
        | { type: "OPEN_LOAD" }
        | { type: "LOAD", data: { page: string } }
        | { type: "error.platform.savePage"; data: { message: string } }
        | { type: "error.platform.loadPage"; data: { message: string } }
        | { type: "done.invoke.loadPage"; data: { page: string } },
      services: {} as {
        savePage: {
          data: boolean;
        };
      },
    },
    id: "fabble",
    initial: "pageEditor",
    states: {
      idle: {},
      pageEditor: {
        initial: "idle",
        states: {
          idle: {
            on: {
              OPEN_SAVE_AS: {
                target: "save",
              },
              OPEN_LOAD: {
                target: "load",
              },
            },
          },
          save: {
            on: {
              CANCEL: {
                target: "idle",
              },
              SAVE: {
                target: "saving",
              },
            },
          },
          load: {
            on: {
              LOAD: {
                target: "idle",
                actions: "setPage",
              },
              CANCEL: {
                target: "idle",
              },
            },
          },
          saving: {
            invoke: {
              src: "savePage",
              id: "savePage",
              onDone: [
                {
                  target: "idle",
                },
              ],
              onError: [
                {
                  actions: "setError",
                  target: "idle",
                },
              ],
            },
          },
          loading: {
            invoke: {
              src: "loadPage",
              id: "loadPage",
              onDone: [
                {
                  actions: "setPage",
                  target: "idle",
                },
              ],
              onError: [
                {
                  actions: "setError",
                  target: "idle",
                },
              ],
            },
          },
        },
      },
    },
  }, {
    actions: {
      setError: (context, event) => context.error = event.data.message,
      setPage: (context, event) => context.page = event.data.page,
    },
    services: {
      savePage: async (context, event) => {
        return true
      }
    }
  }
  )

export type Service = InterpreterFrom<typeof fabbleMachine>
