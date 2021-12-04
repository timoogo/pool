
 import * as THREE from 'three'

 export class Ball extends THREE.Mesh {
    

    constructor(geometry,material)
    {
        super(geometry,material);
        this.radius = geometry.parameters.radius;
        this.ballNr = 0;
        this.mass = 1;

    }

    Move(scene){
  
    }
 }
