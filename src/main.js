import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  width: 720,
  height: 600,
  backgroundColor: "#84C669", 
  scene: [GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, 
      debug: false       
    }
  }
};

new Phaser.Game(config);
