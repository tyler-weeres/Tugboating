(function(){
    var game;
    var cur_direction = "S";
	var boat;
	var LENGTH_OFFSET = 256;
	var HALF_OFFSET = 128;
	var Rails = new Array();
	

	function Rail(asset, x, y) {
		var me = this;
		Phaser.Sprite.call(me, game, x, y, asset);
		debugger;
		me.x = Phaser.Sprite.bottomRight;
        
	}

	Rail.prototype = Object.create(Phaser.Sprite.prototype);
	Rail.prototype.constructor = Rail;
	
	function createMap(railToken) {
	    var prev = -2;
	    for(var i = 0 ; i<railToken.length; i++) {
	        prev++;
			switch(railToken[i]) {
			case "*":
			    Rails.push(new mapPiece(400, 350, 500, 350, "vertical", "vertical"));
				break;
		    case "S":
		        Rails.push(new mapPiece(Rails[prev].rX, Rails[prev].rY - LENGTH_OFFSET, Rails[prev].lX, Rails[prev].lY - LENGTH_OFFSET, "vertical", "vertical"));
			    cur_direction = "S"
				break;
			case "L":
			    Rails.push(new mapPiece(Rails[prev].rX, Rails[prev].rY - LENGTH_OFFSET, Rails[prev].lX, Rails[prev].lY - LENGTH_OFFSET, null, "left"));
			    cur_direction = "L"
				break;
			case "R":
			    Rails.push(new mapPiece(Rails[prev].rX, Rails[prev].rY, Rails[prev].lX, Rails[prev].lY + LENGTH_OFFSET, "right", null));
			    cur_direction = "R"
				break;
			}
		}
	
	
	}
	
	function mapPiece(rX, rY, lX, lY, rAsset, lAsset) {
	    var me = this;
	    me.rX = rX;
	    me.rY = rY;
	    me.lX = lX;
	    me.lY = lY;
	    var rotation = null;
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
	        debugger;
	        me.railLeft = new Rail(lAsset, lX, lY);
	        me.railRight = new Rail(rAsset, rX, rY);
	    }

	}
	
	


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
		 game.load.image("vertical", "assets/map/vertical.png");
		 game.load.image("left", "assets/map/diagonal_left.png");
		 //game.load.image("right", "assets/map/horizontal.png");

	}

	function create() {
	    game.antialias = true;
	    game.stage.backgroundColor = "#1693A5";

	    boat = new Tug();
	    barge = new Barge();
	    createMap("*L");
	    for (var i = 0; i < Rails.length ; i++) {
	
	        game.add.existing(Rails[i].railLeft);
	        game.add.existing(Rails[i].railRight);
	    }
	}

	function update() {
		boat.update();

		game.physics.collide(boat, barge);
	}

	startGame();
})();
