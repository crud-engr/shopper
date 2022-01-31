# How to run the shopper project

### Requirements
```server - npm version 8.3.0, node version 17.3.0```
```web - npm version 6.14.15, node version 14.18.2```
```mongodb compass - local database```
```postman - for testing api endpoints```

#### Clone this repository
```git clone url```

#### Navigate to the folder
```cd folder_name```

#### Open two terminals and navigate into server and web folder
```cd web && npm install```
```cd server && npm install```

#### Add .env file to the server root directory and add the below config
```NODE_ENV=development```
```PORT=3100```
```LOCAL_DB='mongodb://localhost:27017/testdb'```

#### Run server
```npm run dev```

#### Run web
```npm run serve```
