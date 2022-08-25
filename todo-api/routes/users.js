const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { Response, isTokenValid, secretKey } = require('../helpers/util')
const jwt = require('jsonwebtoken');

router.get('/', async function (req, res, next) {
  try {
    const data = await User.find().populate('todos')
    res.json(new Response(data))
  } catch (e) {
    res.status(500).json(new Response(e, false))
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { email, password, name, address } = req.body
    const data = await User.create({ email, password, name, address })
    res.json(new Response(data))
  } catch (e) {
    console.log('gagal tambah user', e)
    res.status(500).json(new Response(e, false))
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const { name, address } = req.body
    const data = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        address
      },
      {
        new: true
      }
    )
    res.json(new Response(data))
  } catch (e) {
    res.status(500).json(new Response(e, false))
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const data = await User.findByIdAndRemove(req.params.id)
    res.json(new Response(data))
  } catch (e) {
    res.status(500).json(new Response(e, false))
  }
});

router.post('/auth', async function (req, res, next) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')
    if (!user.comparePassword(password)) {
      return res.json(new Response({ message: "password doesn't match" }, false))
    }

    // create token
    user.token = jwt.sign({ userid: user._id, email: user.email }, secretKey);
    await user.save()

    res.json(new Response({
      email: user.email,
      name: user.name,
      token: user.token
    }))
  } catch (e) {
    console.log('gagal tambah user', e)
    res.status(500).json(new Response(e, false))
  }
});

router.get('/signout', async function (req, res, next) {
  const token = req.headers.authorization;

  if (token && token.split(' ')[1]) {
    const pureToken = token.split(' ')[1]

    try {
      const result = jwt.verify(pureToken, secretKey)
      const user = await User.findById(result.userid)
      user.token = null
      await user.save()
      res.json(new Response({ message: "signout success" }, true))
    } catch (e) {
      res.json(new Response({ message: 'token invalid' }, false))
    }
  } else {
    res.json(new Response({ message: 'token invalid' }, false))
  }
});

module.exports = router;
