# Changelog


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

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
[2]: http://stackoverflow.com/a/243778

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
