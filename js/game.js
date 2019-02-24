// Create our only scene called mainScene, in the game.js file
class mainScene {
    // The 3 methods currenlty empty

    preload() {
        this.yellowColor = 'FFD84C';

        // Parameters: name of the sprite, path of the image
        this.load.image('player', 'assets/coin.png');
        this.load.image('yellowKey', 'assets/key.png');
        this.load.image('door', 'assets/door.png');
        this.load.image('topCastle', 'assets/topCastle.png');
        this.load.image('bottomCastle', 'assets/bottomCastle.png');
        this.load.image('leftCastle', 'assets/leftCastle.png');
        this.load.image('rightCastle', 'assets/rightCastle.png');
        this.load.image('topPartCastle', 'assets/topPartCastle.png');
        this.load.image('bottomPartCastle', 'assets/bottomPartCastle.png');
        this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');


        // This method is called once at the beginning
        // It will load all the assets, like sprites and sounds  
    }
    create() {
        // Parameters: x position, y position, name of the sprite
        if (window.screen.availWidth < 1024 || window.screen.availHeight < 768) {
            window.location.href = "default/index.html";
            console.log('test');
        }
        let x = window.outerWidth / 2;
        let y = window.outerHeight / 2;
        let absoluteX = window.outerWidth;
        let absoluteY = window.outerHeight;
        this.player = this.physics.add.sprite(x, y + 50, 'player');
        this.yellowKey = this.physics.add.sprite(x - 350, 300, 'yellowKey');
        this.leftCastle = this.physics.add.sprite(x - 515, y - 110, 'leftCastle');
        this.leftCastle.name = 'left';
        this.rightCastle = this.physics.add.sprite(x + 515, y - 110, 'rightCastle');
        this.rightCastle.name = 'right';
        this.topCastle = this.physics.add.sprite(x, y - 410, 'topCastle');
        this.topCastle.name = 'top';
        this.bottomCastle = this.physics.add.sprite(x, y + 210, 'bottomCastle');
        this.bottomCastle.name = 'left';
        this.topPartCastle = this.physics.add.sprite(x, y - 300, 'topPartCastle');
        this.bottomPartCastle = this.physics.add.sprite(x, y - 100, 'bottomPartCastle');
        this.door = this.physics.add.sprite(x, y - 40, 'door');
        this.objectSelected = false;

        let keylogger = [];


        this.arrow = this.input.keyboard.createCursorKeys();
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
        this.selectSpaceBar = this.input.keyboard.addKeys('SPACE');
        let combo = this.input.keyboard.createCombo([38, 38, 40, 40, 37, 39, 37, 39, 66, 65], { resetOnMatch: true });
        let particles = this.add.particles('flares');

        this.input.keyboard.on('keycombomatch', function(event) {

            let emitter = particles.createEmitter({
                frame: ['red', 'green'],
                x: 400,
                y: 400,
                lifespan: 4000,
                angle: { min: 225, max: 315 },
                speed: { min: 300, max: 500 },
                scale: { start: 0.6, end: 0 },
                gravityY: 300,
                bounce: 0.9,
                bounds: { x: 250, y: 0, w: 350, h: 0 },
                collideTop: false,
                collideBottom: false,
                blendMode: 'ADD'
            });
        });



        // This method is called once, just after preload()
        // It will initialize our scene, like the positions of the sprites
    }
    update() {
        // If the player is overlapping with the key
        if (this.physics.overlap(this.player, this.yellowKey)) {
            // Call the new hit() method
            this.hit();
        }
        if (this.physics.overlap(this.player, this.leftCastle)) {
            this.hitCastle(this.leftCastle);
        }
        if (this.physics.overlap(this.player, this.rightCastle)) {
            this.hitCastle(this.rightCastle);
        }
        if (this.physics.overlap(this.player, this.topCastle)) {
            this.hitCastle(this.topCastle);
        }
        if (this.physics.overlap(this.player, this.bottomCastle)) {
            this.hitCastle(this.bottomCastle);
        }
        if (this.physics.overlap(this.player, this.topPartCastle)) {
            this.hitCastle(this.topPartCastle);
        }
        if (this.physics.overlap(this.player, this.bottomPartCastle)) {
            this.hitCastle(this.bottomPartCastle);
        }
        if (this.physics.overlap(this.player, this.door)) {
            this.hitDoor();
        }

        // Handle horizontal movements
        if (this.arrow.right.isDown || this.cursors.right.isDown) {
            // If the right arrow is pressed, move to the right
            this.player.x += 5;
            if (this.objectSelected)
                this.yellowKey.x += 5;
        } else if (this.arrow.left.isDown || this.cursors.left.isDown) {
            // If the left arrow is pressed, move to the left
            this.player.x -= 5;
            if (this.objectSelected)
                this.yellowKey.x -= 5;
        }
        // Do the same for vertical movements
        if (this.arrow.down.isDown || this.cursors.down.isDown) {
            this.player.y += 5;
            if (this.objectSelected)
                this.yellowKey.y += 5;
        } else if (this.arrow.up.isDown || this.cursors.up.isDown) {
            this.player.y -= 5;
            if (this.objectSelected)
                this.yellowKey.y -= 5;
        }
        if (this.selectSpaceBar.SPACE.isDown) {
            this.objectSelected = false;

        }

        // This method is called 60 times per second after create() 
        // It will handle all the game's logic, like movements
    }
    hit() {
        this.objectSelected = true;
        if (this.player.x <= this.yellowKey.x) {
            this.yellowKey.x = this.yellowKey.x + 5;
        } else {
            this.yellowKey.x = this.yellowKey.x - 5;
        }
        if (this.player.y <= this.yellowKey.y) {
            this.yellowKey.y = this.yellowKey.y + 5;
        } else {
            this.yellowKey.y = this.yellowKey.y - 5;
        }
        // Create a new tween

        this.tweens.add({
            targets: this.player, // on the player 
            duration: 200, // for 200ms 
            scaleX: 1.2, // that scale vertically by 20% 
            scaleY: 1.2, // and scale horizontally by 20% 
            yoyo: true, // at the end, go back to original scale 
        });
    }

    hitCastle(objectHitted) {
        if (this.arrow.right.isDown) {
            this.player.x -= 20;
            if (this.objectSelected)
                this.yellowKey.x -= 20;
        }
        if (this.arrow.left.isDown) {
            this.player.x += 20;
            if (this.objectSelected)
                this.yellowKey.x += 20;
        }
        if (this.arrow.up.isDown) {
            this.player.y += 20;
            if (this.objectSelected)
                this.yellowKey.y += 20;
        }
        if (this.arrow.down.isDown) {
            this.player.y -= 20;
            if (this.objectSelected)
                this.yellowKey.y -= 20;
        }
    }
    hitDoor() {
        if (this.objectSelected) {
            window.location.href = "default/index.html";
        }
    }
}


new Phaser.Game({
    width: window.outerWidth, // Width of the game in pixels
    height: window.outerHeight - 180, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'game', // Create the game inside the <div id="game"> 
});