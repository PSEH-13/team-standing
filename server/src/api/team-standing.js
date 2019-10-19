const status = require('http-status')
const client = require('./request')

const config = { 
	params: {
		action: 'get_standings',
		APIkey: '9bb66184e0c8145384fd2cc0f7b914ada57b4e8fd2e4d6d586adcc27c257a978'
	}
}

module.exports = (app) => {
	// enable cors
	app.all('/*', function(req, res, next) {
		console.log('request made for: %s', req.originalUrl);
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
		res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
		next();
	})

  app.get('/team-standing/league/:leagueId', (req, res, next) => {
		config.params.league_id = req.params.leagueId		
		const response = client(config)
			.then(apiResponse => {
				res
					.status(status.OK)
					.json(apiResponse.data)
			})
		 	.catch(next)
  })
}