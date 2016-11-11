# angular2bknd-sdk

Backand SDK for Angular 2 

Compsatible with AngularJS 2.0.0

## install

    npm install angular2bknd-sdk --save

## Dependencies

    npm install @types/node --save-dev 
    npm install @types/socket.io-client --save-dev 

## Import

In `src/app/app.module.ts`,

    import { BackandService } from 'angular2bknd-sdk';

add `BackandService` to the `providers` aray.

In each component where you use Backand, import it:

    import { BackandService } from 'angular2bknd-sdk';

and then in the constructor:

    constructor(private backandService:BackandService){}

Use it as `this.backandService`

## Set Your App Details

1. In `src/app/app.component.ts`:
    
        this.backandService.setAppName('your app name');
        this.backandService.setSignUpToken('your backand signup token');
        this.backandService.setAnonymousToken('your backand anonymous token');

2. Do we call signup if we tried to sign in via a social network, 
   and the user is not signed up for the app? (true by defaule)

        this.backandService.setRunSignupAfterErrorInSigninSocial(true);


## Mobile

In `src/app/app.component.ts`:

    this.backandService.setIsMobile(true);

## CRUD

To fetch, create, and filter rows, from an object, say `stuff`, the CRUD functions in BackandService, should receive `'stuff'` as their first argument

    getItems
    filterItems
    postItem

## Social Signup 

The app opens a dialog supplied by the social network. 

## Socket Service
  
* Socket login and logout are done automatially as part of the login and logout calls, respectively.

I* To subscribe to event `items_updated` from server side via sockets, 
call `this.backandService.susbcribeSocket` and in your controller, subscribe with,

    this.backandService.subscribeSocket('items_updated')
      .subscribe(
            data => {
             
            },
            err => {
                console.log(err);
            },
            () => console.log('received update from socket')
        );

## Get User Details

Fetch:

       this.backandService.getUserDetails(true).subscribe(
           data=> {
               console.log(data);
           },
           err=> this.backandService.logError(err),
           () => console.log('Got Details')
           );

Caches user details in the app. The `force` parameter can cause it to fetch from it from Backand as in the call above.
