const router = require('express').Router()

const Users = require('../users/users-model')

const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 1)
    user.password = hash

    try {
        const saved = await Users.add(user)
        res.status(201).json(saved)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res, next) => {
    let {username, password} = req.body

    try {
        const user = await Users.findBy({username}).first()
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ msg: 'welcome'})
        } else {
            res.status(401).json(err)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)

    }

}) 

module.exports = router