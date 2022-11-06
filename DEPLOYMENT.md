# Website URL: 
https://afternoon-journey-19312.herokuapp.com/

# Steps to build and deploy the web application
The website is built and deployed on Heroku. 

1. Create a Procfile with the following contents in the project's root directory:

```
release: npm run build
web: node server/src/index.js
```

2. Add the heroku repository to the list:

```
git remote add heroku https://git.heroku.com/afternoon-journey-19312.git
```

3. Push the master branch to the heroku repository:

```
git push heroku master
```

4. If the build and release is successful, go to the Heroku website, find and click on the "afternoon-journey-19312" application link, and then go to Settings --> Config Vars and copy the .env variables from the .env file into here if they are not there already.

5. Website should now be successfully deployed. </br>

# Continuous Integration
We used Github Actions for CI. We only had time to get a few tests for the backend, and unfortunately, had no time to implement any tests for the frontend.   

Jest was used create the tests, and supertest was used as a wrapper around the Express.js application so that it could send and receive API calls.  

We decided to use the live database instead of an in-memory MongoDB database for testing, but we created a separate collection from our production collection to run tests our on.

CI is rather simple. A .yml file in the .github/workflows folder tells Github Actions how to run our tests. We used the "Actions secrets" in our repository settings to store the necessary .env variables to run our tests and then have the .yml file make references to those instead of creating a whole set of testing .env variables.