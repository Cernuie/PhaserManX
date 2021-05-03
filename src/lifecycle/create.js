const world = require("../world");
const { width, height, cameraWidth, cameraHeight } = require("../constants");
const { Cameras } = require("phaser");

module.exports = function create() {

    // adds background image
    // this.add.image(960, 540, 'bg');

    // creates various animations for megaman
    this.anims.create({
        key: 'warping_in',
        frames: this.anims.generateFrameNames('megaman', {
            prefix: 'spawn',
            suffix: '.png',
            start: 0,
            end: 0,
            zeroPad: 1
        }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'landing',
        frames: this.anims.generateFrameNames('megaman', {
            prefix: 'spawn',
            suffix: '.png',
            start: 0,
            end: 6,
            zeroPad: 1
        }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('megaman', {
            prefix: 'idle',
            suffix: '.png',
            start: 0,
            end: 2,
            zeroPad: 1
        }),
        frameRate: 20,
        repeat: -1,
        repeatDelay: 2000,
        yoyo: true
    });

    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNames('megaman', {
            prefix: 'run',
            suffix: '.png',
            start: 0,
            end: 10,
            zeroPad: 1
        }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNames('megaman', {
            prefix: 'frame',
            suffix: '.png',
            start: 73,
            end: 73,
            zeroPad: 1
        }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'dash_start',
        frames: this.anims.generateFrameNames('megaman', {
            prefix: 'dash',
            suffix: '.png',
            start: 0,
            end: 1,
            zeroPad: 1
        }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'dash',
        frames: this.anims.generateFrameNames('megaman', {
            prefix: 'dash',
            suffix: '.png',
            start: 1,
            end: 1,
            zeroPad: 1
        }),
        frameRate: 20,
        repeat: -1
    });

    this.keys = {
        jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
        jump2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
        fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
        dash: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    };

    // scale test for camera
    let megaMan = this.add.megaMan(100, 700, "megaman"); 
    megaMan.displayWidth = cameraWidth * .1; //determines player's relative size
    megaMan.scaleY = megaMan.scaleX;
    megaMan.play('idle');

    const player = megaMan
    world.player = this.physics.add.existing(player);
    world.player.play('warping_in');

    // tilemap
    var map = this.make.tilemap({ key: 'level1' }); // calls from tilemap JSON
    var tileset = map.addTilesetImage('level_tiles', 'tiles'); // connects Tiled tileset to image source
    var platforms = map.createStaticLayer(0, tileset) // param1: layerID; param2: tileset source
    map.setCollision([ 15 ]); // 15 is the tile ID code for the platform i used
    this.physics.add.collider(player, platforms);

    // camera settings
    this.cameras.main.setBounds(0, 0, width, height); //set bounds to the size of the game map
    this.cameras.main.startFollow(player, true, 0.055, 0.1); //camera follows player
    //this.cameras.main.setZoom(1.5);

    // set walls
    this.physics.world.setBounds(0, 0, width, height);

    //airdash event attempt - needs to have set length and immune to gravity (or velocity.y = 0?) for the duration
    this.input.keyboard.on('keydown-C', function (event) {
        if (player.body.onFloor()) {     
            player.dash();
            if (player.anims.currentAnim.key !== 'dash' && player.anims.currentAnim.key !== 'dash_start'){
                player.play('dash_start').on('animationcomplete', () => 
                {
                    player.play('dash');
                });
            }
        }
    });

    this.input.keyboard.on('keyup-C', function (event) {
        if (player.body.onFloor()) {
            player.stopDashing();
        }
    });
};
