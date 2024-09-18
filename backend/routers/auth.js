const express = require('express');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const router = express.Router();
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const SecretJWT = process.env.SECRET_JWT;


router.post('/login', (req, res, next) => {
    try {
        passport.authenticate('local', { session: false }, (err, recheckUser, info) => {
            if (err) return next(err);
            if (recheckUser) {
                const authToken = jwt.sign({ user: recheckUser }, SecretJWT, { expiresIn: '1h' });
                return res.status(200).json({
                    message: "Login successful",
                    body: recheckUser,
                    authToken: authToken,
                });
            } else {
                return res.status(422).json(info);
            }
        })(req, res, next);

    } catch (error) {
        return res.status(401).json({
            message: "Invalid username or password",
            error: error,
        })
    }
})

module.exports = router