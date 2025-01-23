const express = require('express');
const moviesRouter = require('./routers/movies')
// EXPRESS SETUP
const app = express();
const port = process.env.SERVER_PORT;

// DEFINING ROUTES GROUPS
app.use('/movies', moviesRouter)

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
})