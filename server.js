const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'vasu',
    database : 'facedetectiondb'
  }
});

db.select('*').from('users').then(data =>{
	console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) =>{
	res.send('success')
});

app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image', (req,res) => {image.handleImagePut(req,res,db)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})


app.listen(process.env.PORT || 3001,() => {
	console.log(`app is running on port ${process.env.PORT}`)
});