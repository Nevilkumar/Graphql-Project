const express = require("express");
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema.js');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/graphql', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection Successfull"))
    .catch((err) => console.log(err));



app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(8000, () => {
    console.log("Listening on port 8000");
})