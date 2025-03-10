const prisma = require('../../prismaClient')
const parseDate = require('../../utils/parseDate')

// 예약 생성
async function postPlacereservation(req, res) {
    // 쿼리가 누락된 경우 400 Bad request
    if(!req.query || !req.query.roomId || !req.query.YYYYMMDD || !req.query.hour) {
        return res.status(400).send('Bad request')
    }

    // 로그인 되지 않은 경우에는 403 Forbidden
    if(!req.session.userInfo || !req.session.userInfo.student_id) {
        return res.status(401).send('Unauthorized')
    }

    // TODO: 잔여 시간을 확인하여 예약할 수 있는지 확인 필요

    // 쿼리로 받아온 값의 형식 변경
    const date = parseDate(req.query.YYYYMMDD)
    const hour = Array.isArray(req.query.hour) ?
        req.query.hour.map(x => Number(x)) : [Number(req.query.hour)]
    const roomId = Number(req.query.roomId)

    // 요청 값 검증
    if(isNaN(roomId)) {
        return res.status(400).send('Bad request')
    }
    hour.forEach((h) => {
        if(isNaN(h) || h < 0 || h > 23) {
            return res.status(400).send('Bad request')
        }
    })

    // 세션에서 student_id 형식을 숫자로 변경
    const student_id = Number(req.session.userInfo.student_id)
    try {
        // 삽입할 데이터 설정
        // 외래 키의 경우 connect를 이용하여 설정하는게 더 좋아 보이지만 createMany에서는 중첩된 connect를 지원하지 않음.
        let data = []
        hour.forEach(h => data.push({
            studentId: student_id,
            date: date,
            hour: h,
            facilityId: roomId,
        }))

        // 데이터베이스 조작
        await prisma.place_reservation.createMany({
            data: data
        })

        return res.status(200).send('OK')
    } catch (e) {
        console.error(e)
        return res.status(500).send('Internal Server Error')
    }
}

module.exports = postPlacereservation