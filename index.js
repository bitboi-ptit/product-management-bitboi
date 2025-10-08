const express = require("express");
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
    cookie: {
        maxAge: 60000
    }
}));
app.use(flash());
//End flash

//dotenv
require('dotenv').config();
//End dotenv

const port = process.env.PORT;
database.connect();

//Pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
//End Pug

//Parse req body
app.use(bodyParser.urlencoded());

// App locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

console.log("hi");
console.log(__dirname);
console.log("hi");
app.use(express.static(`${__dirname}/public`));
clientRoute(app);
adminRoute(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})