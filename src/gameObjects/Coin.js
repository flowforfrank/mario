
import increaseScore from '../ui/increaseScore'

class Coin {
    constructor(scene) {
        this.scene = scene;
        // Or you can simply say staticGroup, to make them immovable an not affected by gravity
        this.coins = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        // You could also use the same object layer and differentiate between different objects by custom properties
        const coinObjects = this.scene.map.getObjectLayer('coin').objects;
        
        for (const coin of coinObjects) {
            this.coins.create(coin.x, coin.y, 'atlas')
            .setOrigin(0)
            .setDepth(-1);
        }

        // --- Or ---
        // const coinSprites = this.scene.map.createFromObjects('coin');

        // for (const coin of coinSprites) {
        //     coin.setTexture('atlas')
        //         .setScale(1) // setTexture resets the scale to .5 so this is needed
        //         .setOrigin(0)
        //         .setDepth(-1);
            
        //     this.coins.add(coin);
        // }
    }

    collideWith(gameObject) {
        this.scene.physics.add.overlap(this.coins, gameObject, this.collect, null, this);

        return this;
    }

    update() {
        for (const coin of this.coins.children.entries) {
            coin.play('rotate', true);
        }
    }

    collect() {
        for (const coin of this.coins.children.entries) {
            if (!coin.body.touching.none) {
                coin.body.setEnable(false);

                this.scene.tweens.add({
                    targets: coin,
                    ease: 'Power1',
                    scaleX: 0,
                    scaleY: 0,
                    duration: 200,
                    onComplete: () => coin.destroy()
                });
            }
        }
        
        increaseScore(1);
    }
}

export default Coin;