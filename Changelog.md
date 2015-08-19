# Changelog

## 15.07.10

### Redistritibuted loading of game to multiple classes

Splitting the start up of the game into multiple classes that each do one thing, make it clear what each part does and make it easier to bugfix later on. Dividing your project up into classes that do one thing (or a few things) is one of the aspects of OOP (Object Oriented Programming).

I divided the loading of the game into 4 classes:

- __App__ Creates the object that holds the game.

- __Main__ Loads in classes that are required for handling the startup and the levels: ```Boot```, ```Preloader```, ```MainMenu```, and ```Level```. Then it starts the ```Boot``` class.

- __Boot__ Global settings are defined here (eg. when losing focus of the tab, should the game keep running?), as well as platform specific settings (ie. for mobile, desktop, etc.). This game is made for desktop only, so the platform specific options are there only for good practice and habit forming.

- __Preloader__ Loads in all necessary assets and shows a progress bar linked to the loading process.

## 15.07.12

### Optimizing performance with an object pool

Usually when a ball is fired, I instantiate a new instance of the ```Ball``` object. However, this is bad for performance as there is a lot of overhead done by the computer when creating a new instance. Doing this on the fly can lead to unpredictable spikes in resource usage and ultimately to lag and lower framerates. To fix this problem __object pooling__ was invented.

#### Object pooling explained

Object pooling means that you instantiate a number of objects (the pool) at the beginning and get the resource usage for instantiating out of the way at the start. This ensures that you don't get unplanned resource usage while the game is running.

The objects stay in the pool and are then activated when needed. Once they are done they are deactivated and sent back to the pool to be used again later.

One drawback is that you have to keep track of all properties of the object and reset them manually when returning them to the pool or else you might get unforeseen bugs. Another is that if you don't have enough objects in the pool you can get unpredicted behaviour when requesting something from the pool while it's currently empty.

More info about object pooling can be found [here][3].

#### Object pooling in this game

In this game the balls that are shot are pooled as it prevents constant instantiating when firing the ball. The ```BallManager``` class handles the pooling for the balls.

First, the pool is created.

```typescript
private _createPool(size:number, game:Phaser.Game, x:number, y:number, key:string,
defender:Defender, overlapArray:Array<Phaser.Sprite>):Array<Ball> {
	var array:Array<Ball> = [];
	this._poolCounter = size;

	var i:number = size;
	while (--i > -1)
	array.push(new Ball(game, x, y, key, this, defender, overlapArray));
	return array;
}
```

Then, when an object is needed, the public function ```fireBall``` is used by the ```Attacker``` class. This gives the latest ball from the pool and increments ```_poolCounter```, which keeps track of which ball from the pool give out next.

```typescript
fireBall(x:number, y:number, rotation:number):void {
	this._getBall().fire(x, y, rotation);
}

private _getBall():Ball {
	if (this._poolCounter > 0)
		return this._pool[--this._poolCounter];
	else
		throw new Error ("Pool is exhausted.");
}
```

Once a ball has completed its purpose it's deactivated and reset and ```_poolCounter``` is decremented to allow the returned ball to be used again.

```typescript
backToPool(ball:Ball):void {
	this._returnBall(ball);
}

private _returnBall(ball:Ball):void {
	this._pool[this._poolCounter++] = ball;
}
```

## 15.07.20

### Finetuned ball collision
- Made sure balls collide off of certain game objects, such as the defending player, and get 'destroyed' (sent back to object pool) by other objects, such as the attacking player.
- __LEARNED:__ To best iterate throught the array of collidable object I looked into ```for``` loops and ```for...in``` loops and which is better performance wise. As stated in [Mozilla's JS documentation][1] and in [this StackOverflow answer][2] using ```for``` loops is recommended for Arrays. Among the reasons for not using ```for...in``` is that the results are not ordered, which might mess with functionality.

### Resetting objects when using an object pool
To decrease resource usage I opted to use an object pool instead of constantly creating new instances of the Ball class. But this comes at a cost: when re-using an object you have to make sure that all necessary properties are reset.

What gave me some trouble was the ball velocity. When sending the ball back to the pool I reset it using

```typescript
this.body.velocity = 0;
```

But when that same ball had to be launched again, the game froze. Turns out that I needed to correctly reset the velocity like so

```typescript
this.body.velocity = new Phaser.Point();
```

because ```velocity``` is a ```Phaser.Point``` object.

- __LEARNED:__ While object pooling can definitely impact performance in a positive way, it does come at the cost of more planning ahead and the risk of unforeseen errors down the road.

## 15.07.21

### Removed automatic physics collision
- It had some weird bug that would move the ball sideways a little after a collision
- When the ball was being reflected I wanted to add spin to the ball comparable to the direction and speed the defender was traveling at. This would a slight unpredictability to the reflected balls and increase the difficulty for the attacker. The standard ```Arcade.Physics.collide()``` made it hard to work the added spin into the collision model.
- I fixed it by doing the collision by hand, though I still use the Arcade Physics to check for overlap. If there is an overlap, the ball direction is mirrored (on the axis perpendicular to the defender) and that new direction is used to set a new velocity

```typescript
// Mirror the rotation perpendicular to the defender.
// Also add topspin in the defender's direction of movement.
this._rotation = -this._rotation - Phaser.Math.degToRad(this._defender.body.velocity.x / 50);
// Reset the old and apply the new velocity
this.body.velocity = new Phaser.Point();
this.body.velocity.copyFrom(this._arcadePhysics.velocityFromRotation(
this._rotation, this._speed));
// Set _reflected to true so that there will be no more collision checks with the defender.
this._reflected = true;
```


### Common error of mine when adding classes in TypeScript
Forgetting to add a reference to the new class in classes that use it. Like ```import``` in AS3, this needs to be added at the start of the class:

```typescript
/// <reference path="BallManager.ts" />
```

The same needs to be done for the html file which will load all the JS scripts. It also needs to be told to load in the newly created class by adding this in the ```<head>``` of the html file:

```html
<script src="js/BallManager.js"></script>
```

## 15.07.24

### Score

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
[2]: http://stackoverflow.com/a/243778
[3]: http://gameprogrammingpatterns.com/object-pool.html