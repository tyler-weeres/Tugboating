(function(){
	var game;
	var boat;

	function startGame(){
		game = new Phaser.Game(800, 600, Phaser.AUTO, "container", { preload: preload, create: create, update: update });
		game.antialias = true;
	}
	function preload() {
		 game.load.image("boat", "assets/boat.png");
	}

	function create() {
		boat = game.add.sprite(100, 100, "boat");
		boat.anchor.setTo(0.5, 0.5);
		boat.body.drag.setTo(200, 200);
	}

	function update() {
		//  only move when you click
	    if (game.input.mousePointer.isDown)
	    {
	        boat.rotation = game.physics.accelerateToPointer(boat, this.game.input.activePointer, 200, 400, 400 );

	        //  if it's overlapping the mouse, don't move any more
	        if (Phaser.Rectangle.contains(boat.body, game.input.x, game.input.y))
	        {
	            boat.body.acceleration.setTo(0, 0);
	        }
	    }
	    else
	    {
	        boat.body.acceleration.setTo(0,0);
	    }
	}

	startGame();
})();