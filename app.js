const express = require('express');

const router = require('./routes/router');

const sequelize = require("./DB/DBconfig");
require("./models/models");

const {User} = require("./models/models")

const ejs = require('ejs');

const path = require('path');

const bodyParser = require('body-parser');

const app = express();

//setting static files directories
app.use(express.static(path.join(__dirname, "public")));

//setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

//using body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//using router
app.use("/", router);


// Before starting the server we want connect to the database and also persist the roles which will be used by the application.




sequelize.sync({ force: true }).then(()=>{
    console.log("database connected");
    User.create({
        username: 'johnDoe',
        password: 'sl8024'
    }).then((user) => {
        console.log('User created:', user.toJSON());
    }).catch((error) => {
        console.error('Error creating user:', error);
    });
    app.listen(3001, () => { 
        console.log("server started on port 3000!");
    });
}).catch(error=>{
    console.log("error connecting database",error)
})
