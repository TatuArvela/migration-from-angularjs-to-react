import angular, { IScope } from 'angular';
import { Query, QueryCache, QueryClient } from '@tanstack/react-query';

export default angular.module('querySyncService', []).factory('QuerySyncService', QuerySyncService).name;

export interface IQuerySyncService {
  attachScope: (scope: IScope) => void;
  initialiseQueryClient: () => void;
  // add any methods you will need for synchronizing data from AngularJS to React
}

QuerySyncService.$inject = [] as string[];
function QuerySyncService(): IQuerySyncService {
  let scope: undefined | IScope = undefined;
  
  function initialiseQueryClient() {
    if (!window.queryClient) {
      window.queryClient = new QueryClient({
        // add any default options here
        queryCache: new QueryCache({
          onSuccess: (data, query) => {
            syncToAngularJs(data, query);
            return data;
          }
        })
      })
    }
  }

  function attachScope($scope: IScope) {
    scope = $scope;
  }

  function syncToAngularJs(data: unknown, query: Query) {
    // add any handlers for setting scope data here
    /*if (query.queryKey[0] === 'foo') {
      const fooData = data as Foo;
      if (scope?.foo) {
        scope.foo = foo;
        scope.$apply();
      }
    }*/
  }

  // add any methods for setting query cache data here
  /*function setFooData(foo: Foo) {
    if (window.queryClient) {
      window.queryClient.setQueryData(['foo'], foo);
    }
  }*/

  return {
    initialiseQueryClient,
    attachScope,
  }
}