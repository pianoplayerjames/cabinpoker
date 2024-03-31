const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb://127.0.0.1:27017/cabinpoker')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  const newUser = new User({
    fullName: null,
    gender: null,
    dateOfBirth: null,
    country: null,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    balance: 0,
    playMoney: 10000,
    idVerified: 0,
    partner: 0,
    pro: 0,
    emailVerified: 0,
    accountCreated: Date.now(),
    gamblingBlock: 0,
    lvl: 1,
    xp: 10,
    nextXp: 100,
    tipAmount: 0,
    staffAccount: 0
  })

  newUser.save(err => {
    if(err) {
      return res.status(400).json({
        title: 'error',
        error: 'email or username already taken'
      })
    }
    return res.status(200).json({
      title: 'signup success'
    })
  })
})

app.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {

    if(err) {
      return res.status(500).json({
        title: 'Server Error',
        error: err
      })
    }

    if(!user) {
      return res.status(401).json({
        title: 'user not found',
        error: 'invalid credentials'
      })
    }

    // incorrect password
    if(!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'login failed',
        error: 'invalid credentials'
      })
    }

    // login successful
    let token = jwt.sign({ userId: user._id }, 'secretkey')
    return res.status(200).json({
      title: 'login success',
      token: token
    })

  })
})


app.listen(3001, () => {
  console.log(`Example app listening on port 3001`)
})