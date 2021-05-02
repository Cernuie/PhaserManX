import megamanxsprite1 from '/assets/sprites/megamanxatlas.png';
import mmxspawn from '/assets/sprites/megamanxatlas.png';
import mmxspawnJSON from '/assets/sprites/mmxspawn.json';

module.exports = function preload() {

    // this.load.spritesheet('megamanxsprite1', megamanxsprite1, {
    //     frameWidth: 32,
    //     frameHeight: 64
    // });

    //test atlas made with 8 frames from the spawn in animation
    this.load.atlas('spawnIn', mmxspawn, mmxspawnJSON)
};
