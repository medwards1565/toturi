
window.onload = () => {
	// Serve contents of html to main div
	console.log(window);
	// Get nav
	fetch('./assets/blocks/header.html')
		.then(response => {
			return response.text();
		})
		.then(data => {
			document.querySelector('header').innerHTML = data;
		});
	// get Footer
	fetch('./assets/blocks/footer.html')
		.then(response => {
			return response.text();
		})
		.then(data => {
			document.querySelector('footer').innerHTML = data;
		});

	let curerentPath = window.location.pathname;
	let route;

	console.log(curerentPath);

	switch (curerentPath) {
		case '/':
			route = './assets/pages/home.html';
			newRoute(route);
			break;
		case '/about-the-team.html':
			route = './assets/pages/about-the-team.html';
			newRoute(route);
			break;
		case '/game-canvas.html':
			route = './assets/pages/game-canvas.html';
			newRoute(route);
			break;
		default:
			route = '/';
			newRoute(route);
			break;
	}

	function newRoute(route) {
		// Get about page
		fetch(route)
			.then(response => {
				return response.text();
			})
			.then(data => {
				document.getElementById('main').innerHTML = data;
				// Move this into its own file
				var config = {
					type: Phaser.AUTO,

					width: 800,
					height: 600,
					parent: 'game-scene',
					physics: {
						default: 'arcade',
						arcade: {
							gravity: { y: 200 },
						},
					},
					scene: {
						preload: preload,
						create: create,
					},
				};
				var game = new Phaser.Game(config);

				function preload() {
					this.load.setBaseURL('http://labs.phaser.io');

					this.load.image('sky', 'assets/skies/space3.png');
					this.load.image('logo', 'assets/sprites/phaser3-logo.png');
					this.load.image('red', 'assets/particles/red.png');
				}

				function create() {
					this.add.image(400, 300, 'sky');

					var particles = this.add.particles('red');

					var emitter = particles.createEmitter({
						speed: 100,
						scale: { start: 1, end: 0 },
						blendMode: 'ADD',
					});

					var logo = this.physics.add.image(400, 100, 'logo');

					logo.setVelocity(100, 200);
					logo.setBounce(1, 1);
					logo.setCollideWorldBounds(true);

					emitter.startFollow(logo);
				}
			// ====================================
			});
	}
};
