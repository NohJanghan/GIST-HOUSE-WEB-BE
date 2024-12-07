// YYYYMMDD 형식의 데이터를 받아서 prisma에 바로 쓸 수 있는 날짜 형식으로 바꿔주는 함수
function parseDate(YYYYMMDD) {
    return new Date(YYYYMMDD.slice(0,4) + '-' + YYYYMMDD.slice(4,6) + '-' + YYYYMMDD.slice(6, 8))
}

module.exports = parseDate