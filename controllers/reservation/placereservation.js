// 예약 현황 조회
router.get("/", async (req, res) => {
  try {
    const { facilityId, startDate, endDate, status } = req.query;

    const where = {};
    if (facilityId) where.facilityId = facilityId;
    if (status) where.status = status;
    if (startDate || endDate) {
      where.startTime = {};
      if (startDate) where.startTime.$gte = new Date(startDate);
      if (endDate) where.startTime.$lte = new Date(endDate);
    }

    const reservations = await Reservation.findAll({
      where,
      include: { model: Facility, attributes: ["name", "description"] },
      order: [["startTime", "ASC"]],
    });

    res.json({ reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});