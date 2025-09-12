const express = require("express");
const app = express();
const database = require("./config/database");
const route = require("./routes/client/index.route");

require('dotenv').config(); 
const port = process.env.PORT;
database.connect();
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static("public"));
route(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})