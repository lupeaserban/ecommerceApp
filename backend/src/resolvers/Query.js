const { forwardTo } = require('prisma-binding');

const Query = {
    users: forwardTo('db')
}

module.exports = Query