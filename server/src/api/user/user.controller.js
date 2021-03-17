const { createUser, deleteUser, updateToken, removeToken, getUserByUserEmail, getUserByUserId, updateUser } = require("./user.service");
const { createAccessToken, createRefreshToken, sendAcessToken, sendTokens } = require("../../auth/token");
const { validationResult } = require("express-validator")
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');

module.exports = {
    signup: (req, res) => {
        // check if its valid input
        console.log(req.body);
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(422).send({ message: "invalid input" });
        }
        // get the body of req
        const body = req.body
        // check if email is already existed in the database
        getUserByUserEmail(body.email, async (err, results) => {
            if (err) {
                console.log(err);
                return res.send({ message: "error" })
            }
            const user = results;
            if (user) {
                console.log("Email already existed");
                return res.send({ message: "Email already existed" })
            }
            // Email is new then create hashpasss store all info into database
            const hashedPassword = await hash(body.password, 10);
            console.log("hash passs");
            console.log(hashedPassword);
            body.password = hashedPassword;
            console.log(body)
            createUser(body, (err, results) => {
                if (err) {
                    console.log(err);
                    res.send({ err });
                }
                res.send({ messsage: 'User created' });
            });
        })
    },
    login: (req, res) => {
        console.log(req.body)
        const body = req.body;
        // check if User is existed in the database
        getUserByUserEmail(body.email, async (err, results) => {
            if (err) {
                console.log(err);
                return res.send({ message: "error" });
            }
            const user = results;
            if (!user) {
                console.log("User does not exist");
                res.send({ message: "User does not exist" });
            }
            // check if password is correct
            const valid = await compare(body.password, user.password);
            if (!valid) {
                console.log("incorrect password");
                res.send({ message: "incorrect password" });
            }
            // create refresh and accesstoken (using email and secret to generate token)
            const accesstoken = createAccessToken(user.email);
            const refreshtoken = createRefreshToken(user.email);
            // store the refresh token to the req body and update in the database
            user.refreshToken = refreshtoken;
            updateToken(user, async (err, results) => {
                if (err) {
                    console.log(err);
                    return res.send({ message: "Error with update token" })
                }
                console.log("Updated refreshtoken in the database");
            });
            // send accesstoken to the request and refreshtoken to cookie
            sendTokens(res, req, refreshtoken, accesstoken);
        })
    },
    logout: (req, res) => {
        const userEmail = req.body.email;
        // remove refreshtoken in the database
        removeToken(userEmail, async (err, results) => {
            if (err) {
                console.log(err)
                res.send({ message: "error" })
            }
            console.log("Removed refreshtoken in the database");
        });
        // remove cookie refreshtoken
        res.clearCookie('refreshtoken', { path: '/refresh_token' });
        return res.send({ message: 'Logged out' });
    },
    getProfile: (req, res) => {
        const userEmail = req.userEmail;
        getUserByUserEmail(userEmail, async (err, results) => {
            if (err) {
                console.log("profile not found");
                res.send((err));
            }
            return res.send(results);
        });
    },
    updateProfile: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("invalid input");
            return res.send({ error: "invalid input" });
        }
        const body = req.body;
        body.email = req.email;
        updateUser(body, async (err, results) => {
            if (err) {
                return res.send(err);
            }
            return res.send(results);
        })

    },
    refresh_token: async (req, res) => {
        const token = req.cookies.refreshtoken;
        if (!token) {
            console.log("cookies not found on /refresh_token");
            return res.send({ accesstoken: '' });
        }
        let payload = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch (err) {
            console.log("user email does not match")
            return res.send({ accesstoken: '' })
        }
        getUserByUserEmail(payload.userEmail, (err, results) => {
            if (err) {
                console.log(err);
                return res.send({ message: "error" });
            }
            const user = results;
            if (!user) {
                console.log("cannot find user email in database")
                return res.send({ accesstoken: '' });
            }
            // get the token from the database
            const tokenDatabse = user.refreshToken;
            if (!tokenDatabse) {
                return res.send({ accesstoken: '' });
            }
            if (token !== tokenDatabse) {
                return res.send({ accesstoken: '' });
            }
            console.log('everything is correct then send new accesstoken')
            // create accesstoken (using email and secret to generate token)
            const accesstoken = createAccessToken(user.email);
            // send accesstoken to the request 
            sendAcessToken(res, req, accesstoken);
        })
    }

};
