module.exports = {

	appName: 'belcorp-lbel',

	folderBuild: './build',

	portDev: 3030,
	tunnelDev: false,

	cacheBust: false,

	packJs: ['main', 'thanks','bo', 'cl', 'co', 'cr', 'ec', 'sv', 'gt', 'mx', 'pa', 'pe', 'do'],
	targetList: ['es2020', 'chrome58', 'firefox57', 'safari11'],
	obfuscatorJs: false,

	packScss: ['styles'],

	titlePage: 'Encuesta Belleza | L’BEL',
	viewsGlobals: [
		{
			name: 'metaData',
			content: {
				url: 'https://conociendonos.lbel.com/',
				twitterSite: '@LBelOnline',
				twitterDomain: 'conociendonos.lbel.com',
				// facebookAppID: '',
				title: 'Encuesta Belleza | L’BEL',
				description: 'Sabemos que amas buscar la belleza desde la salud de tu piel. Por eso nos gustaría conocerte un poco más y brindarte recomendaciones a tu medida ¡Finaliza está encuesta y recibe un cupón exclusivo!',
				image: 'assets/images/backgrounds/open-graph.jpg'
			}
		}

	],

}
