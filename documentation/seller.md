# Authentication

## Route: **/auth/seller**
## Request Type: **GET**
Returns a JSON object on success:
```json
{
  "status": "success",
  "id": "ObjectID in database",
  "username": "seller's name",
  "email": "seller's email address",
  "address": "seller's postal address",
  "companyName": "seller's company name",
  "logo": "seller's logo"
}
```
else returns two errors:
* 400: Seller is not registered on the system
* 401: Seller token sent is invalid or token is missing.

## Route: **/auth/register**
## Request Type: **POST**
JSON object to send:
```json
{
  "username": "seller's login name",
  "password": "password to be hashed and stored",
  "email": "desired email",
  "address": "seller's address",
  "companyName": "seller's company name"
}
```

Returns 201 status code with JSON Object if successful:
```json
{
  "status": "success",
  "token": "seller's token"
}
```
or an error if:
* 400: Username is not unique
* 400: Email is not unique
* 400: Company name is not unique

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
  "token": "seller's token"
}
```
or an error if:
* The username or password is wrong/invalid.