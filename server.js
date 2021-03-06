const express = require('express');
const http = require('http');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require("mongoose");
const MONGO_ATLAS_URI = require("./config/keys").mongoURI;

const postRouter = require("./routes/api/posts");

app.set('port', process.env.PORT || 5000);

app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
    .connect(
        MONGO_ATLAS_URI,
        { autoIndex: false, useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.use("/posts", postRouter);


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


http.createServer(app).listen(app.get('port'), function () {
    console.log('HttpServer starting  : ' + 'PORT=' + app.get('port'));
});
