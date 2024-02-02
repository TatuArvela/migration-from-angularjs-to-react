import { IAugmentedJQuery, IComponentOptions } from 'angular';
import React from 'react';
import ReactDOM from 'react-dom/client';
import NgComponent from 'ngcomponent';
import { ErrorBoundary } from 'react-error-boundary';

import BrowserRouterWithRootScope from './BrowserRouterWithRootScope';

export type AnyProps = Record<string, unknown>;

export const defaultInjectNames = ['$rootScope'] as const;
export type DefaultInjectNames = (typeof defaultInjectNames)[number];

/**
 * Mounts a React component inside AngularJS as an AngularJS component.
 *
 * Usage:
 *
 *   ```ts
 *   type Props = { foo: number, bar: string }
 *   const ReactComponent = ({ foo, bar }: Props) => {}
 *   const AngularComponent = reactAngularAdapter(ReactComponent, ['foo'], ['bar'])
 *   ```
 */
function reactAngularAdapter<Props extends AnyProps = AnyProps>(
  Component: React.FC<Props>,
  options?: {
    bindingNames?: Array<keyof Props>;
    injectNames?: Array<DefaultInjectNames | keyof Props>;
    routes?: string[];
  },
): IComponentOptions {
  const bindingNames = options?.bindingNames ?? [];
  const injectNames = options?.injectNames ?? [];
  const routes = options?.routes;

  return {
    bindings: Object.fromEntries(bindingNames.map(name => [name, '<'])),
    controller: [
      '$element',
      ...(injectNames as string[]),
      class extends NgComponent<Props> {
        static get $$ngIsClass() {
          return true;
        }

        root: ReactDOM.Root;
        injectedProps: Partial<Props>;

        constructor(
          private $element: IAugmentedJQuery,
          ...injectedProps: Props[keyof Props][]
        ) {
          super();
          this.root = ReactDOM.createRoot(this.$element[0]);
          this.injectedProps = {};
          injectNames.forEach((name: keyof Props, i) => {
            this.injectedProps[name] = injectedProps[i];
          });
        }

        render() {
          const props = {
            ...this.props,
            ...this.injectedProps,
          } as Props;

          this.root.render(
            <SharedErrorBoundary name={Component.name}>
              <BrowserRouterWithRootScope rootScope={props.$rootScope} routes={routes}>
                <Component {...props} />
              </BrowserRouterWithRootScope>
            </SharedErrorBoundary>
          )
        }

        componentWillUnmount() {
          this.root.unmount();
        }
      },
    ],
  };
}

const SharedErrorBoundary = ({ children, name }: { children?: React.ReactNode; name: string }) => (
  <ErrorBoundary fallback={<div>Error occurred in {name}.</div>}>
    {children}
  </ErrorBoundary>
);

export default reactAngularAdapter;
