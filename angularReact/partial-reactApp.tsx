import angular from 'angular';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import { RenderComponentParams, LegacyComponentContextProvider } from './LegacyComponentContext';
import QueryClientProvider from '../reactAngular/QueryClientProvider'

// note that this file only contains a part of what your AngularJS-powered React app should look like

export default angular
  .module('reactApp', [
    /* any depenbdencies */
  ])
  /* add a .config() block if needed */
  .service('ReactAppRunner', runner).name;

runner.$inject = ['$rootScope', '$compile'];
function runner(
  this: { run: () => void },
  $rootScope: angular.IRootScopeService,
  $compile: angular.ICompileService,
) {
  this.run = async function () {
    let scope: angular.IScope | null = null;
    let prevRenderComponentParams: RenderComponentParams | null = null;

    // this function manages the continuous render calls from React
    // (re-)renders or scope updates are only done as needed
    const renderComponent = async (params: RenderComponentParams) => {
      const isRendered = !!params.targetRef.current?.children && params.targetRef.current?.children?.length > 0;

      if (
        isRendered &&
        !hasComponentChanged(prevRenderComponentParams, params)
      ) {
        return;
      }

      if (!scope || !isRendered || hasComponentChanged(prevRenderComponentParams, params)) {
        scope = $rootScope.$new();

        scope.componentKey = params.componentKey;

        /* add any other scope variables needed to RenderComponentParams */
      }

      if (!isRendered || hasComponentChanged(prevRenderComponentParams, params)) {
        const element = angular.element(`<div>${legacyComponentCatalog[params.componentKey]}</div>`);
        const compiledElement = $compile(element.contents())(scope);
        params.targetRef.current?.replaceChildren(compiledElement[0]);
      }

      prevRenderComponentParams = params;
    };

    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

    root.render(
      <React.StrictMode>
        <LegacyComponentContextProvider renderComponent={renderComponent}>
          <AppWithLegacyProviders />
        </LegacyComponentContextProvider>
      </React.StrictMode>,
    );
  };
}

const hasComponentChanged = (prevParams: RenderComponentParams | null, params: RenderComponentParams) => {
  if (!prevParams) {
    return true;
  }

  return (
    prevParams.componentKey !== params.componentKey
    // add any other params that need to be checked for changes
  );
};

const AppWithLegacyProviders = () => (
  <ErrorBoundary>
    <QueryClientProvider>
      {/* rest of the App.tsx */}
    </QueryClientProvider>
  </ErrorBoundary>
);

const legacyComponentCatalog = {
  'foo.foo-component': '<foo-component-old bar="bar"></foo-component-old>'
};
