import { BrowserHistory, createBrowserHistory } from '@remix-run/router';
import { BrowserRouterProps, Route, Router, Routes } from 'react-router-dom';
import { IRootScopeService } from 'angular';
import React from 'react';

type BrowserRouterWithRootScopeProps = BrowserRouterProps & {
  rootScope?: IRootScopeService;
  routes?: string[];
}

// dummy routes to get route params when actual routing is handled on AngularJS level
const dummyRoutes = [
  '/',
  '/:barId',
  '/:barId/foo'
];

// very basic route matching – improve if necessary
const routeMatcher = (pathname: string, routes: string[]): boolean => {
  const pathnameParts = pathname.split('/');

  for (let i = 0; i < routes.length; i++) {
    const routeParts = routes[i].split('/');

    if (pathname.startsWith(`/${routeParts[1]}`)) {
      return true
    }

    // unsophisticated route matching
    if (routeParts[1] === ':barId') {
      return pathnameParts[2] === routeParts[2];
    }
  }

  return false;
};

// fork of react-router-dom/BrowserRouter
function BrowserRouterWithRootScope({ basename, children, window, rootScope, routes }: BrowserRouterWithRootScopeProps) {
  const historyRef = React.useRef<BrowserHistory>();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window, v5Compat: true });
  }

  const history = historyRef.current;
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);

  let routerHistory: BrowserHistory = history;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function applyRootScope<T extends (...args: any[]) => any>(fn: T): T {
    return ((...args: Parameters<T>): ReturnType<T> => {
      const result = fn(...args);
      // if the route is not specified to be handled in this router, apply rootScope
      if (routes === undefined || !routeMatcher(args[0].pathname, routes)) {
        rootScope?.$apply();
      }
      return result;
    }) as T
  }

  if (rootScope) {
    routerHistory = {
      ...history,
      push: applyRootScope(history.push),
      replace: applyRootScope(history.replace),
      go: applyRootScope(history.go),
    };

    const routesToMap = routes ?? dummyRoutes;

    return (
      <Router basename={basename} location={state.location} navigationType={state.action} navigator={routerHistory}>
        <Routes>
          {routesToMap.map(path => (
            <Route key={path} path={path} element={children} />
          ))}
        </Routes>
      </Router>
    )
  }
}

export default BrowserRouterWithRootScope;
