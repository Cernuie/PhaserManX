import megamanxsprite1 from '/assets/sprites/megamanxatlas.png';
import megaman from '/assets/sprites/megaman.png';
import megamanJSON from '/assets/sprites/megaman.json';
import background from '/assets/background test.png';

module.exports = function preload() {

    this.load.spritesheet('megamanxsprite1', megamanxsprite1, {
        frameWidth: 32,
        frameHeight: 64
    });

    //test atlas made with 8 frames from the spawn in animation
    this.load.atlas('megaman', megaman, megamanJSON)

    //background image
    this.load.image('bg', background);
};
