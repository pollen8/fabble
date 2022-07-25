/* eslint-disable prefer-promise-reject-errors */
export const cancellablePromise = (promise: Promise<any>) => {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
        (value) => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
        (error) => reject({ isCanceled, error }),
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => (isCanceled = true),
  };
};
