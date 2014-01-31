(function () {
    var game;
    var direction =
    {
        prev: "S",
        cur: "S"
    };
    var boat;
    var LENGTH_OFFSET = 256;
    var HALF_OFFSET = 128;
    var Tiles = new Array();

    function Rail(asset, x, y) {
        var me = this;
        Phaser.Sprite.call(me, game, x, y, asset);
        //debugger;

    }

    Rail.prototype = Object.create(Phaser.Sprite.prototype);
    Rail.prototype.constructor = Rail;

    function CreateMap(railToken) {
        var prev = -2;
        for (var i = 0 ; i < railToken.length; i++) {
            prev++;
            //    switch (railToken[i]) {
            //        case "*":
            //            Tiles.push(new MapPiece(400, 550, 300, 550, "vertical", "vertical"));
            //            direction.cur = "S"
            //            break;
            //        case "S":
            //            if (direction.cur === "R") {
            //                Tiles.push(new MapPiece(Tiles[prev ].rX+128, Tiles[prev].rY, Tiles[prev].lX + 128, Tiles[prev].lY+64, "right", "right"));
            //                direction.prev = direction.cur;
            //                direction.cur = "R"
            //            } else if (direction.cur === "L") {
            //                Tiles.push(new MapPiece(Tiles[prev].rX - 256, Tiles[prev].rY, Tiles[prev - 1].lX - 128, Tiles[prev - 1].lY, "left", "left"));
            //                direction.prev = direction.cur;
            //                direction.cur = "L"
            //            } else {
            //               // debugger;
            //                if (direction.prev === "R") {
            //                    Tiles.push(new MapPiece(Tiles[prev].rX, Tiles[prev].rY - 128, Tiles[prev].lX + 128, Tiles[prev].lY - 256, "vertical", "vertical"));
            //                    direction.prev = direction.cur;
            //                    direction.cur = "S"
            //                } else if (direction.prev === "L") {
            //                    Tiles.push(new MapPiece(Tiles[prev].rX + 128, Tiles[prev].rY-256, Tiles[prev].lX - 128, Tiles[prev].lY - 128, "vertical", "vertical"));
            //                    direction.prev = direction.cur;
            //                    direction.cur = "S"
            //                } else {
            //                    Tiles.push(new MapPiece(Tiles[prev].rX, Tiles[prev].rY - 128, Tiles[prev].lX , Tiles[prev].lY -128, "vertical", "vertical"));
            //                    direction.prev = direction.cur;
            //                    direction.cur = "S"
            //                }
            //            }
            //            break;
            //        case "L":
            //           // debugger;
            //            if (direction.cur === "R") {
            //                Tiles.push(new MapPiece(Tiles[prev - 1].rX, Tiles[prev - 1].rY, Tiles[prev - 1].rX + 128, Tiles[prev - 1].rY - 128, "left", "vertical"));
            //                direction.prev = "L";

            //                direction.cur = "S"
            //            } else {
            //                Tiles.push(new MapPiece(Tiles[prev].rX, Tiles[prev].rY - 128, Tiles[prev].rX - 128, Tiles[prev].rY - 128, "vertical", "left"));
            //                direction.prev = direction.cur;
            //                direction.cur = "L"
            //            }
            //            break;
            //        case "R":

            //            if (direction.cur === "L") {
            //                Tiles.push(new MapPiece(Tiles[prev - 1].lX - 128, Tiles[prev - 1].lY - 128, Tiles[prev - 1].lX - 128, Tiles[prev - 1].lY, "vertical", "right"));

            //                direction.prev = "R";
            //                direction.cur = "S"
            //            } else {
            //                Tiles.push(new MapPiece(Tiles[prev].lX-128, Tiles[prev].lY - 128, Tiles[prev].lX-128, Tiles[prev].lY - 128, "right", "vertical"));
            //                direction.prev = direction.cur;
            //                direction.cur = "R"
            //            }

            //            break;
            //    }
            //}

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
                        Tiles.push(new MapPiece(Tiles[prev].lX + 128, Tiles[prev].lY - 128, Tiles[prev].lX, Tiles[prev].lY - 128, "vertical", "right"));
                        direction.prev = direction.cur;
                        direction.cur = "L";
                    }
                    break;
                case "R":
                    if (direction.cur == "L") {
                        Tiles.push(new MapPiece(Tiles[prev].lX-256, Tiles[prev].lY+128, Tiles[prev].lX-256, Tiles[prev].lY, "right", "vertical"));
                        direction.prev = "R";
                        direction.cur = "S";
                    } else {

                        Tiles.push(new MapPiece(Tiles[prev].lX, Tiles[prev].lY - 128, Tiles[prev].lX, Tiles[prev].lY - 128, "vertical", "right"));
                        direction.prev = direction.cur;
                        direction.cur = "R";
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


    var barge;

    // Classes
    function Tug() {
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

    Tug.prototype.update = function () {
        var me = this;

        //  only move when you click
        if (game.input.mousePointer.isDown) {
            me.rotation = game.physics.accelerateToPointer(me, this.game.input.activePointer, 150, 150, 150);

            //  if it's overlapping the mouse, don't move any more
            if (Phaser.Rectangle.contains(me.body, game.input.x, game.input.y)) {
                me.body.acceleration.setTo(0, 0);
            }
        }
        else {
            me.body.acceleration.setTo(0, 0);
        }


    }

    function Barge() {
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

    Barge.prototype.update = function () {
        var me = this;


    }

    function startGame() {
        game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "container", { preload: preload, create: create, update: update });
    }

    function preload() {
        game.load.image("boat", "assets/map/tug_boat.png");
        game.load.image("barge", "assets/barge.png");
        game.load.image("vertical", "assets/map/vertical.png");
        game.load.image("left", "assets/map/horizontal.png");
        game.load.image("right", "assets/map/horizontal.png");

    }

    function create() {
        game.antialias = true;
        game.stage.backgroundColor = "#1693A5";

        boat = new Tug();
        barge = new Barge();
        CreateMap("*RLSSS");

        for (var i = 0; i < Tiles.length ; i++) {
            
            game.add.existing(Tiles[i].railLeft);
            game.add.existing(Tiles[i].railRight);
        }

    }

    function update() {
        boat.update();

        game.physics.collide(boat, barge);
    }

    startGame();
})();
