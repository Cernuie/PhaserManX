import megamanxsprite1 from '/assets/sprites/megamanxatlas.png';
import megaman from '/assets/sprites/megaman.png';
import megamanJSON from '/assets/sprites/megaman.json';
// import level1 from '/assets/level/tiled map test.json';
// import tiles from '/assets/level/Request pack/sheet.png';
import demolvl from '/assets/level/demo.json';
import mtrdSet from '/assets/level/mtrd_tileset/mtrd_tileset.png';
import bullet from '/assets/sprites/megaman/frame123.png'
var assetRoot = '../../assets/quantitybar/';
import enemy from '/assets/sprites/cannon.png'
import deathparticle from '/assets/sprites/deathparticle.png'
import death from '/assets/sprites/megaman/frame120.png'
import announcement from '/assets/sound/announcement.mp3'
import ending from '/assets/sound/ending.mp3'
import bgm from '/assets/sound/bgm.mp3'
module.exports = function preload() {

    this.load.spritesheet('megamanxsprite1', megamanxsprite1, {
        frameWidth: 32,
        frameHeight: 64
    });

    //load in the megaman animation atlas
    this.load.atlas('megaman', megaman, megamanJSON)

    // this.load.image('tiles', tiles);
    // this.load.tilemapTiledJSON('level1', level1);
    this.load.image('tiles', mtrdSet);
    this.load.tilemapTiledJSON('demolvl', demolvl);

    this.load.image('bullet', bullet)
    this.load.image('enemy', enemy)
    this.load.image('deathparticle', deathparticle)
    this.load.image('death', death)
    this.load.audio('announcement', announcement);
    this.load.audio('ending', ending);
    this.load.audio('bgm', bgm)
};
