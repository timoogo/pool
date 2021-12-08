 import * as THREE from 'three'

 export class Table extends THREE.Mesh {
    constructor(geometry,material)
    {
        super(geometry,material);
        this.ballNr = 0;
        this.mass = 10;

    }


 }