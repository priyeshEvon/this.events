export default class GameScene extends Phaser.Scene{

    constructor(){
        super('GameScene');
    }

    preload(){
        this.load.spritesheet('player','/assets/player.png',{
            frameWidth:64,
            frameHeight:64
        })
        this.load.image('star','/assets/star.png')
    }

    create(){

        this.player=this.physics.add.sprite(50,50,'player',0);
        this.cursors=this.input.keyboard.createCursorKeys();
        this.stars=this.physics.add.group({
            key:'star',
            repeat:5,
            setXY:{x:150,y:150,stepX:80}
        });
        this.stars.children.iterate(child=>{
            child.setY(Phaser.Math.Between(100, 500));
            child.setScale(0.1);
        })

        //animation setup
        this.anims.create({
            key:'walkleft',
            frames:this.anims.generateFrameNumbers('player',{ frames: [7,6,5,4]}),
            frameRate:8,
            repeat:-1,
        })
        this.anims.create({
            key:'walkdown',
            frames:this.anims.generateFrameNumbers('player',{ frames: [0, 1, 2,3]}),
            frameRate:8,
            repeat:-1,
        })
        this.anims.create({
            key:'walkright',
            frames:this.anims.generateFrameNumbers('player',{ frames: [8,9,10,11]}),
            frameRate:8,
            repeat:-1,
        })
        this.anims.create({
            key:'walkup',
            frames:this.anims.generateFrameNumbers('player',{ frames: [12,13,14,15]}),
            frameRate:8,
            repeat:-1,
        })

        //collision
        this.physics.add.overlap(this.player,this.stars,this.collectStar,null,this);

        //scoreText
        this.score=0;
        this.scoreText=this.add.text(572,28,`Score: ${this.score}`)

        //event
        this.events.on('star-collected',this.updateScore,this)
    }
    update(){
        this.player.setVelocity(0);
        const speed=100;

        //controls and animations.
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-speed);
            this.player.anims.play('walkleft',true)
        }
        else if(this.cursors.down.isDown){
            this.player.setVelocityY(speed);
            this.player.anims.play('walkdown',true)
        }
        else if(this.cursors.right.isDown){
            this.player.setVelocityX(speed);
            this.player.anims.play('walkright',true)
        }
        else if(this.cursors.up.isDown){
            this.player.setVelocityY(-speed);
            this.player.anims.play('walkup',true)
        }
        else {
            this.player.anims.stop();
        }
    }

    collectStar(player,star){
        star.disableBody(true,true);
        this.events.emit('star-collected');
        if (this.stars.countActive(true) === 0) {
            this.gameOver();
        }
    }
    updateScore(){
        this.score+=10;
        this.scoreText.setText(`Score:${this.score}`)
    }
    gameOver() {
        this.player.setVelocity(0);
        this.player.anims.stop();
        this.physics.pause();
        
        this.add.text(200, 300, '🎉 Game Over!', {
            fontSize: '32px',
            fill: '#ffffff'
        });

        this.time.delayedCall(3000, () => {
            this.scene.restart();
        });
}
}