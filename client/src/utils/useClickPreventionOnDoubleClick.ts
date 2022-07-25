import {
  MouseEvent,
  MouseEventHandler,
} from 'react';

import { cancellablePromise } from './cancelablePromise';
import { useCancellablePromises } from './useCancellablePromises';

export const delay = (n: number) => new Promise((resolve) => setTimeout(resolve, n));

export const useClickPreventionOnDoubleClick = (
    onClick: MouseEventHandler<any>,
    onDoubleClick: MouseEventHandler<any>,
) => {
  const api = useCancellablePromises();

  const handleClick = (e: MouseEvent) => {
    console.log('e', e);
    api.clearPendingPromises();
    const waitForClick = cancellablePromise(delay(300));
    api.appendPendingPromise(waitForClick);

    return waitForClick.promise
        .then(() => {
          api.removePendingPromise(waitForClick);
          onClick(e);
        })
        .catch((errorInfo) => {
          api.removePendingPromise(waitForClick);
          if (!errorInfo.isCanceled) {
            throw errorInfo.error;
          }
        });
  };

  const handleDoubleClick = (e: MouseEvent) => {
    api.clearPendingPromises();
    onDoubleClick(e);
  };

  return [handleClick, handleDoubleClick];
};
