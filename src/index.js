const Phaser = require("phaser");
const create = require("./lifecycle/create");
const preload = require("./lifecycle/preload");
const update = require("./lifecycle/update");

// factories
require("./objects/MegaMan.js");

// constants
const { width, height, cameraWidth, cameraHeight } = require("./constants");

var config = {
    type: Phaser.AUTO,
    //screen boundaries
    width: cameraWidth,
    height: cameraHeight,
    scene: {
      preload,
      create,
      update,
    },
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
        tileBias: 70,
        fps: 60,
        gravity: {
          y: 2000,
        },
      },
    },
  };
  
  var game = new Phaser.Game(config);
  