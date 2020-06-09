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
            req.session.user = user
            res.status(200).json({ msg: 'welcome'})
        } else {
            res.status(401).json(err)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}) 

// can also use delete depending on the use case
router.get('/logout', async (req, res, next) => {
    if (req.session) {
        req.session.destroy( err => {
            err ? res.sendStatus(401) : res.sendStatus(200)
        })
    } else {
        res.send(401)
    }
})

module.exports = router