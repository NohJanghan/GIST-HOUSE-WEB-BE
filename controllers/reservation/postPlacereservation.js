// 예약 생성
async function postPlacereservation(req, res) {
    const { date, hour, facilityId, studentId } = req.body;
    try {
        const newReservation = await prisma.place_reservation.create({
            data: { date, hour, facilityId, studentId },
        });
        res.json(newReservation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create reservation' });
    }
}

module.exports = postPlacereservation