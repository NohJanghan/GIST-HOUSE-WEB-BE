// 예약 조회
async function getPlacereservation(req, res) {
  try {
    const reservations = await prisma.place_reservation.findMany({
      include: { facility: true, student: true },
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
}

// 예약 생성
// router.post('/', async (req, res) => {
//   const { date, hour, facilityId, studentId } = req.body;
//   try {
//     const newReservation = await prisma.place_reservation.create({
//       data: { date, hour, facilityId, studentId },
//     });
//     res.json(newReservation);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create reservation' });
//   }
// });

module.exports = getPlacereservation