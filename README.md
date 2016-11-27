# angular2bknd-sdk

Backand SDK for Angular 2 

Compatible with AngularJS 2.0.0

## Install

    npm install angular2bknd-sdk --save

## Dependencies

    npm install @types/node --save-dev 
    npm install @types/socket.io-client --save-dev 

## Import

In `src/app/app.module.ts`,

    import { BackandService } from 'angular2bknd-sdk';

add `BackandService` to the `providers` array.

In each component where you use Backand, import it:

    import { BackandService } from 'angular2bknd-sdk';

and then in the constructor:

    constructor(private backandService:BackandService){}

Use it as `this.backandService`

## Configure secure calls to Backand's REST API

Backand uses OAuth2 authentication, which requires that you include the authentication token in every HTTP call.

In `src/app/app.component.ts`:
    
        this.backandService.setAppName('your app name');
        this.backandService.setSignUpToken('your backand signup token');
        this.backandService.setAnonymousToken('your backand anonymous token');

## Mobile

In `src/app/app.component.ts`:

    this.backandService.setIsMobile(true);

## Do CRUD Operations on Your Database

To fetch, create, and filter rows, from an object, say `todo`, the CRUD functions in BackandService, should receive `'todo'` as their first argument

1. Read one row

```
    this.backandService.getOne('todo')
        .subscribe(
                data => {
                },
                err => this.backandService.logError(err),
                () => console.log('OK')
            );
```

2. Create

```
    this.backandService.create('todo', { name: this.name, description: this.description})
        .subscribe(
                data => {
                },
                err => this.backandService.logError(err),
                () => console.log('OK')
            );
```

3. Update

```
    this.backandService.update('todo', this.id, { name: this.name, description: this.description})
        .subscribe(
                data => {
                },
                err => this.backandService.logError(err),
                () => console.log('OK')
            );
```

4. Query

When `q` is set to your search pattern, define a filter:

```
    let filter = [{
                fieldName: 'name',
                operator: 'contains',
                value: q
              }];
```

and call `filterItem` 

```
    this.backandService.getList('todo', null, null, filter)
            .subscribe(
                data => {
                    console.log("subscribe", data);
                    this.items = data;
                },
                err => this.backandService.logError(err),
                () => console.log('OK')
            );
```

## Social Signup 

The app opens a dialog supplied by the social network. 

```
    var $obs = this.backandService.socialSignup(provider, spec);
    $obs.subscribe(                
      data => {
          console.log('Sign up succeeded with:' + provider);           
      },
      err => {
          this.backandService.logError(err)
      },
      () => console.log('Finish Auth'));
```

* `provider` is one of: facebook, twitter, googleplus, github
* `spec` optionally defines the look of the social network sign in window, like:

     left=1, top=1, width=600, height=600


## Socket Service
  
* Socket login and logout are done automatially as part of the login and logout calls, respectively.

I* To subscribe to event `items_updated` from server side via sockets, 
call `this.backandService.subscribeSocket` and in your controller, subscribe with,

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

## Backand Storage

### Create Backand Action

Create a server side action in Backand by going into the items object actions tab and clicking on the Back& Files icon. Name your action "files"

### File Upload

    backand.uploadFile('todo', 'files', fileName, base64Data).subscribe(
          data => { 
            console.log(data);
            //data.url is the url of the uploaded file
          }, 
          err => backand.logError(err),
          () => console.log('OK')
        );

### File Delete

    backand.delete('todo', 'files', fileName).subscribe(
          data => { 
          }, 
          err => backand.logError(err),
          () => console.log('OK')
        );
