(function(){
	var game;
	var boat;
	var barge;

	// Classes
	function Tug(){
		var me = this;

		Phaser.Sprite.call(me, game, game.world.centerX, game.world.centerY, "boat");
		me.anchor.setTo(0.5, 0.5);
		me.body.drag.setTo(500, 500);
		me.body.collideWorldBounds = true;
    	me.body.bounce.setTo(0.1, 0.1);

    	game.add.existing(me);
	}

	Tug.prototype = Object.create(Phaser.Sprite.prototype);
	Tug.prototype.constructor = Tug;

	Tug.prototype.update = function(){
		var me = this;

		//  only move when you click
	    if (game.input.mousePointer.isDown)
	    {
	        me.rotation = game.physics.accelerateToPointer(me, this.game.input.activePointer, 150, 150, 150 );

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

		Phaser.Sprite.call(me, game, game.world.centerX, 200, "barge");
		me.body.collideWorldBounds = true;
		me.body.drag.setTo(100, 100);
		me.body.allowRotation = true;
		me.anchor.setTo(0.5, 0.5);	
    	// me.body.bounce.setTo(0.1, 0.1);

		game.add.existing(me);
	}

	Barge.prototype = Object.create(Phaser.Sprite.prototype);
	Barge.prototype.constructor = Barge;

	Barge.prototype.update = function(){
		var me = this;


	}

	function startGame(){
		game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "container", { preload: preload, create: create, update: update });
	}

	function preload() {
		 game.load.image("boat", "assets/boat.png");
		 game.load.image("barge", "assets/barge.png");
	}

	function create() {
		game.antialias = true;
		game.stage.backgroundColor = "#1693A5";

		boat = new Tug();
		barge = new Barge();
	}

	function update() {
		boat.update();

		game.physics.collide(boat, barge);
	}

	startGame();
})();