// OAuth2(OIDC)를 이용한 인증
// https://infoteam-rulrudino.notion.site/GSA-OAuth2-OIDC-fa09594e4b2548758e1343c84d7da008#95c5d7abbd374203a036ca4e540b0210
function requestAuth(req, res) {
    const state = generateRandomString()
    const authParam = {
        scope: 'openid offline_access profile email phone student_id',
        response_type: 'id_token',
        state: state,
        redirect_uri: process.env.REDIRECT_URI,
        prompt: 'none',
    }

    // 세션으로 state 관리
    req.sessions.state = state

    const auth_url = process.env.GSA_URL_AUTH + '?' + object2encodedQuery(authParam)
    res.redirect(auth_url)
}

module.exports = requestAuth

function generateRandomString(length = 32) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let res = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        res += characters[randomIndex];
    }
    return res;
}

// object를 쿼리에 사용할 수 있는 형식으로 변환
function object2encodedQuery(obj) {
    return Object.entries(obj)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&')
}