# Product
## api/product
### **GET**
Returns a JSON object on success that contains the status code and list of all products:
```json
{
  "status": "success",
  "produts": 
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

## api/product/register
### **POST**

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
  "produt": {
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

## api/product/update/:productid
### **PUT**

```json
{
  "name": "Updated product name"
  "price": "Updated product price",
  "description": "Updated product description"
  "quantity": "Updated product quantity"
}
```
If only certain fields need to be updated, leave the other fields the same.
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

## api/product/delete/:productid
### **DELETE**

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