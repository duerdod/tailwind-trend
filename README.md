# Jetshop Flight

Welcome to your new Jetshop Flight shop! Here's some resources to help you getting started.

Note that more extensive documentation is available at the [Jetshop Flight documentation site](https://docs.dev.jetshop.se).

## Table of Contents

- [Jetshop Flight](#jetshop-flight)
  - [Table of Contents](#table-of-contents)
  - [Folder Structure Overview](#folder-structure-overview)
  - [Available Scripts](#available-scripts)
    - [`yarn start`](#yarn-start)
    - [`yarn test`](#yarn-test)
    - [`yarn cypress`](#yarn-cypress)
    - [`yarn cypress:open`](#yarn-cypressopen)
    - [`yarn build`](#yarn-build)
    - [`yarn build:analyze`](#yarn-buildanalyze)
    - [`yarn serve`](#yarn-serve)
    - [`yarn serve:dev`](#yarn-servedev)
    - [`yarn intl`](#yarn-intl)
  - [Syntax Highlighting in the Editor](#syntax-highlighting-in-the-editor)
  - [Debugging in the Editor](#debugging-in-the-editor)
  - [Translations and localization](#translations-and-localization)
  - [Adding Images, Fonts, and Files](#adding-images-fonts-and-files)
  - [Using the `public` Folder](#using-the-public-folder)
    - [Adding Assets Outside of the Module System](#adding-assets-outside-of-the-module-system)
    - [When to Use the `public` Folder](#when-to-use-the-public-folder)
  - [Adding Custom Environment Variables](#adding-custom-environment-variables)
  - [Running Tests](#running-tests)
    - [Filename Conventions](#filename-conventions)
    - [Command Line Interface](#command-line-interface)
    - [Writing Tests](#writing-tests)
  - [Cypress Integration Tests](#cypress-integration-tests)

## Folder Structure Overview

After running the initialization script, you end up with a lot of files in your project:

```
my-shop/
  cypress/
  node_modules/
  public/
    favicon.ico
    manifest.json
    robots.txt
  src/
    client.js
    server.js
    // etc...
  translations/
  .eslintrc
  .gitlab-ci.yml
  .graphqlrc.yml
  cypress.json
  index.html
  jsconfig.json
  linaria.config.js
  package.json
  README.md
  schema.graphql
  yarn.lock
```

For the project to build, **these files must exist with exact filenames**:

* `index.html` is the page template used to render all pages on the server
* `src/client.js` is the entry point for the client
* `src/server.js` is the entry point for the server
* `translations/` contains translation files for all languages supported by Jetshop

## Available Scripts

Flight uses `yarn` for managing packages and running scripts. In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `yarn cypress`

Launches cypress in _headless_ mode and runs all cypress tests. _Note: The development or production server has to be running as well!_

### `yarn cypress:open`

Launches cypress with the UI open, making it easier to debug failing tests. _Note: The development or production server has to be running as well!_

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn build:analyze`

Same as the regular `build` command, but this also enables webpack-bundle-analyzer, which helps you analyze the output bundle and identify huge components or dependencies.

### `yarn serve`

Starts the production server, depends on that `yarn build` has already been run.

### `yarn serve:dev`

Starts the production server with the debugger attached, depends on that `yarn build` has already been run.

### `yarn intl`

Runs the intl utility, see [Translations and localization](#translations-and-localization) for more information.
## Syntax Highlighting in the Editor

To configure the syntax highlighting in your favorite text editor, head to the [relevant Babel documentation page](https://babeljs.io/docs/editors) and follow the instructions. Some of the most popular editors are covered.

## Debugging in the Editor

**This feature is currently only supported by [Visual Studio Code](https://code.visualstudio.com) editor.**

Visual Studio Code supports debugging out of the box with Create React App. This enables you as a developer to write and debug your React code without leaving the editor, and most importantly it enables you to have a continuous development workflow, where context switching is minimal, as you don’t have to switch between tools.

You would need to have the latest version of [VS Code](https://code.visualstudio.com) and VS Code [Chrome Debugger Extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) installed.

Then add the block below to your `launch.json` file and put it inside the `.vscode` folder in your app’s root directory.

```json
{
  "version": "0.2.0",
  "configurations": [{
    "name": "Chrome",
    "type": "chrome",
    "request": "launch",
    "url": "http://localhost:3000",
    "webRoot": "${workspaceRoot}/src",
    "userDataDir": "${workspaceRoot}/.vscode/chrome",
    "sourceMapPathOverrides": {
      "webpack:///src/*": "${webRoot}/*"
    }
  }]
}
```

Start your app by running `yarn start`, and start debugging in VS Code by pressing `F5` or by clicking the green debug icon. You can now write code, set breakpoints, make changes to the code, and debug your newly modified code—all from your editor.

## Translations and localization

Flight comes with support for translations and localizations via the package `@jetshop/intl`. To use this in a component, just import the default import from `@jetshop/intl` and call the function with the original string (preferrably in English):

```javascript
import t from '@jetshop/intl';

function MyComponent() {
  return (
    <h1>{t('This text is translatable')}</h1>
  );
}
```

This will create a translatable string, that can be overridden for each language in the corresponding .json file inside the `translations/` folder. Read more about the translation utility on the [Jetshop Flight Documentation site](https://docs.dev.jetshop.se/intl/introduction).
## Adding Images, Fonts, and Files

With Webpack, using static assets like images and fonts works similarly to CSS.

You can **`import` a file right in a JavaScript module**. This tells Webpack to include that file in the bundle. Unlike CSS imports, importing a file gives you a string value. This value is the final path you can reference in your code, e.g. as the `src` attribute of an image or the `href` of a link to a PDF.

To reduce the number of requests to the server, importing images that are less than 10,000 bytes returns a [data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) instead of a path. This applies to the following file extensions: bmp, gif, jpg, jpeg, and png. SVG files are excluded due to [#1153](https://github.com/facebookincubator/create-react-app/issues/1153).

Here is an example:

```js
import React from 'react';
import logo from './logo.png'; // Tell Webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default Header;
```

This ensures that when the project is built, Webpack will correctly move the images into the build folder, and provide us with correct paths.

The final filenames in the compiled bundle are generated by Webpack from content hashes. If the file content changes in the future, Webpack will give it a different name in production so you don’t need to worry about long-term caching of assets.

## Using the `public` Folder
### Adding Assets Outside of the Module System

You can also add other assets to the `public` folder.

Note that we normally encourage you to `import` assets in JavaScript files instead.
For example, see the sections on [adding a stylesheet](#adding-a-stylesheet) and [adding images and fonts](#adding-images-fonts-and-files).
This mechanism provides a number of benefits:

* Scripts and stylesheets get minified and bundled together to avoid extra network requests.
* Missing files cause compilation errors instead of 404 errors for your users.
* Result filenames include content hashes so you don’t need to worry about browsers caching their old versions.

However there is an **escape hatch** that you can use to add an asset outside of the module system.

If you put a file into the `public` folder, it will **not** be processed by Webpack. Instead it will be copied into the build folder untouched.   To reference assets in the `public` folder, you need to use a special variable called `PUBLIC_URL`.

Inside `index.html`, you can use it like this:

```html
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
```

Only files inside the `public` folder will be accessible by `%PUBLIC_URL%` prefix. If you need to use a file from `src` or `node_modules`, you’ll have to copy it there to explicitly specify your intention to make this file a part of the build.

When you run `npm run build`, Create React App will substitute `%PUBLIC_URL%` with a correct absolute path so your project works even if you use client-side routing or host it at a non-root URL.

In JavaScript code, you can use `process.env.PUBLIC_URL` for similar purposes:

```js
render() {
  // Note: this is an escape hatch and should be used sparingly!
  // Normally we recommend using `import` for getting asset URLs
  // as described in “Adding Images and Fonts” above this section.
  return <img src={process.env.PUBLIC_URL + '/img/logo.png'} />;
}
```

Keep in mind the downsides of this approach:

* None of the files in `public` folder get post-processed or minified.
* Missing files will not be called at compilation time, and will cause 404 errors for your users.
* Result filenames won’t include content hashes so you’ll need to add query arguments or rename them every time they change.

### When to Use the `public` Folder

Normally we recommend importing [stylesheets](#adding-a-stylesheet), [images, and fonts](#adding-images-fonts-and-files) from JavaScript.
The `public` folder is useful as a workaround for a number of less common cases:

* You need a file with a specific name in the build output, such as [`manifest.webmanifest`](https://developer.mozilla.org/en-US/docs/Web/Manifest).
* You have thousands of images and need to dynamically reference their paths.
* You want to include a small script like [`pace.js`](http://github.hubspot.com/pace/docs/welcome/) outside of the bundled code.
* Some library may be incompatible with Webpack and you have no other option but to include it as a `<script>` tag.

Note that if you add a `<script>` that declares global variables, you also need to read the next section on using them.

## Adding Custom Environment Variables

Your project can consume variables declared in your environment as if they were declared locally in your JS files. By
default you will have `NODE_ENV` defined for you, and any other environment variables starting with
`REACT_APP_` or `FLIGHT_`.

For performance reasons, **the environment variables are embedded during the build time**. This means that if you change an environment variable you need to make a new build.

>Note: You must create custom environment variables beginning with `REACT_APP_` or `FLIGHT_`. Any other variables except `NODE_ENV` will be ignored to avoid accidentally [exposing a private key on the machine that could have the same name](https://github.com/facebookincubator/create-react-app/issues/865#issuecomment-252199527). Changing any environment variables will require you to restart the development server if it is running.

These environment variables will be defined for you on `process.env`. For example, having an environment
variable named `REACT_APP_SECRET_CODE` will be exposed in your JS as `process.env.REACT_APP_SECRET_CODE`.

There is also a special built-in environment variable called `NODE_ENV`. You can read it from `process.env.NODE_ENV`. When you run `npm start`, it is always equal to `'development'`, when you run `npm test` it is always equal to `'test'`, and when you run `npm run build` to make a production bundle, it is always equal to `'production'`. **You cannot override `NODE_ENV` manually.** This prevents developers from accidentally deploying a slow development build to production.

These environment variables can be useful for displaying information conditionally based on where the project is
deployed or consuming sensitive data that lives outside of version control.
## Running Tests

Fligt uses [Jest](https://facebook.github.io/jest/) as its test runner. Jest is a Node-based runner. This means that the tests always run in a Node environment and not in a real browser. This lets us enable fast iteration speed and prevent flakiness.

While Jest provides browser globals such as `window` thanks to [jsdom](https://github.com/tmpvar/jsdom), they are only approximations of the real browser behavior. Jest is intended to be used for unit tests of your logic and your components rather than the DOM quirks.
### Filename Conventions

Jest will look for test files with any of the following popular naming conventions:

* Files with `.js` suffix in `__tests__` folders.
* Files with `.test.js` suffix.
* Files with `.spec.js` suffix.

The `.test.js` / `.spec.js` files (or the `__tests__` folders) can be located at any depth under the `src` top level folder.

We recommend to put the test files (or `__tests__` folders) next to the code they are testing so that relative imports appear shorter. For example, if `App.test.js` and `App.js` are in the same folder, the test just needs to `import App from './App'` instead of a long relative path. Colocation also helps find tests more quickly in larger projects.

### Command Line Interface

When you run `yarn test`, Jest will launch in the watch mode. Every time you save a file, it will re-run the tests, just like `yarn start` recompiles the code.

The watcher includes an interactive command-line interface with the ability to run all tests, or focus on a search pattern. It is designed this way so that you can keep it open and enjoy fast re-runs.

### Writing Tests

To create tests, add `it()` (or `test()`) blocks with the name of the test and its code. You may optionally wrap them in `describe()` blocks for logical grouping but this is neither required nor recommended.

Jest provides a built-in `expect()` global function for making assertions. A basic test could look like this:

```js
import sum from './sum';

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
```

All `expect()` matchers supported by Jest are [extensively documented here](http://facebook.github.io/jest/docs/expect.html).<br>
You can also use [`jest.fn()` and `expect(fn).toBeCalled()`](http://facebook.github.io/jest/docs/expect.html#tohavebeencalled) to create “spies” or mock functions.

## Cypress Integration Tests

Flight also comes with Cypress Integration Tests out of the box. These tests are run everytime you push a commit to your Gitlab repository. By default we provide a very basic set of essential integration tests for making sure that the critical purchase flows are working.

Have a look in `cypress/integration/essentials.spec.js` to see how these tests are set up. When you change shopid from `demostore` to your new shop instance, you might see that the tests are suddenly failing. This is usually because the category and product we use in the default test does not exist in your Jetshop instance. To fix this, update the urls defined in the top of the file with a category and product that is available in your shop.