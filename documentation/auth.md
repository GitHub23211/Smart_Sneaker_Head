# Authentication

## Route: **/auth/user**
## Request Type: **GET**
Returns a JSON object on success:
```json
{
  "status": "success",
  "id": "ObjectID in database",
  "username": "user's name",
  "email": "user's email address",
  "address": "user's postal address",
  "cart": "user's current cart contents",
  "avatar": "String containing filename of user avatar stored in backend"
}
```
else returns two errors:
* 400: User is not registered on the system
* 401: User token sent is invalid or token is missing.

## Route: **/auth/register**
## Request Type: **POST**
JSON object to send:
```json
{
  "username": "display and login name",
  "password": "password to be hashed and stored",
  "email": "desired email",
  "address": "user's address"
}
```

Returns 201 status code with JSON Object if successful:
```json
{
  "status": "success",
  "token": "user's token"
}
```
or an error if:
* 400: Username is not unique
* 400: Email is not unique

## Route: **/auth/login**
## Request Type: **POST**
JSON object to send:
```json
{
  "username": "username to login with",
  "password": "plain-text password associated with username"
}
```

Returns 200 status code with JSON object if successful:
```json
{
  "status": "success",
  "token": "user's token"
}
```
or an error if:
* The username or password is wrong/invalid.