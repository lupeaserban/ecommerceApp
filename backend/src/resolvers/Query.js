const { forwardTo } = require('prisma-binding');

const Query = {
    products: forwardTo ('db'),
    productsConnection: forwardTo ('db'),
    users: forwardTo('db'),
    user: forwardTo('db')
}

module.exports = Query