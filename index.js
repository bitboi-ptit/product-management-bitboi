const express = require("express");
const app = express();
const database = require("./config/database");
const clientRoute = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");
const systemConfig = require("./config/system");

require('dotenv').config(); 
const port = process.env.PORT;
database.connect();
app.set('views', './views'); // 
app.set('view engine', 'pug');
// App locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"));
clientRoute(app); 
adminRoute(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})