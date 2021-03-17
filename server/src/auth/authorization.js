const { verify } = require('jsonwebtoken');
const checkToken = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        console.log(authorization);
        if (!authorization) throw new Error('You need to login');
        const token = authorization && authorization.split(' ')[1];
        console.log("token")
        console.log(token)
        if (token == null) return res.sendStatus(401)
        const { userEmail } = verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!userEmail) {
            console.log("user email is not match")
            throw new Error()
        }
        req.userEmail = userEmail;
        console.log(userEmail)
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({ error: 'Please authenticate!' })
    }
}
module.exports = {
    checkToken
};