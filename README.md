# personal-homepage

## git convention
* "main" Branch - working code only; merge from "dev" when it's working
* "dev" Branch - only merge complete features into "dev" branch; we may push minor changes directly
* Feature Branches - developing features; merge into "dev" once complete

## Cloud Application Platform
http://polypage.herokuapp.com/

## local environment
After cloning the repository, run ```npm install```

Then, create a .env file in the backend folder with the following values:
* FE_URL = "http://localhost:3000"
* BE_URL = "http://localhost:5000"
* PORT = 5000
* DB_URL = [the url you use to access your Mongo DB]
* GOOGLE_CLIENT_ID = [Your google client id]
* GOOGLE_CLIENT_SECRET = [Your google client secret]
* LOGIN_SESSION_SECRET = [A login session secret of your choice]
* CANVAS_API_TOKEN = [Your personal canvas api token]
* CANVAS_API_DOMAIN = [The domain to your organization\'s canvas api]
* DEV_USER_EMAIL = [The gmail address of the account you'd like to use during development]
Finally, run ```npm run dev``` in the backend, and ```npm start``` in the frontend

## Testing
### How to Configure Your Testing Environment
Unit Tests: Run ```npm run test```

API & E2E Tests: In the .env file on your backend, change DEV_USER_EMAIL to "test" and run your backend, then use ```npx cypress open```
### Last Unit Test Coverage Report
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                 
-----------------|---------|----------|---------|---------|-----------------------------------
All files        |   93.58 |    78.68 |     100 |   93.37 |                                   
 userSchema.js   |     100 |      100 |     100 |     100 |                                   
 userServices.js |   93.37 |    78.68 |     100 |   93.15 | 14-15,28-29,48-49,132-133,358-359 

## CI/CD:  ![CI/CD Status](https://github.com/CSC-308-Group-B/personal-homepage/actions/workflows/node.js.yml/badge.svg?branch=main)
CI/CD relies on on passing ```npm run checkFormat```, which uses prettier to check all files for proper styling conventions.

The backend also relies on passing the unit tests, but not the api or e2e tests.

The frontend is hosted at https://polypage.herokuapp.com/

The backend is hosted at https://polypage-api.herokuapp.com/


## Story Board
https://www.figma.com/file/vtQom8y60GYXE9LsMwJg8K/Default-Page?node-id=0%3A1
  
## Product Specifications
https://docs.google.com/document/d/1RXcVrdCBQc3pBFIN4pYkueE5jBkdfP_dD6l0F9gVv0s/edit?usp=sharing

## Code Formatter
To setup, run ```npm install prettier```
Before merging any branches, run ```npm run format```
https://prettier.io/
