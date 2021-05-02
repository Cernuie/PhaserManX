import megamanxsprite1 from '/assets/sprites/megamanxatlas.png';
import background from '/assets/background test.png';
import level1 from '/assets/level/tiled map test.json';
import tiles from '/assets/level/Request pack/sheet.png';

module.exports = function preload() {

    this.load.spritesheet('megamanxsprite1', megamanxsprite1, {
        frameWidth: 32,
        frameHeight: 64
    });

    //background image
    // this.load.image('bg', background);

    this.load.image('tiles', tiles);
    this.load.tilemapTiledJSON('level1', level1);
};
