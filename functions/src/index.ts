import * as functions from 'firebase-functions';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
export const universal = functions.https.onRequest((request, response) => {
  require(`${process.cwd()}/dist/firetrend-webpack/server`).app(
    request,
    response
  );
});
