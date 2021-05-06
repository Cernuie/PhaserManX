const world = require("../world");
const { width, height, cameraWidth, cameraHeight } = require("../constants");
const { Cameras } = require("phaser");
import Bullets from "../objects/Bullet.js"
import { QuantityBar } from 'phaser-ui-tools';


module.exports = function create() {

    // tilemap
    // tile layers must be ordered properly
    // eg background must come before megaman in the code, and foreground must come after
    var map = this.make.tilemap({ key: 'demolvl' }); // calls from tilemap JSON
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
        key: 'death',
        frames: this.anims.generateFrameNames('megaman', {
            prefix: 'frame',
            suffix: '.png',
            start: 120,
            end: 120,
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

    // background layer ***MUST COME BEFORE LEVEL ENTITIES
    map.createStaticLayer(0, tileset); 

    // scale test for camera
    let megaMan = this.add.megaMan(100, 100, "megaman"); 
    megaMan.displayWidth = cameraWidth * .1; //determines player's relative size
    megaMan.scaleY = megaMan.scaleX;
    megaMan.play('idle');
    megaMan.DeathEmitter = this.add.particles('deathparticle').createEmitter();

    const player = megaMan
    world.player = this.physics.add.existing(player);
    megaMan.body.setSize(megaMan.frame.realWidth*.5, megaMan.frame.realHeight, true)
    world.player.play('warping_in');

    const enemy = this.add.enemy(3200, 600, 'enemy');
    enemy.displayWidth = enemy.displayWidth * 1.5;
    enemy.scaleY = enemy.scaleX;
    world.enemies.push(this.physics.add.existing(enemy));

    // collision layer
    var platforms = map.createStaticLayer(1, tileset); // param1: layerID; param2: tileset source
    platforms.setCollisionBetween(1,999,true); //enables collision with tiles ID 1-999
    this.physics.add.collider(player, platforms); //enable collsion between tiles and player
    this.physics.add.collider(enemy, platforms); //enable collsion between tiles and player

    // foreground layer
    map.createStaticLayer(2, tileset);

    // camera settings
    this.cameras.main.setBounds(0, 0, width, height - 80); //set bounds to the size of the game map
    this.cameras.main.startFollow(player, true, 0.055, 0.1); //camera follows player
    //this.cameras.main.setZoom(1.5);

    // set walls
    this.physics.world.setBounds(0, 0, width, height);

    // Game over screen
    this.gameOverScreen = this.add.rectangle(0, 0, width, height*2, 0xffffff, 1);
    this.gameOverScreen.scrollFactorX = 0;
    this.gameOverScreen.scrollFactorY = 0;
    this.gameOverScreen.alpha = 0;

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

    this.bullets = new Bullets(this);
    this.enemyBullets = new Bullets(this);

    //enemy bullets die when hitting player
    this.physics.add.overlap(player, this.enemyBullets, function(player, enemyBullets) {
        player.damaged(20);
        enemyBullets.destroy()
    }, null, this);

    //bullets die when hitting a wall
    this.physics.add.collider(this.bullets, platforms, function (bullets) {
        bullets.setActive(false);
        bullets.setVisible(false);
    })

    this.physics.add.collider(this.enemyBullets, platforms, function (enemyBullets) {
        enemyBullets.destroy()
    })

    //kill the enemy!!
    this.physics.add.overlap(enemy, this.bullets, function(enemy, bullets){
        enemy.damage()
        enemy.setTint(0xfefefe) // not working :(
        bullets.destroy()
    }, null, this)
    
    //sticks hp bar to camera and changes z index to forefront
    player.hp.bar.setScrollFactor(0,0)
    player.hp.bar.setDepth(1)

    //victory screen
    var win = this.add.zone(3725, 760).setSize(100, 200);
    this.physics.world.enable(win, 0); // (0) DYNAMIC (1) STATIC
    win.body.setAllowGravity(false);
    win.body.moves = false;

    //sounds for beginning and end
    this.announcementSound = this.sound.add("announcement", { loop: false, volume: .8 })
    this.announcementSound.play();
    
    let repeatFlag = true
    if(repeatFlag) {
        this.bgmSound = this.sound.add("bgm", { loop: true, volume: .4})
        this.bgmSound.play()
        repeatFlag = false;
    }

    this.winSound = this.sound.add("ending", { loop: false, volume:.2 })
    const self = this;
    this.physics.add.overlap(player, win, function(player) {
        self.winSound.play();
        alert("LEVEL 1 CLEAR\nThat's all for now\nThanks for playing!\n(Press 'R' to restart)")
        win.destroy()
    })

    //restart when softlocked
    this.input.keyboard.on('keydown-R', function (event) {
        this.scene.restart()
        this.sound.stopAll()
    }, this)

};
