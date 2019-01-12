
# Platy.js

#### A simple animation library for the termial.

Could be used for make some fun notification animations in your build scripts ;)

## Basic Usage

```
const Platy = require('platy');

// Create a new instance of the stage that will render and display animations
const stage = new Platy.Stage('main');

// Create a character
const cat   = new Platy.Character('cat');

// Crummy fat lazy cat animation
const lazyCat = new Platy.Animation('idleCat', [ // An array of frames
`
  .^====^.
 =( o__o )=
  /      \\
+( |    | )//
`,
`
  .^====^.
 =( ^--^ )=
  /      \\
+( |    | )//
`
]);


// Crummy fat sleepy cat animation
const sleepyCat = new Platy.Animation('sleepyCat', [
  `
  .^====^.
 =( - o- )=
  /      \\
+( |    | )//
`,
`
  .^====^.
 =( - .- )=
  /      \\
+( |    | )//
`
]);


// Next create some actions for our Cat, including an animation and text to speak.
cat.on('smile', lazyCat, 'Hello,\nWorld!');
cat.on('sleep', sleepyCat, 'zzz...');

// Play our cat's smile
stage.play( cat.action('smile') );

// Change animation after 5 seconds
setTimeout(function(){

    // Nothing is happening so I'm going to take a nap...
    stage.play( cat.action('sleep') );

}, 5000);
```


## Overview

Platy.js exports an collection of component classes:

| Class           | Description |
| --------------- | ----------- |
| Platy.Stage     | Will handle a character's action and display it on an interface. Including looping through each frame of the animation and rendering it with text if provided. |
| Platy.Character | Holds a collection of actions for a character which can be referenced by verbal hooks. |
| Platy.Animation | Holds a sequence of frames for an animation where each frame is a string of ascii characters to print to the interface when rendered. |

## Platy.Stage methods:

### `Stage.constructor(name[, readline])`

Returns an instance of the stage. Pass the stage `name` and optionally the `readline` interface to write character actions to (defaults to `readline.createInterface()`).

### `Stage.clear()`

The method clears the interface of the last frame printed to the interface. **Note**: this will reset the stage's width and height to 0.

### `Stage.render(action)`

Renders a character action to the interface. The method will get the animation's current frame and compile it with optional text before printing it to the terminal.

### `Stage.play(name[, duration])`

Loops through each frame of an action's animation on intervals based on `Stage.fps` and passes the action to `Stage.render` after the next frame is selected. This method will return a promise that resolves with '*stop*' when the animation stops, and '*pause*' when the animation is paused. If the optional `duration` parameter is passed (in seconds), the `Stage.stop()` method will be called after the time limit.

### `Stage.pause()`

Stops the current animation loop without clearing the stage and resolves the Promise object returned by `Stage.play` with '*pause*'

### `Stage.stop()`

Stops the current animation loop, clears the stage and resets the current action's animation to the first frame.

## Platy.Stage properties

| Property       | Default | Description |
| -------------- | ------- | ----------- |
| `Stage.fps`      | 1     | The number of loops per second |
| `Stage.spacer`   | ' ~ ' | The divider between the animation frame and text. |
| `Stage.width`    | 0     | The width of the stage as the maximum compiled string length. Automatically calculated when `Stage.render()` is called. |
| `Stage.height`   | 0     | The height of the stage as the max number of lines. Also calculated on `Stage.render()` |
| `Stage.readline` | readline.Interface | The interface to write the compiled actions to. |

## Platy.Character methods

### `Platy.constructor(name)`

Pass a name for the new character to have.

### `Platy.on(name, animation[, say])`

Creates an Action that can be passed to the Stage. Pass a `name` to reference the action with and `Platy.Animation` object to render when the action is called. Optionally pass a string as the `say` parameter to display as a message alongside the animation.

### `Platy.action(name)`

Returns an action that can then be passed to `Stage.play(action)`.

## Platy.Animation methods

### `Platy.constructor(name[, frames])`

Pass a reference `name` and optionally an array of strings which will be converted into `frames`

### `Platy.addFrame(frame[, location][, length])`

Pass a string as a single `frame` to add to the animation. Optionally add the `location` to insert the frame into the animation's timeline and the `length` of the frame. **Note**: Existing frames can be overriden if they are located at the same point where the new frame is being inserted. By default, the new frame is inserted at the end of the animation's timeline and will take up a single slot.

### `Platy.current()`

Returns the current frame

### `Platy.next()`

Moves the current frame pointer to the next frame or resets to the first frame when the end of the timeline is reached.

### `Platy.prev()`

Moves the current frame pointer to the previous frame or moves to the last frame when the start of the timeline is reached.

### `Platy.reset()`

Sets the current frame to the beginning of the animation's timeline.

### `Platy.end()`

Sets the current frame to the end of the animation's timeline.

## Platy.Animation properties

| Property        | Default | Description |
| --------------- | ------- | ----------- |
| `Stage.frames`  | []      | Direct access to the sequence of frames to loop through |
| `Stage.pointer` | 0       | The current frame indicator (first frame starts at 0)