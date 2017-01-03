function HamburgerHill(width, height) {
    this.game = {};
    this.conveyorSprite = {};
    this.cowSprite = {};
    this.bladeSprites = [{}];
    this.width = width;
    this.height = height;
    
    this.conveyorWidth = 605;
    this.conveyorHeight = 60;
    this.frameRate = 30;
    this.cowMoveSpeed = 1;
}
HamburgerHill.prototype.init = function() {
	
	
	
    /*this.game = new Phaser.Game(this.width, this.height, Phaser.CANVAS, 'gameCanvas', { 
        preload: this.preload, 
        create: this.createSprites, 
        update: this.update, 
        render: this.render
    }, true); */ 
};

HamburgerHill.prototype.preload = function() {
	this.load.pack("game", "assets/assets-pack.json");
//    this.game.load.atlasJSONHash('conveyor', '../img/spritesheet-conveyor.png', '../img/spritesheet-conveyor.json');
//    this.game.load.atlasJSONHash('cow', '../img/spritesheet-cow.png', '../img/spritesheet-cow.json');
//    this.game.load.atlasJSONHash('cow', '../img/spritesheet-cow-dying.png', '../img/spritesheet-cow-dying.json');
	
};

HamburgerHill.prototype.createSprites = function() {
    this.conveyorSprite = this.add.sprite(10, 10, "spritesheet-conveyor");
    this.cowSprite = this.add.sprite(10, 10, "spritesheet-cow");
};

HamburgerHill.prototype.update = function() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.bladeSprites[0].x -= 4;
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.bladeSprites[0].x += 4;
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.bladeSprites[0].y -= 4;
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        this.bladeSprites[0].y += 4;
    }
};

HamburgerHill.prototype.render = function() {
    this.game.debug.spriteInfo(this.conveyorSprite, 20, 32);
};

HamburgerHill.prototype.animationCowStart = function(sprite, animation) {
    // 'this' is set to the HamburgerHill object via the onStart.add function
    animation.game.add.text(32, 32, 'Animation started', { fill: 'black' });
};
HamburgerHill.prototype.animationCowLoop = function(sprite, animation) {
    // 'this' is set to the HamburgerHill object via the onLoop.add function
    sprite.x -= this.cowMoveSpeed;
//    if(sprite.x < this.conveyorSprite.left) {
//        sprite.x = this.conveyorSprite.right;
//    }
    if (animation.loopCount === 1)
    {
        animation.loopText = animation.game.add.text(32, 64, 'Animation looped', { fill: 'black' });
    }
    else
    {
        animation.loopText.text = 'Animation looped x' + animation.loopCount;
    //    animation.loop = false;
    }
};
HamburgerHill.prototype.animationCowStop = function(sprite, animation) {
    // 'this' is set to the HamburgerHill object via the onComplete.add function
    animation.game.add.text(32, 64+32, 'Animation stopped', { fill: 'black' });
};

HamburgerHill.createConveyor = function(hamburgerHillInstance) {
    var sprite = hamburgerHillInstance.game.add.sprite(hamburgerHillInstance.game.world.centerX, hamburgerHillInstance.game.world.height, 'conveyor');
    sprite.anchor.setTo(0.5, 1);
    sprite.scale.setTo(1, 1);
    sprite.animations.add('forward');
    sprite.animations.play('forward', 15, true);
    return sprite;
};

HamburgerHill.createCow = function(hamburgerHillInstance) {
    var sprite = hamburgerHillInstance.game.add.sprite( (hamburgerHillInstance.game.world.centerX + (hamburgerHillInstance.conveyorWidth / 2)) - 100, (hamburgerHillInstance.game.world.height - hamburgerHillInstance.conveyorHeight) + 8, 'cow');
    sprite.anchor.setTo(0.5, 1);
    sprite.scale.setTo(1, 1);
    var animation = sprite.animations.add('forward');
    
    //animation.onStart.add(hamburgerHillInstance.animationCowStart, hamburgerHillInstance);
    animation.onLoop.add(hamburgerHillInstance.animationCowLoop, hamburgerHillInstance);
    //animation.onComplete.add(hamburgerHillInstance.animationCowStop, hamburgerHillInstance);
    
    animation.play(30, true);
    
    return sprite;
};
