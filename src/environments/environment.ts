// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  instagram_token: 'INSTAGRAM_TOKEN',
  stripe_token: 'STRIPE_PUBLISHABLE_KEY',
  paypal_token: 'PAYPAL_CLIENT_ID',




  isContentLoading: false,
  
 
  Report_Path: 'http://localhost:44391/ReportHandler.ashx?',

  //*********************Local Server************* */

  ProductImage: 'http://localhost:56283/ProductImage/',
   BASE_API_URL: 'http://localhost:56283/api/',


  //*********************Production Server************* */
 
  //BASE_API_URL: 'http://34.67.65.213/EcommApiV3/api/',
  //ProductImage: 'http://34.67.65.213/EcommApiV3/ProductImage/',
  

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
