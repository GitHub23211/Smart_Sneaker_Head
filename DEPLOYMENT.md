# Website URL: 
https://afternoon-journey-19312.herokuapp.com/

# Steps to build and deploy the web application
The application is built and deployed on Heroku. MAKE SURE THIS IS ALL DONE ON THE MASTER BRANCH.

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
