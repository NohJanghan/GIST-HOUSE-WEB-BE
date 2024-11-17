const express = require('express')
const session = require('express-session')
const authRouter = require('./routes/auth')
const app = express()

const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    maxAge: 24 * 60 * 60 * 1000,
    cookie: {
        secure: true,
        httpOnly: true,
    }
}))

// 라우트
const URL_PREFIX = '/api'
app.use(URL_PREFIX + '/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
