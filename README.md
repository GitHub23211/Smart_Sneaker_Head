# Group H Project Proposal - Smart Sneakers
# [Link to Deployment Information](DEPLOYMENT.md)
## Members
* Joshua Santos, 45203083 - Backend Specialist
* Himanshi Garg, 46101942 - Frontend Specialist
* Arshia Bhatia, 45625271  - Testing Specialist
* Jason Yu, 45182671 - Database Specialist

## Application Description
We created a website where buyers can purchase a variety of sneakers from both established retailers, and independent sellers. From the brand-new, cutting-edge sneaker product lines of Nike or Adidas, to the humble vintage and rare sneakers of independents. Our website allows users to register and buy sneakers straight away. Our products can be filtered by brands, or by using the search bar to search for the names of sneakers they want to purchase. They may also wishlist our products if they would like to purchase it at another time. Users do not need to worry about the security of their payment information. We have integrated Stripe's Payment API to securely handle all payments made to us.  

On the other hand, sellers can also register on our site and sell their products straight away, assuming they have a valid ABN. Sellers may choose to register a product on our website by providing its name, brand (optional), price, quantity, description and up to three pictures that showcase the appearance of their product. Sellers can also edit or delete registered products so that they can accurately match the stock they have on hand.

## Target Audience
There are no strict demographic criteria for our target audience but, in general we aim to cater our product to people who are: <br/>
* 18 years old and over
* Capable and knowledgeable of buying and selling products online.
* Interested in Vintage Sneakers
* Interested in Sneakers in general 

## Data Sources
User, Seller, Products, Cart, Wishlist, Product Review

## What our MVP achieved
We have a Landing Page with basic information such as About Us, FAQs, Contact Us and Social Media. We have a carousel to highlight feature products. A view for all the products on sale, filters for products by brand or by name in the navigation bar. A single product view that details the sneakers. We register and login users as either a buyer or a seller. A buyer can update their profile information, view their wishlist, view their orders and log out. Buyers can add sneakers in quantities to their cart or wishlist. Buyers can pay for their items with credit card using Stripe and apply discount codes. A seller can register and view the items they are selling, and edit or delete their listed items.

## Project Source Code
* The documentation folder has our markdown files for APIs <br/>
* The public folder holds the assets of images and videos used on the website <br/>
* The server folder holds all our backend code. Inside the server/src are all our backend tests and backend files like middleware, controllers and routes. It also contains the pictures used on the website. <br/>
* The src folder holds all our front end code. We have seperated our components and styling files into seperate folders. Inside Components, we further seperated it into components for the website, the components for a user/buyer and the components for a seller. <br/>
* Most of our work has been done on the highlighted folders mentioned above. <br/>

## Continuation of the Project
* Fix some known bugs such as the navigation bar disappearing.  
* Create an order confirmation page to let users know if their purchase was successful or not.  
* Clear user cart after a successful purchase.  
* Store orders on the database and create an API endpoint for these orders so users can view their current and previous orders.  
* Improve implementation of user reviews and ratings.  
* Implement a recommender system that was taught in Week 11 and 12.
* Further improvements to CSS and UI design  
* Implement more pop ups to make it obvious that an action has been completed, e.g. adding item to cart, adding item to wishlist, logging out confirmation  
* Allow buyers to see a seller's profile.
* Add seller reviews and ratings to let users know about the reputation of a seller.   
* Place information from the ABN into the Seller profile automatically instead of having the seller fill it out themselves.    
* Improve search and query options for sneakers so users can find exactly what they want   


## Summary of Roles
Joshua Santos - 45203083 - Backend Specialist: contributed to all of the backend code, CI and backend testing, and a majority of the project management. <br/>
Himanshi Garg - 46101942 - Frontend Specialist: contributed the most to the frontend code, styling, and a majority of the project management. <br/>
Ash Bhatia - 45625271  - Assets Specialist: contributed to the assets of our website, and some of our documentation. <br/>
Jason Yu - 45182671 - UI and CSS Specialist: contributed to the frontend code, CSS styling, UI design, and most of our documentation.  <br/>


We used Git Projects as our project management tool. We interacted with each other on Facebook Messenger and met up on campus after our Sprint Reports for a weekly review. We created development branches for writing code to seperate functionalities, and modularise our workflow. For our documentation files, we used Google Drive to hold text documents, presentation files, and video and photo files.
