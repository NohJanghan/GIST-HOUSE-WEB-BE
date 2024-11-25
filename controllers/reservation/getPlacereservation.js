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

module.exports = getPlacereservation