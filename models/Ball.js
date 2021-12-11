
 import * as THREE from 'three'

 export class Ball extends THREE.Mesh {
    

    constructor(geometry,material)
    {
        super(geometry,material);
        this.radius = geometry.parameters.radius;
        this.ballNr = 0;
        this.mass = 1;

    }

    Move(scene,  table){
        let velX = parseInt(Math.random(-500, 0) * 10)
        let velY = parseInt(Math.random(-500, 0) * 10)
    
//     if(velX <= 0) {
//         this.position.x += velX
//     }
    
//    if(velY > 0) {
//     this.position.y += velY
//    }
//    else if(velY <= 0){
//     this.position.y -= velY
//    }
     }
     /**
      * 
      * @param {*} scene 
      * @param {Table} table 
      * @param  {...Ball} ball 
      */
     MotionDesign(scene, table, ...ball){
       // console.log(table.position.x)

        //  if(ball[0].position.x > table.position.x +15 || ball[0].position.x < table.position.x -15 || 
        //     ball[0].position.y > table.position.x +145 || ball[0].position.y < table.position.x -145 ){
        //      console.log('ball outside')
        //  }
        //  else{
        //      console.log("inside")
        //  }
       
   
     }
     
 }
