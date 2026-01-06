const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
// const { connectDB } = require('./config/db');
const { foodRoutes } = require('./routes/foodRoute');


require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://restaurant-managment-web.netlify.app", "https://merry-florentine-c0f7d9.netlify.app"],
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())

app.post('/jwt', async(req, res) =>{
      const user = req.body;

      const token = jwt.sign(user, 'jwt-secret', {expiresIn: '3d'})
      res.cookie('token', token, {
        httpOnly: true,
        secure: true, //when under devplopment === false and when go to production === true
        sameSite: 'none', // when under devplopment === strict and when go to production === none
        expiresIn: 3*24*60*60*1000
      })

      res.send({message: 'Token generated and has been saved on the cookie...!'})
})

app.get('/', (req, res) => {
    res.send('Server is running....')
});


app.use(foodRoutes)



module.exports = {app}
