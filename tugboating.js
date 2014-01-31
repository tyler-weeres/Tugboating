(function(){
	var game;
	var boat;
	var barges;
	var waveEmitter;
	var Tiles = [];
	var direction =
    {
        prev: "S",
        cur: "S"
    };

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

		debugger;
		// var noCollision = false;
		// while(!noCollision){
		// 	noCollision = true;
		// 	barges.forEach(function(barge){
		// 		if(me.bounds.containsRect(barge.bounds)){
		// 			noCollision = false;
		// 		}
		// 	});
		// 	if(!noCollision){
		// 		me.x = game.world.randomX;
		// 		me.y = game.world.randomY;
		// 	}
		// }
	}

	Barge.prototype = Object.create(Phaser.Sprite.prototype);
	Barge.prototype.constructor = Barge;

	Barge.prototype.update = function(){
		var me = this;

		if(me.body.touching.none){
			me.body.angularAcceleration = 0;
		}
	}

	function Rail(asset, x, y) {
        var me = this;
        Phaser.Sprite.call(me, game, x, y, asset);
    }

    Rail.prototype = Object.create(Phaser.Sprite.prototype);
    Rail.prototype.constructor = Rail;


    //CHRIS
    function CreateMap(railToken) {
        var prev = -2;
        for (var i = 0 ; i < railToken.length; i++) {
            prev++;
            switch (railToken[i]) {
                case "*":
                    Tiles.push(new MapPiece(500, 550, 628, 550, "vertical", "vertical"));
                    direction.cur = "S"
                    break;
                case "S":
                    if (direction.cur == "R") {
                        Tiles.push(new MapPiece(Tiles[prev].lX+128, Tiles[prev].lY , Tiles[prev].lX + 128, Tiles[prev].lY + 128, "right", "right"));
                        direction.prev = direction.cur;
                        direction.cur = "R";
                    } else if (direction.cur == "L") {
                        Tiles.push(new MapPiece(Tiles[prev].rX - 128, Tiles[prev].rY+128, Tiles[prev].rX - 128, Tiles[prev].rY, "left", "left"));
                        direction.prev = direction.cur;
                        direction.cur = "L";
                    } else {
                        if (direction.prev == "R") {

                            Tiles.push(new MapPiece(Tiles[prev].lX, Tiles[prev].lY - 256, Tiles[prev].lX + 128, Tiles[prev].lY - 256, "vertical", "vertical"));
                            direction.prev = direction.cur;
                            direction.cur = "S";

                        } else if (direction.prev == "L") {
                            Tiles.push(new MapPiece(Tiles[prev].lX, Tiles[prev].lY - 256, Tiles[prev].lX+128, Tiles[prev].lY-256, "vertical", "vertical"));
                            direction.prev = direction.cur;
                            direction.cur = "S";
                        } else {
                            Tiles.push(new MapPiece(Tiles[prev].lX, Tiles[prev].lY - 128, Tiles[prev].lX+128, Tiles[prev].lY-128, "vertical", "vertical"));
                            direction.prev = direction.cur;
                            direction.cur = "S";
                        }
                    }
                    break;
                case "L":
                    if (direction.cur == "R") {
                        Tiles.push(new MapPiece(Tiles[prev].lX + 128, Tiles[prev].lY+128, Tiles[prev].lX+256, Tiles[prev].lY, "left", "vertical"));
                        direction.prev = "L";
                        direction.cur = "S";
                    } else {
                        if (direction.prev == "R") {

                        } else {
                            Tiles.push(new MapPiece(Tiles[prev].lX + 128, Tiles[prev].lY - 128, Tiles[prev].lX, Tiles[prev].lY - 128, "vertical", "right"));
                            direction.prev = direction.cur;
                            direction.cur = "L";

                        }
                    }
                    break;
                case "R":
                    if (direction.cur == "L") {
                        Tiles.push(new MapPiece(Tiles[prev].lX-256, Tiles[prev].lY+128, Tiles[prev].lX-256, Tiles[prev].lY, "right", "vertical"));
                        direction.prev = "R";
                        direction.cur = "S";
                    } else {
                       if (direction.prev == "L") {
                           Tiles.push(new MapPiece(Tiles[prev].lX, Tiles[prev].lY - 256, Tiles[prev].lX, Tiles[prev].lY - 256, "vertical", "right"));
                           direction.prev = "S";
                           direction.cur = "R";
                        } else {
                            Tiles.push(new MapPiece(Tiles[prev].lX, Tiles[prev].lY - 128, Tiles[prev].lX, Tiles[prev].lY - 128, "vertical", "right"));
                            direction.prev = direction.cur;
                            direction.cur = "R";
                        }
                    }
                    break;
            }
        }

    }

    function MapPiece(lX, lY, rX, rY, lAsset, rAsset) {
        var me = this;
        var rotation = null;
        me.rX = rX;
        me.rY = rY;
        me.lX = lX;
        me.lY = lY;
        //check direction, rotate if need be
        if (rotation === "LEFT") {
            //rotate piece left
            me.railLeft = new Rail(lAsset, lX, lY);
            me.railRight = null;
        } else if (rotation === "RIGHT") {
            //rotate piece right
            me.railLeft = null;
            me.railRight = new Rail(rAsset, rX, rX);
        } else {//striaght rotation
            //  debugger;
            me.railRight = new Rail(rAsset, rX, rY);
            me.railLeft = new Rail(lAsset, lX, lY);
        }

    }

	function startGame(){
		game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "container", { preload: preload, create: create, update: update });
	}

	function preload() {
		game.load.image("boat", "assets/tug_boat.png");
        game.load.image("barge", "assets/barge.png");
        game.load.image("vertical", "assets/map/vertical.png");
        game.load.image("left", "assets/map/horizontal.png");
        game.load.image("right", "assets/map/horizontal.png");
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

		CreateMap("*RSLRLRSSLRLS");

        for (var i = 0; i < Tiles.length ; i++) {
            
            game.add.existing(Tiles[i].railLeft);
            game.add.existing(Tiles[i].railRight);
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
