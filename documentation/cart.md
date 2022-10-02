# Cart
## Route: **/api/cart/add/:productid**
## Request Type: **PUT**
JSON object to send:
```json
{
  "quantity": "amount of item to add to cart"
}
```
Returns 200 status code with JSON object if successful:
```json
{
  "status": "success",
  "newCart": [
    {
      "productid": "productid of items in cart",
      "quantity": "quantity of item",
    },
    "..."
  ]
```
or an error if:
* Item already in cart.
* Invalid productid
* Invalid user tries to add item to cart.

## Route: **/api/cart/update/:productid**
## Request Type: **PUT**
JSON object to send:
```json
{
  "quantity": "updated amount of item to add to cart"
}
```
Returns 200 status code with JSON object if successful:
```json
{
  "status": "success",
  "newCart": [
    {
      "productid": "productid of items in cart",
      "quantity": "quantity of item",
    },
    "..."
  ]
}
```
or an error if:
* Item not in cart.
* Invalid productid
* Invalid user tries to update item in cart.

## Route: **/api/cart/delete/:productid**
## Request Type: **DELETE**

No need to send a JSON object. Axios call URL needs to have the corrct productid.

Returns 200 status code with JSON object if successful:
```json
{
  "status": "success",
  "newCart": [
    {
      "productid": "productid of items in cart",
      "quantity": "quantity of item",
    },
    "..."
  ]
}
```
or an error if:
* Item not in cart
* Invalid productid
* Invalid user tries to delete item from cart.