# Architecture & state

The idea is to have an object representing the current state of the game with an object containing all the relevant data. This object is not globally accessible (since we do have a couple of async features), but is passed from the code which take cares of rendering the DOM (`./renderer.js`) to parts which handle the domain logic.

I enforced immutability of the state in this project (local mutation is fine) which firstly prevents a whole category of bugs, but also would make it easier to do performance optimizations, where I would rerender only the relevant cards.

Splitting up rendering and game logic makes for a nice separation of concerns, making it much easier to add new features.
