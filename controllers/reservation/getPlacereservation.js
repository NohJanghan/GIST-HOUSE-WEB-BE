const prisma = require('../../prismaClient')
const parseDate = require('../../utils/parseDate')

// 예약 조회
async function getPlacereservation(req, res) {
  try {
    // 전체 예약 조회
    if(!req.query || !req.query.roomId || !req.query.YYYYMMDD) {
      return res.status(400).send('Bad Request')
    }
    let roomId = req.query.roomId
    roomId = Number(roomId)
    let date = req.query.YYYYMMDD
    // 날짜 형식 변경
    date = parseDate(date)
    
    let result = await prisma.place_reservation.findMany({
      where: {
        date: date,
        facilityId: roomId
      },
      select: {
        reservation_id: true,
        hour: true,
        student: {
          select: {
            id: true
          }
        },
      },
    });

    console.log(req.session)
    console.log(req.session.userInfo)
    // 로그인이 된 경우에는 구분하여 출력 & 학번 가림
    if (req.session.userInfo && req.session.userInfo.student_id) {
      const studentId = Number(req.session.userInfo.student_id)

      let myReservations = result.filter((reservation) => reservation.student.id === studentId)
      let otherReservations = result.filter((reservation) => reservation.student.id !== studentId)

      // 학번 정보 삭제
      myReservations.forEach((reservation) => {delete reservation.student})
      otherReservations.forEach((reservation) => {delete reservation.student})

      result = {reservations: otherReservations, myReservations: myReservations}
    }
    // 로그인 되지 않은 경우에는 학번만 가림
    else {
      result.forEach((reservation) => {delete reservation.student})
      result = {reservations: result, myReservations: []}
    }

    // 응답 반환
    res.json(result)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
}

module.exports = getPlacereservation;