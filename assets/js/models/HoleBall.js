
import * as THREE from 'three'
import {HoleBall} from './HoleBall'
export class HoleBall extends THREE.Mesh
{
    constructor(geometry,material)
    {
        super(geometry,material);
        this.radius = geometry.parameters.radius;
       // this.OnBallInHole = new Event('onballinhole');

    }
}