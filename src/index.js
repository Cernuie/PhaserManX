const Phaser = require("phaser");
const create = require("./lifecycle/create");
const preload = require("./lifecycle/preload");
const update = require("./lifecycle/update");

// constants
const { width, height } = require("./constants");