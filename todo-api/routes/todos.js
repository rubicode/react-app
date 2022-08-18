var express = require('express');
var router = express.Router();
const Todo = require('../models/todo');
const User = require('../models/user');
const { Response, isTokenValid } = require('../helpers/util');

router.get('/', isTokenValid, async function (req, res, next) {
    try {
        const data = await Todo.find({ user: req.user._id }).populate({ path: 'user', select: 'name' })
        res.json(new Response(data))
    } catch (e) {
        res.status(500).json(new Response(e, false))
    }
});

router.post('/', isTokenValid, async function (req, res, next) {
    try {
        console.log('yang login', req.user)
        const { title } = req.body
        const user = await User.findById(req.user._id)
        const todo = await Todo.create({ title, user })
        user.todos.push(todo._id)
        await user.save()
        res.json(new Response(todo))
    } catch (e) {
        console.log('gagal', e)
        res.status(500).json(new Response(e, false))
    }
});

router.put('/:id', isTokenValid, async function (req, res, next) {
    try {
        const { title, complete } = req.body
        const data = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                title,
                complete
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

router.delete('/:id', isTokenValid, async function (req, res, next) {
    try {
        const data = await Todo.findByIdAndRemove(req.params.id)
        const user = await User.findById(data.user)
        
        user.todos = user.todos.filter(item => !item.equals(data._id))
        await user.save()
        res.json(new Response(data))
    } catch (e) {
        console.log(e)
        res.status(500).json(new Response(e, false))
    }
});

module.exports = router;
