const { PrismaClient} = require('@prisma/client')

const prisma = global.prisma || new PrismaClient()
if(process.env.NODE_ENV !== 'production') {
    // 개발 환경에서는 전역 객체에 할당하여 핫 리로딩시에도 고정된 인스턴스를 사용하도록 함.
    // 다만, nodemon을 사용할 때에는 프로세스를 완전히 다시 시작하므로 중요한 부분은 아님.
    // 우리 프로젝트에서는 nodemon만 사용하고 next.js 등은 사용하지 않으므로 아마 필수는 아닐것 같음.
    global.prisma = prisma
}

module.exports = prisma