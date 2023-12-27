const express = require('express');

const router = require('./src/routes/router');

const db = require('./src/models/index')


const ejs = require('ejs');

const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

//setting static files directories
app.use(express.static(path.join(__dirname, "public")));

//setting view engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "src", "views"));

//using body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//using router
app.use("/", router());

db.sequelize.sync().then(async ()=>{
    console.log("database connected");
    // const user = {
    //     username:"root",
    //     password: "root"
    // }
    // const createdUser = await User.create(user);
    
    app.listen(3000, () => { 
        console.log("server started on port 3000!");
    });
}).catch(error=>{
    console.log("error connecting database",error)
})
