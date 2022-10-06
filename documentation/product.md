# Product
## Route: **/api/product**
## Request Type: **GET**

Structure axios.get function like this:
```json
const headers = {
  name: "search keywords here"
}

axios.get("/api/product", headers)
     .then(response => ...)
```

Returns a JSON object on success that contains the status code and list of all products:
```json
{
  "status": "success",
  "products": 
  [
    {
      "name": "product name",
      "price": "product price",
      "description": "product description",
      "quantity": "product quantity on hand",
      "seller": "id of user who put product up for sale",
      "id": "id of product in databse"
    },
    "..."
  ]
}
```

## Route: **/api/product/register**
## Request Type: **POST**
JSON object to send:
```json
{
  "name": "Name of product to sell"
  "price": "Product price",
  "description": "Product Description"
  "quantity": "Amount of product to be sold"
}
```
Returns 201 status code with JSON object if successful:
```json
{
  "status": "success",
  "product": {
      "name": "product name",
      "price": "product price",
      "description": "product description",
      "quantity": "product quantity on hand",
      "seller": "id of user who put product up for sale",
      "id": "id of product in databse"
    }
}
```
or an error if:
* Product name is already taken.
* Invalid user tries to create a product.

## Route: **/api/product/update/:productid**
## Request Type: **PUT**
JSON object to send:
```json
{
  "name": "Updated product name (optional)",
  "price": "Updated product price (optional)",
  "description": "Updated product description (optional)",
  "quantity": "Updated product quantity (optional)"
}
```
All fields are optional i.e. if you only need to update name then send a JSON object only with a name field. if want to update price and quantity, then send a JSON object only with price and quantity fields and etc.
Returns 200 status code with JSON object if successful:
```json
{
  "status": "success",
  "before": "product details before update", 
  "after": "product details after update"
}
```
 or an error if:
* 400: Product with the submitted name already exists.
* 400: Invalid productid
* 401: The user trying to update the product is not the original seller
* 401: Product no longer exists.
* 401: Invalid user tries to update a product.

## Route: **/api/product/delete/:productid**
## Request Type: **DELETE**
No need to send a JSON object. Axios call URL needs to have the corrct productid.

Returns 200 status code with JSON object if successful:
```json
{
  "status": "success",
  "product": "details of deleted product"
}
```
or an error if:
* 400: Invalid productid.
* 401: The user trying to delete the product is not the original seller
* 401: Product no longer exists.
* 401: Invalid user tries to delete a product.
