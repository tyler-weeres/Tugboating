(function(){
    var game;
    var boat;
    var barges;
    var rails;
    var waveEmitter;
    var Tiles = [];
    var tileSize = 128;
    var sizeModifier = 6;
    var offSet = tileSize * sizeModifier
    var timerText;
    var WORLD_SIZE = 20000;

    var direction =
    {
        prev: "S",
        cur: "S"
    };

    // Classes
    function Tug(){
        var me = this;


        Phaser.Sprite.call(me, game, game.world.width/2 + (offSet/2), game.world.height - 30, "boat");
        me.anchor.setTo(0.5, 0.5);
        me.body.drag.setTo(500, 500);
        me.body.collideWorldBounds = true;
        me.body.bounce.setTo(0.1, 0.1);
        me.speed = typeof game.net.getQueryString("speed") == "string" ? Number(game.net.getQueryString("speed")) : 300;

        game.add.existing(me);
    }

    Tug.prototype = Object.create(Phaser.Sprite.prototype);
    Tug.prototype.constructor = Tug;

    Tug.prototype.update = function(){
        var me = this;

        //  only move when you click
        if (game.input.activePointer.isDown)
        {
            me.rotation = game.physics.accelerateToPointer(me, this.game.input.activePointer, me.speed, me.speed, me.speed );
            waveEmitter.x = me.x;
            waveEmitter.y = me.y;
            // waveEmitter.angle
            if(!waveEmitter.on){
                waveEmitter.start(false, 500, 1, 0);
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

        Phaser.Sprite.call(me, game, boat.x, game.world.height - 300, "barge");

        me.body.collideWorldBounds = true;
        me.body.drag.setTo(100, 100);
        me.body.angularDrag = 30;
        me.body.allowRotation = true;
        me.anchor.setTo(0.5, 0.5);

        game.add.existing(me);


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
        me.asset = asset;
        me.body.immovable = true;
    }

    Rail.prototype = Object.create(Phaser.Sprite.prototype);
    Rail.prototype.constructor = Rail;

    function CreateMap(railToken) {
        var prev = -2;

        for (var i = 0 ; i < railToken.length; i++) {
            prev++;
            switch (railToken[i]) {
                case "*":

                    Tiles.push(new MapPiece(game.world.width / 2, game.world.height - offSet, game.world.width / 2 + offSet, game.world.height - offSet, "verticalLeft", "verticalRight"));
                                      
                    direction.cur = "S"
                    break;
                case "S":
                    if (direction.cur == "R") {
                        Tiles.push(new MapPiece(Tiles[prev].lX+offSet, Tiles[prev].lY , Tiles[prev].lX + offSet, Tiles[prev].lY + offSet, "rightTop", "rightBottom"));
                        direction.prev = direction.cur;
                        direction.cur = "R";
                    } else if (direction.cur == "L") {
                        Tiles.push(new MapPiece(Tiles[prev].rX - offSet, Tiles[prev].rY+offSet, Tiles[prev].rX - offSet, Tiles[prev].rY, "leftBottom", "leftTop"));
                        direction.prev = direction.cur;
                        direction.cur = "L";
                    } else {
                        if (direction.prev == "R") {

                            Tiles.push(new MapPiece(Tiles[prev].lX, Tiles[prev].lY - (2*offSet), Tiles[prev].lX + offSet, Tiles[prev].lY - (2*offSet), "verticalLeft", "verticalRight"));
                            direction.prev = direction.cur;
                            direction.cur = "S";

                        } else if (direction.prev == "L") {
                            Tiles.push(new MapPiece(Tiles[prev].lX, Tiles[prev].lY - (2*offSet), Tiles[prev].lX+offSet, Tiles[prev].lY-(2*offSet), "verticalLeft", "verticalRight"));
                            direction.prev = direction.cur;
                            direction.cur = "S";
                        } else {
                            Tiles.push(new MapPiece(Tiles[prev].lX, Tiles[prev].lY - offSet, Tiles[prev].lX+offSet, Tiles[prev].lY-offSet, "verticalLeft", "verticalRight"));
                            direction.prev = direction.cur;
                            direction.cur = "S";
                        }
                    }
                    break;
                case "L":
                    if (direction.cur == "R") {

                        if (railToken[i - 1] != "S") {
                            Tiles.push(new MapPiece(Tiles[prev].lX + offSet, Tiles[prev].lY + offSet, Tiles[prev].lX + (2 * offSet), Tiles[prev].lY, "leftBottom", "verticalRight"));
                            direction.prev = "L";
                            direction.cur = "S";
                        } else {
                            Tiles.push(new MapPiece(Tiles[prev].lX + offSet, Tiles[prev].lY + offSet, Tiles[prev].lX + (2 * offSet), Tiles[prev].lY, "leftBottom", "verticalRight"));
                            direction.prev = "L";
                            direction.cur = "S";
                        }
                    } else {
                        if (direction.prev == "R") {
                            Tiles.push(new MapPiece(Tiles[prev].lX + offSet, Tiles[prev].lY - 2 * offSet, Tiles[prev].lX, Tiles[prev].lY - 2 * offSet, "verticalRight", "leftBottom"));
                            direction.prev = "S";
                            direction.cur = "L";
                        } else {
                            Tiles.push(new MapPiece(Tiles[prev].lX + offSet, Tiles[prev].lY - offSet, Tiles[prev].lX, Tiles[prev].lY - offSet, "verticalRight", "rightTop"));
                            direction.prev = direction.cur;
                            direction.cur = "L";
                        }
                    }
                    break;
                case "R":
                    if (direction.cur == "L") {
                        if (railToken[i-1] != "S") {
                            Tiles.push(new MapPiece(Tiles[prev].lX-(2*offSet), Tiles[prev].lY+offSet, Tiles[prev].lX-(2*offSet), Tiles[prev].lY, "rightBottom", "verticalLeft"));
                            direction.prev = "R";
                            direction.cur = "S";
                        } else {
                            Tiles.push(new MapPiece(Tiles[prev].lX - (offSet), Tiles[prev].lY - offSet + offSet, Tiles[prev].lX - (offSet), Tiles[prev].lY - offSet, "rightBottom", "verticalLeft"));
                            direction.prev = "R";
                            direction.cur = "S";
                        }
                    } else {
                        if (direction.prev == "L") {
                            Tiles.push(new MapPiece(Tiles[prev].lX, Tiles[prev].lY - (2*offSet), Tiles[prev].lX, Tiles[prev].lY - (2*offSet), "verticalLeft", "rightTop"));
                            direction.prev = "S";
                            direction.cur = "R";
                        } else {
                            Tiles.push(new MapPiece(Tiles[prev].lX, Tiles[prev].lY - offSet, Tiles[prev].lX, Tiles[prev].lY - offSet, "verticalLeft", "rightTop"));
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
        me.railRight = new Rail(rAsset, rX, rY);
        me.railLeft = new Rail(lAsset, lX, lY);
        

    }

    function startGame(){
        game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "container", { preload: preload, create: create, update: update });
    }

    function createMapToken() {
        height = game.world.height;
        width = game.world.height;
        cur_height = 0;
        cur_width = width / 2;
        cur_direction = "S";
        var changed = true;
        paths = ["S", "S", "S", "S", "S", "L", "L", "L", "R", "R", "R"];
        token = "*";
        for (var i = 0; i < 50 ; i++) {
            choice = Math.floor((Math.random() * (paths.length - 1)) + 1);

            if (paths[choice] != "S") {
                if (paths[choice] == token[token.length - 1] || paths[choice] == cur_direction ) {
                    continue;
                } else {
                    token = token.concat(paths[choice]);
                    if (cur_direction == "S") {
                        cur_direction = paths[choice];
                    } else {
                        cur_direction = "S";
                    }
                    
                }
            } else {
                token = token.concat(paths[choice]);
            }
        }   
	    return token;   
	}

	function preload() {
		game.load.image("boat", "assets/tug_boat.png");
        game.load.image("barge", "assets/OilBarge.png");
        game.load.image("verticalLeft", "assets/map/vertical_left.png");
        game.load.image("verticalRight", "assets/map/vertical_right.png");
        game.load.image("leftBottom", "assets/map/horizontal_bottom.png");
        game.load.image("leftTop", "assets/map/horizontal_top.png");
        game.load.image("rightBottom", "assets/map/horizontal_bottom.png");
        game.load.image("rightTop", "assets/map/horizontal_top.png");


		game.load.image("wave", "assets/wave.png");
		game.load.image("wake", "assets/wake.png");
	}

	function create() {
		game.antialias = true;
		game.stage.backgroundColor = "#1693A5";
		game.world.setBounds(0, 0, WORLD_SIZE, WORLD_SIZE);

		for(var i=0; i<WORLD_SIZE / 10; i++){
			game.add.sprite(game.world.randomX, game.world.randomY, "wave");
		}
        rails = game.add.group();
        token = createMapToken();
        CreateMap(token);

        for (var i = 0; i < Tiles.length ; i++) {


            if (Tiles[i].railLeft.asset.indexOf("right") != -1 || Tiles[i].railLeft.asset.indexOf("left") != -1 ) {
                Tiles[i].railLeft.scale.x = sizeModifier;
            }                
            else {
                Tiles[i].railLeft.scale.y = sizeModifier;
            }

            if (Tiles[i].railRight.asset.indexOf("right") != -1 || Tiles[i].railRight.asset.indexOf("left") != -1) {
                Tiles[i].railRight.scale.x = sizeModifier;
            }
            else {
                Tiles[i].railRight.scale.y = sizeModifier;
            }



            game.add.existing(Tiles[i].railLeft);
            game.add.existing(Tiles[i].railRight);

            rails.add(Tiles[i].railLeft);
            rails.add(Tiles[i].railRight);

        }

		waveEmitter = game.add.emitter(0, 0, 5000);
	    waveEmitter.makeParticles("wake");
	    waveEmitter.gravity = 0;
	    waveEmitter.minParticleScale = 0.75;
	    waveEmitter.maxParticleScale = 2;

		boat = new Tug();
		barges = game.add.group();

		for(i=0; i<1; i++){
			barges.add(new Barge());
		}
		game.camera.follow(boat, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

        timerText = document.getElementById("timerText");
	}

	function update() {
		boat.update();
		barges.callAll("update");

		game.physics.collide(boat, barges);
		game.physics.collide(barges, barges);
        game.physics.collide(barges, rails);
        game.physics.collide(boat, rails);

        timerText.textContent = "Time: " + Math.floor(game.time.totalElapsedSeconds());
	}

	startGame();
})();
