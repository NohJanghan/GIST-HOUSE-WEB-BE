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
    
    const result = await prisma.place_reservation.findMany({
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

    let myReservation = null;
    if (req.session.userInfo) {
      const userId = req.session.userInfo.id;
      myReservation = await prisma.place_reservation.findMany({
        where: {
          date: date,
          facilityId: roomId,
          student: {
            id: userId
          },
        },
        select: {
          reservation_id: true,
          hour: true,
        },
      });
    }

    // 로그인 여부 확인 및 응답 반환
    if (!req.session.userInfo) {
      res.json({
        reservations: result,
      });
    } else {
      res.json({
        reservations: result,
        myReservation: myReservation,
      });
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
}

module.exports = getPlacereservation;