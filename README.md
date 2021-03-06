## Objective

To learn about Javascript array methods via beginner desktop game projects. Please note these games are only playable on desktop.

## Attributions

The source code from the following tutorials helped me build specific projects in this directory with variations of my own code and UI.

- Snake: https://www.youtube.com/watch?v=7Azlj0f9vas&ab_channel=CodingWithAdam
- Bejeweled: https://www.youtube.com/watch?v=XD5sZWxwJUk&t=412s&ab_channel=CodewithAniaKub%C3%B3w
- Bejeweled Countdown: https://www.youtube.com/watch?v=vSV_Ml2_A88&ab_channel=CodewithAniaKub%C3%B3w
- Tetris: https://www.youtube.com/watch?v=H2aW5V46khA&ab_channel=MethMethMethod
- Arcade retro game over (Snake): https://mixkit.co/free-sound-effects/game-over/ (under "Mixkit - Free License")
- Musical game over (Bejeweled): https://mixkit.co/free-sound-effects/game-over/ (under "Mixkit - Free License")
- Melodic gold price (Bejeweled): https://mixkit.co/free-sound-effects/game-over/ (under "Mixkit - Free License")
- Game treasure coin (Bejeweled): https://mixkit.co/free-sound-effects/game-over/ (under "Mixkit - Free License")
- Failure arcade alert notification (Tetris): https://mixkit.co/free-sound-effects/game-over/ (under "Mixkit - Free License")
- Achievement bell (Tetris): https://mixkit.co/free-sound-effects/game-over/ (under "Mixkit - Free License")

## Lessons Learned
- Order of functions matter in JS file
- Canvas is preferable for static and auto movement, while Div works better with event handlers (i.e. dragstart)
- DOMContentLoaded is used to run event once HTML doc is loaded, but without waiting for stylesheets or images (https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event)
- You can invoke a function once (i.e. to avoid tampering with a countdown) by using 'once' method in the event listener
- Canvas scaling method, although convenient, often interferes with re-rendering of frames
- requestAnimationFrame provides better quality animations (less flickers and shears), whereas setInterval and setTimeout methods offer better control of speed
- unshift array method adds items at the beginning of the array and returns the array's new length
- debugger stops execution of JavaScript function and called function being debugged

# Progress

This project is completed.