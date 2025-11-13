const express = require("express");
//dotenv
require('dotenv').config();
//End dotenv
const path = require('path');
const methodOverride = require('method-override')
const app = express();
const bodyParser = require('body-parser');
const database = require("./config/database");
const clientRoute = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");
const systemConfig = require("./config/system");
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//method-override
app.use(methodOverride('_method'));
//End method-override

//flash
app.use(cookieParser('fjfjfj'));
app.use(session({
    saveUninitialized:false,
    resave: false,
    cookie: {
        maxAge: 60000 
    }
}));
app.use(flash());
//End flash

//Connect Database
const port = process.env.PORT;
database.connect();
//End Connect Database

//Pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
//End Pug

//Parse req body
app.use(bodyParser.urlencoded());

//tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//End tinymce


// App locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));
clientRoute(app);
adminRoute(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})