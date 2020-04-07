HEROKU DEPLOYMENT
=================

APP.JS
mongoose.connect(process.env.MONGODB_URI...
heroku addons:create mongolab
app.listen(process.env.PORT || 3000...

PACKAGE.JSON
  "engines": {
    "node": "12.x"
  }

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },


ADD FAVICON
=================