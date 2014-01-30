(function(){
	var game;
	var boat;

	// Classes
	function Tug(){
		var me = this;

		Phaser.Sprite.call(me, game, game.world.centerX, game.world.centerY, "boat");
		me.anchor.setTo(0.5, 0.5);
		me.body.drag.setTo(200, 200);
		me.body.collideWorldBounds = true;
    	me.body.bounce.setTo(0.1, 0.1);
	}

	Tug.prototype = Object.create(Phaser.Sprite.prototype);
	Tug.prototype.constructor = Tug;

	Tug.prototype.update = function(){
		var me = this;

		//  only move when you click
	    if (game.input.mousePointer.isDown)
	    {
	        me.rotation = game.physics.accelerateToPointer(me, this.game.input.activePointer, 200, 400, 400 );

	        //  if it's overlapping the mouse, don't move any more
	        if (Phaser.Rectangle.contains(me.body, game.input.x, game.input.y))
	        {
	            me.body.acceleration.setTo(0, 0);
	        }
	    }
	    else
	    {
	        me.body.acceleration.setTo(0,0);
	    }
	}

	function Barge(){
		var me = this;

		Phaser.Sprite.call(me, game, 100, 100, "barge");

	}

	Barge.prototype = Object.create(Phaser.Sprite.prototype);
	Barge.prototype.constructor = Barge;

	function startGame(){
		game = new Phaser.Game(800, 600, Phaser.AUTO, "container", { preload: preload, create: create, update: update });
		game.antialias = true;
	}

	function preload() {
		 game.load.image("boat", "assets/boat.png");
		 game.load.image("barge", "assets/barge.png");
	}

	function create() {
		boat = new Tug();
		game.add.existing(boat);
	}

	function update() {
		boat.update();
	}

	startGame();
})();