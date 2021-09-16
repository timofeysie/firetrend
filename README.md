# Firetrend

## Workflow

ng serve // for a dev server
ng build // `dist/` directory. Use the `--prod` flag for a production build
ng test // execute the unit tests via [Karma](https://karma-runner.github.io)
ng e2e // tests via [Protractor](http://www.protractortest.org/)
npm run build // to build your project for Firebase Hosting and Cloud Functions
firebase serve // To test, spin up the emulator
firebase deploy

## Getting Started

```txt
>ng new firetrend
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ https://sass-lang.com/documentation/syntax#scss
ng add @angular/fire
```

[Deploy your application on Firebase Hosting & Functions](https://github.com/angular/angularfire/blob/master/docs/deploy/getting-started.md)

Not doing this as of yet.  This project was started erronously at first with ng cli set at 9, so moving to version 12 and starting again.

## [Getting started with AngularFire and Universal](https://github.com/angular/angularfire/blob/master/docs/universal/getting-started.md)

In Angular 9, this works:

```txt
>ng generate universal --client-project firetrend
CREATE src/main.server.ts (220 bytes)
CREATE src/app/app.server.module.ts (318 bytes)
CREATE tsconfig.server.json (273 bytes)
UPDATE package.json (1584 bytes)
UPDATE angular.json (4525 bytes)
UPDATE src/main.ts (432 bytes)
UPDATE src/app/app.module.ts (438 bytes)
npm install --save-dev @nguniversal/express-engine @nguniversal/module-map-ngfactory-loader express webpack-cli ts-loader ws xhr2
```

In Angular 12, there is no -client-project flag.

### [Deploying your Universal application on Cloud Functions for Firebase](https://github.com/angular/angularfire/blob/master/docs/universal/cloud-functions.md)

This is output from the first time around.

```txt
firebase init
...
? Are you ready to proceed? Yes
? Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. Functions: Configure
a Cloud Functions directory and its files, Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
=== Project Setup
First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.
? Please select an option: Create a new project
i  If you want to create a project in a Google Cloud organization or folder, please use "firebase projects:create" instead, and return to this command when you've created the project.
? Please specify a unique project id (warning: cannot be modified afterward) [6-30 characters]:
 firetrend
? What would you like to call your project? (defaults to your project ID)
√ Creating Google Cloud Platform project
√ Adding Firebase resources to Google Cloud Platform project
...
=== Functions Setup
A functions directory will be created in your project with sample code
pre-configured. Functions can be deployed with firebase deploy.
? What language would you like to use to write Cloud Functions? TypeScript
? Do you want to use ESLint to catch probable bugs and enforce style? Yes
+  Wrote functions/package.json
+  Wrote functions/.eslintrc.js
+  Wrote functions/tsconfig.json
+  Wrote functions/tsconfig.dev.json
+  Wrote functions/src/index.ts
+  Wrote functions/.gitignore
? Do you want to install dependencies with npm now? Yes
...
=== Hosting Setup
Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.
? What do you want to use as your public directory? public
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
+  Wrote public/404.html
+  Wrote public/index.html
i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...
+  Firebase initialization complete!
```

Running the build: npm run build causes these errors:

```txt
WARNING in ./node_modules/ws/lib/validation.js 109:22-47
Module not found: Error: Can't resolve 'utf-8-validate' in 'C:\Users\timof\repos\timofeysie\angular\firetrend\node_modules\ws\lib'  
 @ ./node_modules/ws/lib/receiver.js 13:43-66
 @ ./node_modules/ws/index.js 7:21-46
 @ ./server.ts 11:19-32

2 warnings have detailed information that is not shown.
Use 'stats.errorDetails: true' resp. '--stats-error-details' to show it.

ERROR in C:\Users\timof\repos\timofeysie\angular\firetrend\server.ts
./server.ts 9:25-34
[tsl] ERROR in C:\Users\timof\repos\timofeysie\angular\firetrend\server.ts(9,26)
      TS7016: Could not find a declaration file for module 'express'. 'C:\Users\timof\repos\timofeysie\angular\firetrend\node_modules\express\index.js' implicitly has an 'any' type.
  If the 'express' package actually exposes this module, consider sending a pull request to amend 'https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/express'

ERROR in C:\Users\timof\repos\timofeysie\angular\firetrend\server.ts
./server.ts 51:14-17
[tsl] ERROR in C:\Users\timof\repos\timofeysie\angular\firetrend\server.ts(51,15)
      TS7006: Parameter 'req' implicitly has an 'any' type.

ERROR in C:\Users\timof\repos\timofeysie\angular\firetrend\server.ts
./server.ts 51:19-22
[tsl] ERROR in C:\Users\timof\repos\timofeysie\angular\firetrend\server.ts(51,20)
      TS7006: Parameter 'res' implicitly has an 'any' type.

3 errors have detailed information that is not shown.
Use 'stats.errorDetails: true' resp. '--stats-error-details' to show it.

webpack 5.50.0 compiled with 3 errors and 2 warnings in 6557 ms
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! firetrend@0.0.0 webpack:ssr: `webpack --config webpack.server.config.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the firetrend@0.0.0 webpack:ssr script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
```

This didn't help:

npm i --save-dev @types/express

Ended up doing this in server.ts

```js
// @ts-expect-error:
import * as express from 'express';
```

Also added type any to this:

```js
app.get('*', (req: any, res: any) => {
```

Had to keep fixing these errors manually:

```txt
> functions@ build C:\Users\timof\repos\timofeysie\angular\firetrend\functions
> rm -r ./dist && cp -r ../dist . && tsc
rm: cannot remove './dist': No such file or directory

> cp -r ./dist/firetrend/* ./public && rm ./public/index.html
rm: cannot remove './public/index.html': No such file or directory
```

Finally, the build completes, but the firebase serve fails in the browser with the message:

```txt
Error: Cannot find module './firetrend-server/main' at webpackEmptyContext (webpack://app/./dist/_sync_^\.\/.*\-server\/main$?:2:10) at eval (webpack://app/./server.ts?:37:127) at Module../server.ts (C:\Users\timof\repos\timofeysie\angular\firetrend\functions\dist\firetrend-webpack\server.js:2599:1) at __webpack_require__ (C:\Users\timof\repos\timofeysie\angular\firetrend\functions\dist\firetrend-webpack\server.js:3181:42) at C:\Users\timof\repos\timofeysie\angular\firetrend\functions\dist\firetrend-webpack\server.js:3245:37 at C:\Users\timof\repos\timofeysie\angular\firetrend\functions\dist\firetrend-webpack\server.js:3248:12 at webpackUniversalModuleDefinition (C:\Users\timof\repos\timofeysie\angular\firetrend\functions\dist\firetrend-webpack\server.js:11:20) at Object. (C:\Users\timof\repos\timofeysie\angular\firetrend\functions\dist\firetrend-webpack\server.js:18:3) at Module._compile (internal/modules/cjs/loader.js:1085:14) at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
```

Maybe that's coming from here?

functions\src\index.ts

```js
  require(`${process.cwd()}/dist/firetrend-webpack/server`).app(
```

Change it to just firetrend and try again.

Similar issue:

```txt
[hosting] Rewriting / to http://localhost:5001/firetrend/us-central1/universal for local Function universal
i  functions: Beginning execution of "us-central1-universal"
!  functions: Error: Cannot find module 'C:\Users\timof\repos\timofeysie\angular\firetrend\functions/dist/firetrend/server'
Require stack:
- C:\Users\timof\repos\timofeysie\angular\firetrend\functions\lib\index.js
```

To see if it works on the server, I had to pay for a pay-as-you go account, as functions are behind a paywall.

https://console.firebase.google.com/project/firetrend/usage/details

Project Console: https://console.firebase.google.com/project/firetrend/overview
Hosting URL: https://firetrend.web.app

Browser says: Error: could not handle the request

Console log says: Failed to load resource: the server responded with a status of 500 ()

## Original Readme

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.9.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
