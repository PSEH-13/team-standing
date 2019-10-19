const axios = require('axios')

const baseUrl = 'https://apiv2.apifootball.com/'
function client (config) {
  return axios.get(baseUrl, config)
}

module.exports = client