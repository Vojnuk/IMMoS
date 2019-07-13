'esversion:6';

const MongoClient = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
//const dotenv = require("dotenv").config();


const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(index.html));

const uri = process.env.PROD_MONGODB;
MongoClient.connect(uri, { useNewUrlParser: true, poolSize: 50, })
.then(client => {
    const db = client.db('settlements');
    const collection = db.collection('cities');
    app.locals.collection = collection;
    app.listen(port, () => console.info(`REST API running on port ${port}`));
  }).catch(error => console.error(error));


app.get('/', (req, res) => {
    const collection = req.app.locals.collection;
    collection.find({}).project({"_id":0}).toArray()
        .then(response => res.status(200).json(response))
        .catch(error => console.error(error));
});


app.get('/pictures/tvrdjava.jpg', (req, res) => {
         res.sendFile('/home/vojnuk/Desktop/projects/mapa/pictures/tvrdjava.jpg');
         });



