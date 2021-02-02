class Debugger {
    constructor(scene) {
        this.debuggerEnabled = false;
        this.useDeadZone = !!scene.cameras.main.deadzone;
        this.scene = scene;
        this.config = {
            debuggerColor: 0xff0000,
            gameWidth: scene.game.config.width,
            gameHeight: scene.game.config.height,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200),
            faceColor: new Phaser.Display.Color(40, 39, 37, 150)
        };

        if (this.debuggerEnabled) {
            this.create();
        }

        document.getElementsByTagName('input')[0].addEventListener('click', e => {
            this.debuggerEnabled = e.target.checked;
            this.debuggerEnabled
                ? this.create()
                : this.destroy();
        });
    }

    create() {
        this.debuggerGraphics = this.scene.add.graphics().setAlpha(.5);
        this.scene.physics.world.createDebugGraphic();

        this.worldBounds = this.scene.add.rectangle(
            this.scene.physics.world.bounds.x,
            this.scene.physics.world.bounds.y,
            this.scene.physics.world.bounds.width,
            this.scene.physics.world.bounds.height, this.config.debuggerColor, 0)
        .setOrigin(0)
        .setStrokeStyle(1, this.config.debuggerColor, 1);

        this.centerLine = this.scene.add.line(0, 0, 
            this.config.gameWidth / 2, 0,
            this.config.gameWidth / 2, this.config.gameHeight,
            this.config.debuggerColor).setOrigin(0);
        
        // Uses default colors, except for tileColor
        this.scene.platform.renderDebug(this.debuggerGraphics, {
            tileColor: null,
            collidingTileColor: this.config.collidingTileColor,
            faceColor: this.config.faceColor
        });

        if (this.useDeadZone) {
            this.deadzone = this.scene.add.rectangle(
                this.scene.cameras.main.deadzone.x,
                this.scene.cameras.main.deadzone.y,
                this.scene.cameras.main.deadzone.width,
                this.scene.cameras.main.deadzone.height,
                this.config.debuggerColor, .15
            )
            .setOrigin(0);
        }
    }

    update() {
        this.worldBounds.setX(this.scene.physics.world.bounds.x);
        this.worldBounds.setY(this.scene.physics.world.bounds.y);
        this.useDeadZone && this.deadzone.setX(this.scene.cameras.main.deadzone.x);

        this.centerLine.setX(this.scene.cameras.main.midPoint.x - this.config.gameWidth / 2);
    }

    destroy() {
        this.scene.physics.world.debugGraphic.destroy()

        this.worldBounds.destroy();
        this.centerLine.destroy();
        this.debuggerGraphics.destroy();
        this.useDeadZone && this.deadzone.destroy();
    }
}

export default Debugger;