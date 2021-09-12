const jwt = require('jsonwebtoken')

const fetchUser = (req, res, next) => {
    // Get The User Name from jwt token and add id to req object

    const token = req.header('auth-token')
    const JWT_SECRET = 'P@$$vvOrd'

    if (!token) {
        res.status(403).send({ error: 'Please authenticate using a valid Token' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next()
    } catch (error) {
        res.status(403).send({ error: 'Please authenticate using a valid Token' })
    }

}

module.exports = fetchUser