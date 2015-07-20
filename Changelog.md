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

__LEARNED:__ While object pooling can definitely impact performance in a positive way, it does come at the cost of more planning ahead and the risk of unforeseen errors down the road.

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
[2]: http://stackoverflow.com/a/243778