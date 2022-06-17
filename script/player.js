
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
        this.width = 42
        this.height = 42

        //this.image = createImage('img/knight_female_1_1.png')
        this.frames = 4
        this.count = 0
        this.isAttack = false
        this.isWalking = false

        this.power = 14
        this.agility = 6
        this.dexterity = 12
        this.vitality = 12

        this.max_hp = hp_value(this.vitality, this.power)
        this.max_sp = sp_value()

        this.hp = this.max_hp
        this.sp = this.max_sp
        
        this.attack = attack_value(this.power, this.dexterity)
        this.defense = defense_value(this.vitality, this.dexterity)
        this.flee = flee_value(this.agility, this.dexterity)
        
        this.speed = speed_value(this.agility)       
        this.attack_speed = attack_speed_value(this.agility)        

        this.attack_wait = 0
        this.power_attack_wait = 0

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
        // context.fillStyle = 'blue'
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

        // var display = new Display({x : this.position.x + this.width/2, y : this.position.y + this.height+8, color : 'red', text : this.hp, type : 'hp'})
        // displays.push(display)

        //HP bar
        context.fillStyle = 'black'
        context.fillRect(this.position.x, this.position.y + this.height+1, 40, 4)
        var hp_percent = Math.round(this.hp * 100) / this.max_hp
        var bar_value = (40 * hp_percent) / 100
        if(hp_percent<=25){
            context.fillStyle = 'red'
        }else{
            context.fillStyle = 'green'
        }
        context.fillRect(this.position.x, this.position.y + this.height+1, bar_value, 3)

        //SP bar
        context.fillStyle = 'black'
        context.fillRect(this.position.x, this.position.y + this.height+4, 40, 4)
        var sp_percent = Math.round(this.sp * 100) / this.max_sp
        var bar_value = (40 * sp_percent) / 100
        context.fillStyle = 'blue'        
        context.fillRect(this.position.x, this.position.y + this.height+4, bar_value, 3)
        
    }

    update(){
        //sprite switching
        if(!this.isAttack){
            if(this.isWalking){
                if(keys.right.pressed && lastKey === 'right' && this.currentSprite !== this.sprites.run.right){
                    this.currentSprite = this.sprites.run.right
                    this.frames = 1                
                    this.cropWidth = this.sprites.run.cropWidth          
                    //this.width = this.sprites.run.width
            
                } else if (keys.left.pressed && lastKey === 'left' && this.currentSprite !== this.sprites.run.left){
                    this.currentSprite = this.sprites.run.left 
                    this.frames = 1
                    this.cropWidth = this.sprites.run.cropWidth          
                    //this.width = this.sprites.run.width
                
                } else if (keys.down.pressed && lastKey === 'down' && this.currentSprite !== this.sprites.run.down){
                    this.currentSprite = this.sprites.run.down 
                    this.frames = 1
                    this.cropWidth = this.sprites.run.cropWidth          
                    //this.width = this.sprites.run.width
                
                } else if (keys.up.pressed && lastKey === 'up' && this.currentSprite !== this.sprites.run.up){
                    this.currentSprite = this.sprites.run.up 
                    this.frames = 1
                    this.cropWidth = this.sprites.run.cropWidth          
                    //this.width = this.sprites.run.width
                }
            } else{
                if(!keys.right.pressed && lastKey === 'right' && this.currentSprite !== this.sprites.stand.right){
                    this.currentSprite = this.sprites.stand.right
                    this.frames = 4               
                    this.cropWidth = this.sprites.stand.cropWidth          
                    //this.width = this.sprites.stand.width
    
                } else if (!keys.left.pressed && lastKey === 'left' && this.currentSprite !== this.sprites.stand.left){
                    this.currentSprite = this.sprites.stand.left 
                    this.frames = 4
                    this.cropWidth = this.sprites.stand.cropWidth          
                    //this.width = this.sprites.stand.width
    
                } else if (!keys.down.pressed && lastKey === 'down' && this.currentSprite !== this.sprites.stand.down){
                    this.currentSprite = this.sprites.stand.down 
                    this.frames = 4
                    this.cropWidth = this.sprites.stand.cropWidth          
                    //this.width = this.sprites.stand.width
    
                } else if (!keys.up.pressed && lastKey === 'up' && this.currentSprite !== this.sprites.stand.up){
                    this.currentSprite = this.sprites.stand.up 
                    this.frames = 4
                    this.cropWidth = this.sprites.stand.cropWidth          
                    //this.width = this.sprites.stand.width
                }
            }  
        }

        this.count++
        if (this.count==10 || this.count==20 || this.count==30 || this.count==40 || this.count>60){
          this.frames++
        }

        if(this.isAttack && this.frames > 7){            
            this.frames = 6
            this.count = 0
            this.isAttack = false

        }else if (this.frames > 5 && !this.isAttack &&
          (this.currentSprite === this.sprites.stand.right || 
            this.currentSprite === this.sprites.stand.left || 
            this.currentSprite === this.sprites.stand.down || 
            this.currentSprite === this.sprites.stand.up)){

            this.frames = 4
            this.count = 0

        }else if (this.frames > 3 && !this.isAttack &&
          (this.currentSprite === this.sprites.run.right || 
            this.currentSprite === this.sprites.run.left || 
            this.currentSprite === this.sprites.run.down || 
            this.currentSprite === this.sprites.run.up)){

            this.frames = 0
            this.count = 0
        }

        if(this.hp < this.max_hp){
            this.hp += 0.01
        }

        if(this.sp < this.max_sp){
            this.sp += 0.01
        }

        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}