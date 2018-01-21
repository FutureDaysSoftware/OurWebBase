# Future Days Farm

A website for the [Future Days Farm](InsertLinkToWebsite)

## Prerequisites

* Download [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
* Download [npm and Node.js](https://nodejs.org/en/)

### macOS

* `$ npm install n -g`
* `$ sudo n 9.3.0`
* `$ git clone https://github.com/FutureDaysSoftware/FarmWebsite.git
* [Connect to GitHub with SSH](https://help.github.com/articles/connecting-to-github-with-ssh/)
* `$ cd ~/FarmWebsite/`
* `$ npm install`
* `$ rm ~/FarmWebsite/client/js/views/Toast.js`
* `$ rm ~/FarmWebsite/client/js/views/templates/Toast.js`
* `$ rm ~/FarmWebsite/stylus/include/Toast.styl`
* `$ ln -s ~/FarmWebsite/node_modules/toast/views/Toast.js ~/FarmWebsite/client/js/views/Toast.js`
* `$ ln -s ~/FarmWebsite/node_modules/toast/views/templates/Toast.js ~/FarmWebsite/client/js/views/templates/Toast.js`
* `$ ln -s ~/FarmWebsite/node_modules/toast/stylus/Toast.styl ~/FarmWebsite/stylus/include/Toast.styl`

### Windows

### Linux

## Setting Up Environment

* Create a file called `.env` in the `~/FarmWebsite/` directory
* Copy and paste these environment variables into the `.env` file:
```
COOKIE="farmin"

DOMAIN="localhost"

HTTP_PORT="9001"

NAME="FutureDays Software"

NODE_ENV="DEVELOPMENT"

GOOGLE_BUCKET="five-gallon"

JWS_SECRET="FarmersAreTheWorst"

MONGODB="mongodb://localhost:27017/farm"

SALT="12"

STORAGE_URL="https://storage.googleapis.com/five-gallon/"
```

## Running/Testing The Website

* `$ mongod`
* `$ cd ~/FarmWebsite/`
* `$ node app.js`
* `$ cd ~/FarmWebsite/`
* `$ npm run build:watch`
* Open a web browser and enter the URL: "http://localhost:9001/"

## Authors

* [Future Days Software](https://github.com/FutureDaysSoftware)
* [Christopher Baron](https://github.com/cbaron)
* [Alex Cadigan](https://github.com/AlexCadigan)

## License

This software is licensed under the [MIT License](LICENSE)
