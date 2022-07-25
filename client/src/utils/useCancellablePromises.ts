import { useRef } from 'react';

import { cancellablePromise } from './cancelablePromise';

export const useCancellablePromises = () => {
  const pendingPromises = useRef<ReturnType<typeof cancellablePromise>[]>([]);

  const appendPendingPromise = (promise: ReturnType<typeof cancellablePromise>) =>
    pendingPromises.current = [...pendingPromises.current, promise];

  const removePendingPromise = (promise:ReturnType<typeof cancellablePromise> ) =>
    pendingPromises.current = pendingPromises.current.filter((p) => p !== promise);

  const clearPendingPromises = () => pendingPromises.current.map((p) => p.cancel());

  const api = {
    appendPendingPromise,
    removePendingPromise,
    clearPendingPromises,
  };

  return api;
};
