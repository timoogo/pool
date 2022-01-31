
        import * as THREE from 'three'

        export class Ball extends THREE.Mesh {
            

            constructor(geometry,material, ballid)
            {
                super(geometry,material);
                this.radius = geometry.parameters.radius;
                this.ballNr = 0;
                this.mass = 1;
                this.ballid = null;
            }

            Move(scene,  table){
                let velX = parseInt(Math.random(-500, 0) * 10)
                let velY = parseInt(Math.random(-500, 0) * 10)
            
            }
            /**
            * 
            * @param {*} scene 
            * @param {Table} table 
            * @param  {...Ball} ball 
            */
            MotionDesign(scene, table, ...ball){

        
            }
            
        }
