
class Player{
    constructor(){
        this.position ={
            x : 100,
            y : 100
        }
        this.velocity={
            x : 0,
            y : 0
        }
        this.width = 40
        this.height = 40
        this.speed = 1.5

        //this.image = createImage('img/knight_female_1_1.png')
        this.frames = 4
        this.count = 0
        this.isAttack = false
        this.isWalking = false

        this.attack_wait = 0

        this.hp = 100
        this.attack = 20
        this.defense = 10

        this.power = 5
        this.agility = 5

        this.sprites = {
            stand : {
              right : createImage('img/knight_female_right.png'),
              left : createImage('img/knight_female_left.png'),
              up : createImage('img/knight_female_back.png'),
              down : createImage('img/knight_female_front.png'),
              cropWidth : 42,
              width : this.width
            },
            run : {
              right : createImage('img/knight_female_right.png'),
              left : createImage('img/knight_female_left.png'),
              up : createImage('img/knight_female_back.png'),
              down : createImage('img/knight_female_front.png'),
              cropWidth : 42,
              width : this.width
            }
        }

        this.currentSprite = this.sprites.stand.down
        this.currentCropWidth = 42
    }

    draw(){
        // context.fillStyle = 'red'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)

        context.drawImage(          
            this.currentSprite, 
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth, //largura
            42, //altura
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        )
    }

    update(){
        //sprite switching
        if(!player.isAttack){
            if(player.isWalking){
                if(keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right){
                    player.currentSprite = player.sprites.run.right
                    player.frames = 1                
                    player.cropWidth = player.sprites.run.cropWidth          
                    //player.width = player.sprites.run.width
            
                } else if (keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left){
                    player.currentSprite = player.sprites.run.left 
                    player.frames = 1
                    player.cropWidth = player.sprites.run.cropWidth          
                    //player.width = player.sprites.run.width
                
                } else if (keys.down.pressed && lastKey === 'down' && player.currentSprite !== player.sprites.run.down){
                    player.currentSprite = player.sprites.run.down 
                    player.frames = 1
                    player.cropWidth = player.sprites.run.cropWidth          
                    //player.width = player.sprites.run.width
                
                } else if (keys.up.pressed && lastKey === 'up' && player.currentSprite !== player.sprites.run.up){
                    player.currentSprite = player.sprites.run.up 
                    player.frames = 1
                    player.cropWidth = player.sprites.run.cropWidth          
                    //player.width = player.sprites.run.width
                }
            } else{
                if(!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right){
                    player.currentSprite = player.sprites.stand.right
                    player.frames = 4               
                    player.cropWidth = player.sprites.stand.cropWidth          
                    //player.width = player.sprites.stand.width
    
                } else if (!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left){
                    player.currentSprite = player.sprites.stand.left 
                    player.frames = 4
                    player.cropWidth = player.sprites.stand.cropWidth          
                    //player.width = player.sprites.stand.width
    
                } else if (!keys.down.pressed && lastKey === 'down' && player.currentSprite !== player.sprites.stand.down){
                    player.currentSprite = player.sprites.stand.down 
                    player.frames = 4
                    player.cropWidth = player.sprites.stand.cropWidth          
                    //player.width = player.sprites.stand.width
    
                } else if (!keys.up.pressed && lastKey === 'up' && player.currentSprite !== player.sprites.stand.up){
                    player.currentSprite = player.sprites.stand.up 
                    player.frames = 4
                    player.cropWidth = player.sprites.stand.cropWidth          
                    //player.width = player.sprites.stand.width
                }
            }  
        }

        this.count++
        if (this.count==10 || this.count==20 || this.count==30 || this.count==40 || this.count>60){
          this.frames++
        }

        if(player.isAttack && this.frames > 7){            
            this.frames = 6
            this.count = 0
            player.isAttack = false

        }else if (this.frames > 5 && !player.isAttack &&
          (this.currentSprite === this.sprites.stand.right || 
            this.currentSprite === this.sprites.stand.left || 
            this.currentSprite === this.sprites.stand.down || 
            this.currentSprite === this.sprites.stand.up)){

            this.frames = 4
            this.count = 0

        }else if (this.frames > 3 && !player.isAttack &&
          (this.currentSprite === this.sprites.run.right || 
            this.currentSprite === this.sprites.run.left || 
            this.currentSprite === this.sprites.run.down || 
            this.currentSprite === this.sprites.run.up)){

            this.frames = 0
            this.count = 0
        }

        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}