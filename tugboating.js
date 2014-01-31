(function(){
	var game;
	var boat;
	var barges;
	var waveEmitter;

	// Classes
	function Tug(){
		var me = this;

		Phaser.Sprite.call(me, game, game.world.centerX, game.world.centerY, "boat");
		me.anchor.setTo(0.5, 0.5);
		me.body.drag.setTo(500, 500);
		me.body.collideWorldBounds = true;
    	me.body.bounce.setTo(0.1, 0.1);
    	me.body.mass = 2;

    	game.add.existing(me);
	}

	Tug.prototype = Object.create(Phaser.Sprite.prototype);
	Tug.prototype.constructor = Tug;

	Tug.prototype.update = function(){
		var me = this;

		//  only move when you click
	    if (game.input.mousePointer.isDown)
	    {
	        me.rotation = game.physics.accelerateToPointer(me, this.game.input.activePointer, 300, 300, 300 );
	        waveEmitter.x = me.x;
	        waveEmitter.y = me.y;
	        // waveEmitter.angle
	        if(!waveEmitter.on){
	        	waveEmitter.start(false, 500, 2, 0);
	        }

	        //  if it's overlapping the mouse, don't move any more
	        if (Phaser.Rectangle.contains(me.body, game.input.x, game.input.y))
	        {
	            me.body.acceleration.setTo(0, 0);
	        }
	    }
	    else
	    {
	        me.body.acceleration.setTo(0,0);
	        if(waveEmitter.on){
	        	waveEmitter.on = false;
	        }
	    }
	}

	function Barge(){
		var me = this;

		Phaser.Sprite.call(me, game, game.world.randomX, game.world.randomY, "barge");
		me.body.collideWorldBounds = true;
		me.body.drag.setTo(100, 100);
		me.body.angularDrag = 30;
		me.body.allowRotation = true;
		me.anchor.setTo(0.5, 0.5);

		game.add.existing(me);
	}

	Barge.prototype = Object.create(Phaser.Sprite.prototype);
	Barge.prototype.constructor = Barge;

	Barge.prototype.update = function(){
		var me = this;

		if(me.body.touching.none){
			me.body.angularAcceleration = 0;
		}
	}

	function startGame(){
		game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "container", { preload: preload, create: create, update: update });
	}

	function preload() {
		 game.load.image("boat", "assets/boat.png");
		 game.load.image("barge", "assets/barge.png");
		 game.load.image("wave", "assets/wave.png");
		 game.load.image("wake", "assets/wake.png");
	}

	function create() {
		game.antialias = true;
		game.stage.backgroundColor = "#1693A5";
		game.world.setBounds(0, 0, 3000, 3000);

		for(var i=0; i<100; i++){
			game.add.sprite(game.world.randomX, game.world.randomY, "wave");
		}

		waveEmitter = game.add.emitter(0, 0, 5000);
	    waveEmitter.makeParticles("wake");
	    waveEmitter.gravity = 0;
	    waveEmitter.minParticleScale = 0.75;
	    waveEmitter.maxParticleScale = 2;

		boat = new Tug();
		barges = game.add.group();

		for(i=0; i<15; i++){
			barges.add(new Barge());
		}

		game.camera.follow(boat, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
	}

	function update() {
		boat.update();
		barges.callAll("update");

		game.physics.collide(boat, barges);
		game.physics.collide(barges, barges);
	}

	startGame();
})();