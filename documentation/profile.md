# Profile
## Route: **/api/profile/update**
## Request Type: **PUT**
JSON object to send:
```json
{
  "username": "updated username (optional)",
  "password": "updated password (optional)",
  "email":"updated email (optional)",
  "address": "updated address (optional)"
}
```
All fields are optional i.e. if you only need to update username then send a JSON object only with a username field. if want to update password and email, then send a JSON object only with password and email fields and etc. Returns 200 status code with JSON object if successful:
```json
{
  "status": "success",
  "updatedInfo": {
    "username": "updated username (if updated)",
    "password": "updated password (if updated)",
    "email":"updated email (if updated)",
    "address": "updated address (if updated)"
  }
}
```
or an error if:
* User profile does not exist.
* Username already taken.
* Email already taken.
* Invalid user tries to update a profile.