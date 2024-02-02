import angular from 'angular';
import reactAngularAdapter, { AnyProps, defaultInjectNames } from './reactAngularAdapter';
import React from 'react';

interface Options<Props> {
  /**
   * Object with keys and values in camelCase. The keys are used for bindingNames and template bindings, and are automatically converted to kebab-case.
   */
  bindings?: { [key in keyof Partial<Props>]: string };
  /**
   * AngularJS controller function for the directive.
   */
  controller?: (...args: unknown[]) => unknown;
  /**
   * AngularJS modules to inject into the module.
   */
  injectModules?: string[];
  /**
   * AngularJS names to inject into the directive.
   */
  injectNames?: (keyof Props)[];
  /**
   * Routes to use for React Router.
   */
  routes?: string[];
  /**
   * AngularJS scope object for the directive.
   */
  scope?: { [key: string]: string };
  /**
   * Additional attributes to add to the div element in the template.
   */
  templateDivAttributes?: string;
}

/**
 * Creates the AngularJS boilerplate (module, component and directive) required to mount a React component in AngularJS.
 * @param moduleName - AngularJS module name
 * @param directiveName - AngularJS directive name in camelCase. The param is automatically converted to kebab-case for use in AngularJS code
 * @param Component - React component to wrap
 * @param options - Config options
 */
function buildReactAngularComponent<Props extends AnyProps = AnyProps>(
  moduleName: string,
  directiveName: string,
  Component: React.FC<Props>,
  options: Options<Props> = {},
): string {
  const {
    bindings = {},
    controller,
    injectModules = [],
    injectNames = [],
    routes,
    scope = {},
    templateDivAttributes,
  } = options;

  const componentName = decorateComponentName(`${directiveName}${Component.name}`);
  const elementName = toKebabCase(componentName);
  const templateBindings = mapTemplateBindings(bindings);

  function directive() {
    return {
      scope,
      template: `<div${templateDivAttributes ? ' ' + templateDivAttributes : ''}>
        <${elementName} ${templateBindings}></${elementName}>
      </div>`,
      replace: true,
      controller,
    };
  }

  return angular
    .module(moduleName, injectModules)
    .component(
      componentName,
      reactAngularAdapter(Component, {
        bindingNames: Object.keys(bindings),
        injectNames: [...defaultInjectNames, ...injectNames],
        routes: routes,
      }),
    )
    .directive(directiveName, directive).name;
}

const decorateComponentName = (text: string): string => (text.endsWith('React') ? text : `${text}React`);
const toKebabCase = (text: string): string =>
  text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-z])([0-9])/g, '$1-$2')
    .toLowerCase();

const mapTemplateBindings = (bindings: { [key: string]: string }): string =>
  Object.entries(bindings)
    .map(([key, value]) => `${toKebabCase(key)}="${value}"`)
    .join('\n');

export default buildReactAngularComponent;
