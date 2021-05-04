const world = require("../world");
const { width, height, cameraWidth, cameraHeight } = require("../constants");
const { Cameras } = require("phaser");
const { default: PlayerController } = require("../PlayerController");

module.exports = function create() {

    // tilemap
    // tile layers must be ordered properly
    // eg background must come before megaman in the code, and foreground must come after
    var map = this.make.tilemap({ key: 'small_tiles' }); // calls from tilemap JSON
    var tileset = map.addTilesetImage('mtrd', 'tiles'); // connects Tiled tileset to image source

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

    this.anims.create({
        key: 'fire',
        frames: this.anims.generateFrameNames('megaman', {
            prefix: 'frame',
            suffix: '.png', 
            start: 11,
            end: 11,
            zeroPad: 1
        }),
        frameRate: 20,
        repeat: 0
    })

    this.keys = {
        jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
        jump2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
        fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
        dash: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    };

    // background layer ***MUST COME BEFORE MEGAMAN
    map.createStaticLayer(0, tileset); 

    // scale test for camera
    let megaMan = this.add.megaMan(100, 100, "megaman"); 
    megaMan.displayWidth = cameraWidth * .1; //determines player's relative size
    megaMan.scaleY = megaMan.scaleX;
    megaMan.play('idle');

    const player = megaMan
    world.player = this.physics.add.existing(player);
    world.player.play('warping_in');

    // collision layer
    var platforms = map.createStaticLayer(1, tileset); // param1: layerID; param2: tileset source
    platforms.setCollisionBetween(1,999,true); //enables collision with tiles ID 1-999
    this.physics.add.collider(player, platforms); //enable collsion between tiles and player

    // foreground layer
    map.createStaticLayer(2, tileset);

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

    //testing playerController

    PlayerController
    this.PlayerController = new PlayerController(player)
    this.PlayerController.setState('idle')  

    //create the bullet 
    //bullet = this.add.Bullet(5, 5, "bullet");
    //animation for fire bullet
    //add context for firing in air/ground later
    this.input.keyboard.on('keydown-Z', function(event) {
        player.fire();

    })

    this.input.keyboard.on('keyup-Z', function(event) {
        player.stopFiring();
    })
};
