const axios = require('axios');
const qs = require('querystring');

async function callback(req, res) {
    const state = req.query.state
    const authCode = req.query.code

    if(!authCode){
        return res.status(400).send("code is required")
    } else if(state !== req.session.state){
        return res.status(400).send("state is invalid")
    }

    // 엑세스 토큰 요청
    // 토큰 예시
    // {"access_token":"/////","token_type":"Bearer","expires_in":3600,"scope":"profile email phone student_id"}
    const token = await getTokens(authCode).then((tokenRes) => {
        return tokenRes.data
    }).catch(err => {
        console.error(err)
        return null
    })
    if(!token){
        return res.status(503).send("Can't get tokens")
    }

    // 사용자 정보 요청
    const userInfo = await getUserInfo(token.access_token).then((infoRes) => {
        return infoRes.data
    }).catch(() => {
        return null
    })
    if(!userInfo){
        return res.status(503).send("Can't get userInfo")
    }
    // 누락된 정보가 있을 경우 로그인 실패
    let droppedInfo = []
    if(!userInfo.student_id) droppedInfo.push('student id')
    if(!userInfo.phone_number) droppedInfo.push('phone number')
    if(!userInfo.user_name) droppedInfo.push('name')
    if(!userInfo.user_email_id) droppedInfo.push('email address')
    if(droppedInfo.length > 0){
        return res.status(400).send(`${droppedInfo.join(', ')} ${droppedInfo.length > 1 ? 'are' : 'is'} required.`)
    }

    // TODO...
    // 유저 정보를 DB에 저장
    // 저장된 DB 정보를 가져오기
    // 사용자를 프론트엔드로 리다이렉트
    // 아래는 임시로 된 것
    req.session.userInfo = {
        student_id: userInfo.student_id,
        phone: userInfo.phone_number,
        name: userInfo.user_name,
        email: userInfo.user_email_id,
        grant: null // TODO: 데이터베이스 이후에 수정해야함
    }

    // 정보는 이미 가져 왔으므로 토큰 무효화
    revokeToken(token.access_token)
    res.redirect(process.env.BASE_URL)
}

async function getTokens(authCode) {
    const data = qs.stringify({
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: process.env.REDIRECT_URI,
    })
    const auth = {
        username: process.env.GSA_CLIENT_ID,
        password: process.env.GSA_CLIENT_SECRET,
    }

    return axios.post(process.env.GSA_URL_API + '/oauth/token', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: auth,
    })
}

async function getUserInfo(accessToken) {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }

    return axios.get(process.env.GSA_URL_API + '/oauth/userinfo', config)
}

async function revokeToken(token, token_type = 'access_token') {
    const data = qs.stringify({
        token: token,
        token_type_hint: token_type,
    })
    const auth = {
        username: process.env.GSA_CLIENT_ID,
        password: process.env.GSA_CLIENT_SECRET,
    }
    return axios.post(process.env.GSA_URL_API + '/oauth/revoke', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: auth,
    })
}

module.exports = callback