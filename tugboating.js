(function(){
    var game;
    var cur_direction = "S";
	var boat;
<<<<<<< HEAD
	var LENGTH_OFFSET = 256;
	var HALF_OFFSET = 128;
	var landTypes = {
		straight: 0,		
		bankLeft: 1,
		bankRight: 2,
		sharpLeft: 3,
		sharpRight: 4,
		sBend: 5
	};
	var Rails = new Array();
	

	function Rail(asset, x, y) {
		var me = this;
		Phaser.Sprite.call(me, game, x, y, asset);
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
	
	//function StraightMap(x,y) {
	//    var me = this;
	//    me.x = x;
	//    me.y = y;
	//	me.vertRail = new Rail("vertical",x,y);
	//	me.horiRail = new Rail("vertical",x-LENGTH_OFFSET,y);
	//}
	
	//function LeftMap(x,y) {
	//	var me = this;
	//	me.vertRail = new Rail("vertical",x,y);
	//	me.horiRail = new Rail("horizontal",x-LENGTH_OFFSET,y);
	//}
	
	//function RightMap(x,y) {
	//	var me = this;
	//	me.vertRail = new Rail("vertical",x,y);
	//	me.horiRail = new Rail("horizontal",x-LENGTH_OFFSET,y);
	
	//}		
	function startGame(){
		game = new Phaser.Game(800, 600, Phaser.AUTO, "container", { preload: preload, create: create, update: update });
		game.antialias = true;
	}
	function preload() {
	    game.load.image("boat", "assets/tug_boat64x128.png");
		 game.load.image("vertical", "assets/map/vertical.png");
		 game.load.image("left", "assets/map/left.png");
		 game.load.image("right", "assets/map/horizontal.png");
		 // game.load.image("bankLeft", "assets/map/bankLeft.png");
		 // game.load.image("bankRight", "assets/map/bankRight.png");
		 // game.load.image("sharpLeft", "assets/map/sharpLeft.png");
		 // game.load.image("sharpRight", "assets/map/sharpRight.png");
		 // game.load.image("sBend", "assets/map/sBend.png");
	}

	function create() {
		boat = game.add.sprite(100, 100, "boat");
		boat.anchor.setTo(0.5, 0.5);
		boat.body.drag.setTo(200, 200);

		createMap("*L");
		for (var i = 0; i < Rails.length ; i++) {
		    debugger;
		    game.add.existing(Rails[i].railLeft);
		    game.add.existing(Rails[i].railRight);
		}
		// map = new LeftMap(400,300);
		// game.add.existing(map.vertRail);
		// game.add.existing(map.horiRail);

=======
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
>>>>>>> origin/master
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
