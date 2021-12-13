# Pool project

## Context

The Interactive Augmented Pool Table project is an educational platform for learning through play, among others, mathematics and physics. The augmented pool table is a real pool table on which a software layer is added.

This augmented pool project will be able to bring several things to the society. Essentially, it is about learning while entertaining and deeply anchor the learning process at the user side. It permits the learning of physics and mathematics for students and pool practice for beginner players.
For the lab, this can bring a new area, not much exploited in current projects: accessibility. Indeed, even if it is not the first goal of this project, one of the objectives is to make the pool platform more accessible, in particular for people in wheelchairs or of small size.  The screen can give another point of view for users who do not have the possibility to interact normally with a pool table. It provides them various pieces of information that will help them to play (angles of where users are aiming, for example). This guarantees us to allow accessibility to as many people as possible.

The software layer currently allows to display in real time, an outline of the position of balls and the beginning of their trajectory. Moreover, it is possible to display the speed of the balls on the table. To display this information, a camera films the billiard table live from above and projects interactive patterns via a video projector.

## Mission

My mission is to guarantee the accessibility and the use of the billiard table by any person.
Thus, it is about making a screen that displays in real time what is happening on the billiard table to ensure that users in wheelchairs or small sizes can see perfectly what is happening on the billiard table.

From a technical point of view, I will develop the interface between an existing API and the screen on which the camera feedback will be displayed. The purpose of this API is to fetch the positions of the balls several times per second. Thanks to the Websocket technology, I will get this information to transmit it back to the interface. I will thus reproduce the current state of the billiard table on the screen, i.e. the position of the balls present. In parallel, it is interesting to be able to see the last shot, so I intend to implement a replay system and to be able to see from another point of view this last shot.

Also, I will have to include animation videos at the right moments: for example, when the program detects that a ball has gone into a hole, I will have to broadcast an animation video of this action, this video will be produced by another UROP colleague. The pool table and the 3D model will be integrated in WebGL. To do this, I must learn to use the Socket.IO and WebGL libraries.

## Result

The output of my contribution will include commented source code and published on the Github of the DVIC interactive pool project. I will also provide, elements that can help to the global understanding of the project

### Installation

#### Clone the repo

```bash
git clone https://github.com/timoogo/pool.git
```

```bash
cd pool
```

#### Install the required depedencies

```bash
npm install
```

#### Open the server

```bash
npm run dev
```
