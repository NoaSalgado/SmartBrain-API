import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signIn.js';
import handleProfile from './controllers/profile.js';
import { handleApiCall } from './controllers/image.js';
import { handleImage } from './controllers/image.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    url: process.env.DATABASE_URL || '',
    port: process.env.PGPORT || '',
    host: process.env.PGHOST || '127.0.0.1',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || '',
    database: process.env.PGDATABASE || 'smart-brain',
  },
});

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  handleSignIn(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  handleProfile(req, res, db);
});

app.post('/imageurl', (req, res) => {
  handleApiCall(req, res);
});

app.put('/image', (req, res) => {
  handleImage(req, res, db);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('App is running!!');
});
