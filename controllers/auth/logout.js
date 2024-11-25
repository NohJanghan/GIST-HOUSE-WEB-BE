const express = require('express');

async function logout(req, res) {
    await req.session.destroy((err) => {
        if(err) {
            return res.status(500).send(err);
        } else {
            // 브라우저 측 세션 쿠키도 삭제. 세션 쿠키 이름이 바뀌면 여기도 수정이 필요함.
            res.clearCookie('connect.sid')
            return res.redirect('/')
        }
    });
}

module.exports = logout;