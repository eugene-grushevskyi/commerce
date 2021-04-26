const commerce = require('./commerce.config.json')

module.exports = {
  commerce,
  images: {
    domains: ['nestbn.herokuapp.com', 'ucarecdn.com', 'localhost'],
  },
  future: {
    webpack5: true,
  },
}
