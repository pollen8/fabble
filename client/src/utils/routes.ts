import { StateValueFrom } from 'xstate';

import { useSelector } from '@xstate/react';

import { useFabbleMachine } from '../App';
import { fabbleMachine } from '../fabble.machine';

type TRoute = {
  to: string;// SingleOrArray<Event<Events>>;
  slug: string;
  matches: StateValueFrom<typeof fabbleMachine>;
  isActive?: boolean;
}
export const routes: Record<string, Omit<TRoute, 'slug'>> = {
  '/': {
    to: 'TO_APPS',
    matches: 'authenticated.apps',
  },
  '/api': {
    to: 'TO_DATA',
    matches: 'authenticated.editingApp.data',
  },
  '/composer': {
    to: 'TO_COMPOSER',
    matches: 'authenticated.editingApp.composer',
  },
  '/page-editor': {
    to: 'TO_PAGE_EDITOR',
    matches: 'authenticated.editingApp.pageEditor',
  },
  '/sign-in': {
    to: 'TO_SIGN_IN',
    matches: 'unauthenticated',
  },
  '/account': {
    to: 'TO_ACCOUNT',
    matches: 'authenticated.account',
  },
};

export const useGetRouteFromSlug = (slug: keyof typeof routes): TRoute => {
  const { service } = useFabbleMachine();
  const route = { ...routes[slug], slug };
  const isActive = useSelector(service, (s) => s.matches(route.matches));
  return { ...route, isActive };
};

const getCurrentRoute = () => {
  return routes[document.location.pathname];
};

export const transitionFromPath = () => {
  const route = getCurrentRoute();
  return { type: route.to };
};
