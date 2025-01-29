const express = require('express');
const moviesRouter = require('./routers/movies')
const cors = require('cors')
// EXPRESS SETUP
const app = express();
const port = process.env.SERVER_PORT;


// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL
}))
// DEFINING ROUTES GROUPS
app.use('/movies', moviesRouter)

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
})