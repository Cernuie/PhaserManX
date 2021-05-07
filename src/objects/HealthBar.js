const Phaser = require("phaser");

export default class HealthBar {

  constructor (scene, x, y)
  {
      this.bar = new Phaser.GameObjects.Graphics(scene);

      this.x = x;
      this.y = y;
      this.value = 100;
      this.p = 76 / 100;

      this.draw();
      scene.add.existing(this.bar);
  }

  decrease (amount)
  {
      this.value -= amount;

      if (this.value < 0)
      {
          this.value = 0;
      }

      this.draw();

      return (this.value === 0);
  }

  draw ()
  {
      this.bar.clear();

      //  BG
      this.bar.fillStyle(0x000000);
      this.bar.fillRect(this.x, this.y, 16, 80);

      //  Health
      this.bar.fillStyle(0xffffff);
      this.bar.fillRect(this.x + 2, this.y + 2, 12, 76);

      //low health color change
      if (this.value <= 30)
      {
          this.bar.fillStyle(0xff0000);
      }
      else if (this.value < 50) {
          this.bar.fillStyle(0xeedd00)
      }
      else
      {
          this.bar.fillStyle(0x00ff00);
      }

      var d = Math.floor(this.p * this.value);

      this.bar.fillRect(this.x + 2, this.y + 2 + (76 - d), 12, d);
  }

}
