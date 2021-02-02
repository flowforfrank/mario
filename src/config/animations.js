// To make things cleaner, you can also replace this with a json file
// Or introduce helper functions for generating the repeating patterns
export default scene => {
    // Mario
    scene.anims.create({
        key: 'run',
        frames: scene.anims.generateFrameNames('atlas', {
            prefix: 'mario-atlas_',
            start: 1,
            end: 3,
        }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'idle',
        frames: [{ key: 'atlas', frame: 'mario-atlas_0' }],
        frameRate: 10
    });

    scene.anims.create({
        key: 'jump',
        frames: [{ key: 'atlas', frame: 'mario-atlas_4' }],
        frameRate: 10
    });

    scene.anims.create({
        key: 'die',
        frames: [{ key: 'atlas', frame: 'mario-atlas_5' }],
        frameRate: 10
    });

    // Goomba
    scene.anims.create({
        key: 'goombaRun',
        frames: scene.anims.generateFrameNames('atlas', {
            prefix: 'mario-atlas_',
            start: 11,
            end: 12,
        }),
        frameRate: 15,
        repeat: -1
    });

    scene.anims.create({
        key: 'goombaDie',
        frames: [{ key: 'atlas', frame: 'mario-atlas_10' }],
        frameRate: 10,
        hideOnComplete: true
    });

    // Coin
    scene.anims.create({
        key: 'rotate',
        frames: scene.anims.generateFrameNames('atlas', {
            prefix: 'mario-atlas_',
            start: 6,
            end: 9,
        }),
        frameRate: 10,
        repeat: -1
    });
};