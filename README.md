# Migration from AngularJS to React

This document, designed specifically for seasoned React developers, delves into a structured, multi-phased approach for migrating an AngularJS application to the React ecosystem. It outlines a series of hybrid configurations, allowing for a gradual and controlled transition. Considering the key differences between AngularJS (a framework) and React (a library), this migration calls for a thoughtful redesign and rewrite of important areas of your application.

## Understanding AngularJS

It's important to understand the core concepts of AngularJS to effectively plan the migration to React. A thorough grasp of AngularJS's architecture, data flow, and component management is crucial, as these aspects have direct parallels and contrasts with React's structure and philosophy.

To learn more, please read through the [Core Concepts](https://docs.angularjs.org/guide#core-concepts) section in AngularJS documentation, and the information provided in this section.

### AngularJS Glossary

* **AngularJS**
  * AngularJS is a structural framework for dynamic web apps, enabling developers to use HTML as their template language and extend HTML's syntax to express their application's components succinctly and clearly.
  * [What's AngularJS?](https://docs.angularjs.org/guide/introduction)
* **Two-Way Data Binding**
  * A feature of AngularJS that allows automatic synchronization of data between the model and view components. When data in the model changes, the view reflects the change, and when data in the view changes, the model is updated as well.
  * [Data Binding](https://docs.angularjs.org/guide/databinding)
* **Dependency Injection (DI)**
  * A design pattern in which a class requests dependencies from external sources rather than creating them. AngularJS has its own DI framework, which is used to manage controllers, services, and other AngularJS components.
  * [Dependency Injection](https://docs.angularjs.org/guide/di)
* **Directives**
  * Markers on DOM elements (such as elements, attributes, CSS, and more) that tell AngularJS's HTML compiler to attach a specified behavior to that DOM element or even transform the DOM element and its children.
  * [What are Directives?](https://docs.angularjs.org/guide/directive#what-are-directives-)
* **Scopes**
  * [What are Scopes?](https://docs.angularjs.org/guide/scope)
  * **$rootScope**
    * The highest-level scope in AngularJS, which acts as the parent scope for all other scopes within an application. It's akin to a global scope and can be injected and accessed throughout the application. $rootScope is created during the AngularJS application's bootstrapping process and can be used to store and manage global state or publish and subscribe to events. However, it's generally advisable to use it sparingly to avoid polluting the global state and potentially creating hard-to-track dependencies and interactions in larger applications.
    * [$rootScope](https://docs.angularjs.org/api/ng/service/$rootScope)
  * **$scope**
    * An object that refers to the application model. It acts as an execution context for expressions. Scopes are arranged in a hierarchical structure and mimic the DOM structure of the application.
* **Controllers**
  * In AngularJS, controllers are JavaScript functions that provide data and logic to HTML UI. A controller is defined using ng-controller directive.
  * [Understanding Controllers](https://docs.angularjs.org/guide/controller)
* **Services**
  * In AngularJS, services are singleton objects that are instantiated only once during the lifetime of an application. They can be used to organize and share code across your app.
  * [Services](https://docs.angularjs.org/guide/services)
* **$http**
  * A core AngularJS service used for making HTTP requests. It's a function which takes a single argument — a configuration object — that is used to generate an HTTP request and returns a promise.
  * [$http](https://docs.angularjs.org/api/ng/service/$http)
* **Modules**
  * In AngularJS, a module is a container for the different parts of an app including controllers, services, filters, directives, etc. A module is a collection of configuration and run blocks which get applied to the application during the bootstrap process.
  * [Modules](https://docs.angularjs.org/guide/module)
* **Digest Cycle**
  * The process in AngularJS by which watchers are checked, and scopes are updated. This is the central piece of the data-binding feature in AngularJS.
  * [$digest()](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$digest)
* **UI-Router**
  * A routing framework for AngularJS, which allows you to organize the parts of your interface into a state machine. Unlike the standard router, UI-Router is based on states rather than (just) routes.
  * [UI-Router](https://ui-router.github.io/ng1/)

### Comparison of AngularJS and React

Recognizing these differences will help you to make the migration process more stable and efficient. Each concept in AngularJS has a counterpart in React, but they often work differently due to the contrasting philosophies of the two libraries/frameworks.

* **Props and Bindings**
  * AngularJS: Uses two-way data binding between the model and the view. Whenever the model changes, the view reflects the change, and vice versa. AngularJS utilizes directives like **ng-model** to achieve this.
    * [ngModel](https://docs.angularjs.org/api/ng/directive/ngModel)
  * React: Adopts a unidirectional data flow. Data in React flows from parent to child components via props. React does not have built-in two-way data binding, and state is typically updated using callbacks like **setState** or the **useState** hook.

* **Imports**
  * AngularJS: Modules are used to manage different parts of the app like controllers, services, directives, etc. Dependencies are managed through Dependency Injection (DI).
    * [Dependency Injection](https://docs.angularjs.org/guide/di)
  * React: Uses ES6 modules. Components, functions, or hooks are imported and exported using import and export statements.

* **Routes**
  * AngularJS (**UI-Router**): A routing framework for AngularJS. It allows for the configuration of states and views. Nested states and multiple views are among its powerful features.
    * [UI-Router](https://ui-router.github.io/ng1/)
  * React (**React Router**): A library to manage routes in a React application. It enables the navigation among different components, with dynamic routing capabilities.

* **Styling**
  * AngularJS: Traditionally uses standard CSS or preprocessors like Sass for styling. AngularJS itself doesn't dictate a specific approach.
    * [Sass documentation](https://sass-lang.com/documentation/)
  * React: Supports various styling approaches including standard CSS, CSS-in-JS libraries (e.g., styled-components), and utility-first CSS frameworks like Tailwind CSS.

* **State Management**
  * AngularJS: Uses services and **$scope** for managing state. AngularJS's digest cycle ensures that the view updates when the state changes.
    * [What are Scopes?](https://docs.angularjs.org/guide/scope)
  * React: State is managed within components using the **useState** hook or in more complex scenarios, using state management libraries like Redux or Context API.

* **$http vs Fetch**
  * AngularJS: Uses the **$http** service for making HTTP requests. It returns a promise that is resolved or rejected based on the response from the server.
    * [$http](https://docs.angularjs.org/api/ng/service/$http)
  * React: Typically uses the Fetch API (**fetch**) or libraries like **Axios** for making HTTP requests. Like $http, fetch returns promises and is used in conjunction with async/await for asynchronous operations.

* **Services and Controllers vs Components and Hooks**
  * AngularJS: Structures applications with controllers and services. Controllers are used to bind data to views, and services are singletons that maintain data or logic across the application.
    * [Services](https://docs.angularjs.org/guide/services)
    * [Understanding Controllers](https://docs.angularjs.org/guide/controller)
  * React: Uses components as the building blocks of the UI. Components can maintain their state and are typically composed together to build complex UIs. React Hooks allow functional components to handle stateful logic and side effects.

## Initial setup

### Install React

This guide assumes that your AngularJS project uses npm and is bundled with Webpack. If your project is using a different build system, you need to adapt these instructions differently. In order to begin, you should add React as a dependency to your AngularJS project with `npm install react react-dom`.

### Recommended: Testing and types

In order to prevent regressions during the migration, your AngularJS project should have comprehensive tests in place. Due to the varying complexity of implementing tests, this guide does not cover testing.

You should also enable TypeScript for your AngularJS project and implement sufficient type coverage. AngularJS and UI-Router have types available in [@types/angular](https://www.npmjs.com/package/@types/angular) and [@types/angular-ui-router](https://www.npmjs.com/package/@types/angular-ui-router). React types can be installed with `npm install @types/react @types/react-dom`. Due to the multitude of different application structures, this guide also does not cover the implementation of typing.

## Migration process

By incrementally increasing the role of React and carefully managing the interaction between the two frameworks, this multi-stage migration process aims to ensure a smooth, controlled transition with minimal disruption to the application's functionality and user experience.

1. [React components inside AngularJS](#react-components-inside-angularjs)
    * Begin by introducing React components into the existing AngularJS application. This stage involves creating isolated React components and embedding them in AngularJS templates. This first step allows you to start integrating React without disrupting the core AngularJS architecture. The key is to ensure these React components can coexist and interact seamlessly with the AngularJS parts of your application.
2. [Create a React app](#create-a-react-app)
    * This stage involves setting up a new React application within the same workspace or repository as your existing AngularJS application. You'll configure the React build process and development environment, ensuring it coexists with the AngularJS setup. This step lays the foundation for a seamless development experience, allowing you to incrementally develop and test React components in parallel with the existing AngularJS application. It's crucial at this point to establish a clear directory structure and build configuration to avoid conflicts and ensure that both AngularJS and React code can be maintained and developed efficiently.
3. [Importing code between apps](#importing-code-between-apps)
    * With both AngularJS and React apps coexisting, you'll begin to bridge the gap between them. This involves setting up a mechanism to share code, utilities, and assets between the two applications. The goal is to avoid duplication and promote reuse of existing code where possible. Careful planning in this stage ensures that any new React components can be utilized for both apps.
4. [Connecting React and AngularJS state](#connecting-react-and-angularjs-state)
    * With some React components in place, the next step is to establish a connection between the state management systems of React and AngularJS. This stage involves creating adapters or shared services that allow the two frameworks to communicate and sync state. The objective is to ensure that data and state changes are consistent across both React and AngularJS components, maintaining a synchronized and unified user experience.
5. [Automating conversion steps](#automating-conversion-steps)
    * As the migration progresses, identifying repetitive patterns and automating the conversion can significantly speed up the process. This stage involves developing scripts or using tools to convert common patterns and structures from AngularJS to React. Automating conversion steps helps maintain consistency, reduces human error, and frees up the development team to focus on more complex migration tasks that require careful attention and planning.
6. [React pages inside AngularJS](#react-pages-inside-angularjs)
    * As your React app becomes more mature, you can substitute entire pages of the AngularJS app from it. The AngularJS router can still manage routing, but the content and logic of individual pages start to shift towards React.
7. [AngularJS components inside React](#angularjs-components-inside-react)
    * In the final stages of the migration, React becomes the primary framework for the UI, and AngularJS components are integrated into the React application only as needed. The focus is on ensuring a smooth transition, with the ultimate goal of fully migrating to React and phasing out AngularJS dependencies.
8. [Delete AngularJS](#delete-angularjs)
    * Finally, as all components have been turned into React, you can delete AngularJS from your list of dependencies or delete the legacy application, and also delete all legacy code and scaffolding.

## React components inside AngularJS

In order to have React components inside AngularJS, React can simply render to DOM elements within the AngularJS app DOM tree. You can also have multiple React instances in the same application with trivial performance effects.

In order to mount React inside AngularJS, you will need an adapter. There are several existing libraries such as [ngReact](https://github.com/ngReact/ngReact) and [react2angular](https://github.com/coatue-oss/react2angular), but these do not work with the latest versions of React.

This repository includes free (MIT licensed) adapter code that has been made to support new React versions, which can be customized to suit the project in question. The base code can be found in the [reactAngular](./reactAngular/) folder, and a customized example of it can be found in the [reactAngular-customized](./reactAngular-customized/) folder.

Copy the base code to a location within your codebase. If you do not use TypeScript, you need to remove types from the code. The following dependencies are needed **ngcomponent** and **react-error-boundary**: `npm i ngcomponent react-error-boundary`. [ngcomponent](https://www.npmjs.com/package/ngcomponent) is an abstraction that works similarly to React class components.

### reactAngularAdapter

**reactAngularAdapter** is the core adapter of the included adapter files, which creates an AngularJS component that renders a React component in a new React instance. Instead of using this directly, please see the more convenient [buildReactAngularComponent](#buildreactangularcomponent) utility.

#### reactAngularAdapter usage

You can create a new module, component and directive as follows:

```js
angular
    .module(#moduleName#, [#injectNames#])
    .component(
        #componentName#,
        reactAngularAdapter(#Component#, {
            bindingNames: [#bindingNames#],
            injectNames: [#injectNames#],
        }),
    )
    .directive(#directiveName#, {
        scope,
        template: `<div>
            <#componentNameInKebabCase# #bindings#></${#componentNameInKebabCase#}>
        </div>`,
        replace: true,
    }).name;
```

Example:

```js
angular
    .module('fooModule', ['messages'])
    .component(
        'fooComponent',
        reactAngularAdapter(FooComponent, {
            bindingNames: ['title'],
            injectNames: ['messages'],
        }),
    )
    .directive(#directiveName#, {
        scope,
        template: `<div>
            <foo-component title="title"></foo-component>
        </div>`,
        replace: true,
    }).name;
```

You need to have a wrapping element in the template, as `<foo-component>` is already registered to be handled by the component created by ngcomponent.

#### reactAngularAdapter arguments

* 0: **Component**
  * React function component
* 1: **options**, optional
  * Object with the following properties
    * **bindingNames**, optional: array of Component prop names which should be treated as bindings. These are mapped to bindings with `'<'` scoping.
    * **injectNames**, optional: array of Component prop names which should be provided through injected dependencies.

### buildReactAngularComponent

**buildReactAngularComponent** can be used to automatically create a module, component and directive to AngularJS from a provided React component.

#### buildReactAngularComponent usage

If your component requires no props, usage is as simple as:

```js
import buildReactAngularComponent from './reactAngular/buildReactAngularComponent';
import Foo from './Foo';

export default buildReactAngularComponent('foo', 'fooComponent', Foo);
```

With props, you need to add the options argument:

```js
import buildReactAngularComponent from './reactAngular/buildReactAngularComponent';
import Bar from './Bar';

export default buildReactAngularComponent('bar', 'barComponent', Bar, {
    bindings: {
        header: 'heading', // the key is the name of the prop, and the value is the name of the scope property
    },
    scope: {
        heading: '<',
    },
});
```

In more complex cases where your adapted component still requires some AngularJS code inside it, you may need to use some of the other options detailed in the next section.

#### buildReactAngularComponent arguments

* 0: **moduleName**
  * AngularJS module name
* 1: **directiveName**
  * AngularJS directive name in camelCase
* 2: **Component**
  * React function component
* 3: **options**, optional
  * Object with the following properties:
    * **bindings**, optional: object with entries of Component props (keys) and scope properties (values), for example {"foo": "bar"}
    * **controller**, optional: AngularJS controller for the directive
    * **injectModules**, optional: AngularJS modules to inject into the module
    * **injectNames**, optional: AngularJS names to inject into the directive
    * **scope**, optional: AngularJS scope object for the directive
    * **templateDivAttributes**: Additional attributes to add to the div element in the template, for example a {"class": "bg-red"}

### Support for importing SVG files as React components

If you want to import SVG files in React, you need to `npm install @svgr/webpack`, and add or update one the following to the **module.rules** section.

Configuration matching **Create React App**

```js
// add this before the exports
const appComponents = path.resolve(__dirname, 'app/components');

...

{
    test: /\.svg$/,
    exclude: [appComponents, reactAppSrc],
    type: 'asset',
},
{
    test: /\.svg$/,
    include: [appComponents, reactAppSrc],
    issuer: /\.[jt]sx?$/,
    use: ['babel-loader', '@svgr/webpack', 'url-loader'],
}
```

Configuration matching **vite-plugin-svgr**

```js
{
    test: /\.svg$/,
    oneOf: [
        {
            resourceQuery: /react/, // svg files with ?react
            use: [
                'babel-loader',
                {
                    loader: '@svgr/webpack',
                    options: {
                        prettier: false,
                        svgo: false,
                        svgoConfig: {
                            plugins: [{ removeViewBox: false }],
                        },
                        titleProp: true,
                        ref: true,
                    },
                },
            ],
        },
        {
            // Other SVG files (without ?react)
            loader: 'url-loader',
        },
    ],
}
```

## Create a React app

In order to have a clean and functional new React app without any legacy hurdles, you should create a new React project as a sibling to your AngularJS project.

The technology choices are left to the reader. Note that Create React App is no longer maintained, and instead you should consider one of the suggested options in [react.dev](https://react.dev/learn/start-a-new-react-project) or use Vite with React.

Choose your core libraries according to your needs, but for this migration guide, we'll focus on React Query for efficient server-state management and Tailwind CSS for utility-first styling as examples.

## Importing code between apps

Sharing code between the AngularJS and React applications can streamline the migration process, allowing you to reuse existing services, utilities, or components. However, this requires careful configuration due to the differences in the build systems of AngularJS and React. Note that some configurations may not be compatible with each other.

The following steps assume the following directory structure and configurations:

* The AngularJS project uses Webpack, and its configuration is at the root of the project.
* The React project, named react-app, is located adjacent to the AngularJS project folder.
* The React project uses src as the source folder for its codebase.

### Adding import alias to Webpack config

Add this line before the exports:

```js
const reactAppSrc = path.resolve(__dirname, '../react-app/src');
```

Update the **resolve** section to contain these values (including previous values if needed):

```js
resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.css'],
    alias: {
        '@react-app': reactAppSrc,
    },
    modules: [path.resolve(__dirname, 'node_modules'), reactAppSrc],
},
```

Add or update the (built-in) provide plugin config to have React as a global:

```js
plugins: [
    new webpack.ProvidePlugin({
        React: 'react',
    }),
]
```

### Adding import alias to TypeScript config

Install the create-react-app tsconfig: `npm i @tsconfig/create-react-app`

Add this to **extends**:

```json
"extends": "@tsconfig/create-react-app/tsconfig.json",
```

Add this to **compilerOptions.paths**:

```json
"paths": {
    "@react-app/*": ["../react-app/src/*"],
}
```

Install the transform paths plugin: `npm i typescript-transform-paths`

Add this to **plugins**:

```json
"plugins": [
    // Transform paths in output .js files
    { "transform": "typescript-transform-paths" },
    // Transform paths in output .d.ts files (Include this line if you output declarations files)
    { "transform": "typescript-transform-paths", "afterDeclarations": true }
]
```

## Connecting React and AngularJS state

## Automating conversion steps

## React pages inside AngularJS

## AngularJS components inside React

[angular2react](https://github.com/coatue-oss/angular2react)

## Delete AngularJS