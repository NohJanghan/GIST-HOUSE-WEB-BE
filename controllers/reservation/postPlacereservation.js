// 예약 생성
async function postPlacereservation(req, res) {
  const { date, hour, facilityId } = req.body;
  try {
    if (!req.session.userInfo) {
      return res.status(403).send('403 forbidden')
    } else {
      const userId = req.session.userInfo;
      const newReservation = await prisma.place_reservation.create({
        data: { date, hour, facilityId, userId },
      });
      res.json(newReservation);
    }
  } catch (error) {
      res.status(500).json({ error: 'Failed to create reservation' });
  }
}

module.exports = postPlacereservation