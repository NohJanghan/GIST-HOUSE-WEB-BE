const express = require('express')
const session = require('express-session')
const authRouter = require('./routes/auth')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(express.json())
app.use(session({
    secret: generateRandomString(),
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    }
}))

// 라우트
const URL_PREFIX = '/api'
app.use(URL_PREFIX + '/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

function generateRandomString(length = 32) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let res = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        res += characters[randomIndex];
    }
    return res;
}
