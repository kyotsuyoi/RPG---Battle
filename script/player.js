class Player{
    constructor(lastTimestamp){
        this.position ={
            x : 400,
            y : 700
        }
        this.velocity={
            x : 0,
            y : 0
        }
        this.width = 42
        this.height = 42

        this.frames = 4
        this.count = 0
        this.lastTimestamp = lastTimestamp

        this.frameTime = 0
        this.walkingFrameTime = 100
        this.runningFrameTime = this.walkingFrameTime/2
        this.standFrameTime = 500
        this.attackFrameTime = 150

        this.isAttack = false
        this.isWalking = false
        this.defending = false
        this.isRunning = false

        this.power = 14
        this.agility = 6
        this.dexterity = 15
        this.vitality = 12

        this.max_hp = hp_value(this.vitality, this.power)
        this.max_sp = sp_value()
        this.max_stamina = 100

        this.hp = this.max_hp
        this.sp = this.max_sp
        this.stamina = this.max_stamina
        
        this.attack = attack_value(this.power, this.dexterity)
        this.defense = defense_value(this.vitality, this.dexterity)
        this.flee = flee_value(this.agility, this.dexterity)
        
        this.speed = speed_value(this.agility)       
        this.attack_speed = attack_speed_value(this.agility)     
        this.hp_recovery = hp_recovery(this.vitality)   

        this.attack_wait = 0
        this.power_attack_wait = 0

        this.side = 'down'

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
            },
            shield : {
              sprite : createImage('img/shield.png'),
              cropWidth : 45,
              width : 45
            }
        }

        this.currentSprite = this.sprites.stand.down
        this.currentCropWidth = 42

        this.currentShieldSprite = this.sprites.shield.sprite
        this.currentShieldCropWidth = 45
    }

    draw(){
        // context.fillStyle = 'blue'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)

        //draw shield first (up only)
        if(this.side == 'up' && this.defending){
            context.drawImage(          
                this.currentShieldSprite, 
                this.currentShieldCropWidth * 3,
                0,
                45, //largura
                45, //altura
                this.position.x + 10, 
                this.position.y + 8,
                this.width,
                this.height
            )
        }

        //draw character
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
        if(this.hp < this.max_hp){
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
        }

        //SP bar
        if(this.sp < this.max_sp){
            context.fillStyle = 'black'
            context.fillRect(this.position.x, this.position.y + this.height+4, 40, 4)
            var sp_percent = Math.round(this.sp * 100) / this.max_sp
            var bar_value = (40 * sp_percent) / 100
            context.fillStyle = 'blue'        
            context.fillRect(this.position.x, this.position.y + this.height+4, bar_value, 3)
        }

        //Stamina bar
        if(this.stamina < this.max_stamina){
            context.fillStyle = 'black'
            context.fillRect(this.position.x, this.position.y + this.height+8, 40, 4)
            var stamina_percent = Math.round(this.stamina * 100) / this.max_stamina
            var bar_value = (40 * stamina_percent) / 100
            if(stamina_percent<=25){
                context.fillStyle = 'orange'
            }else{
                context.fillStyle = 'yellow'
            }       
            context.fillRect(this.position.x, this.position.y + this.height+8, bar_value, 3)
        }

        if(this.defending){
            
            var side_num = 0
            var pos_x = -2
            var pos_y = 10

            switch(this.side){
                case 'down':
                    side_num = 0
                    pos_x = -2
                    pos_y = 10
                break

                case 'left':
                    side_num = 1
                    pos_x = -8
                    pos_y = 10
                break

                case 'right':
                    side_num = 2
                    pos_x = +8
                    pos_y = 10
                break
            }

            //draw shield (down/left/rigth)
            if(this.side != 'up'){
                context.drawImage(          
                    this.currentShieldSprite, 
                    this.currentShieldCropWidth * side_num,
                    0,
                    45, //largura
                    45, //altura
                    this.position.x + pos_x, 
                    this.position.y + pos_y,
                    this.width,
                    this.height
                )
            }

            // var radius = 10

            // context.beginPath()
            // context.arc(player.position.x + player.width/2, player.position.y + (player.height/4)*3, radius, 0, 2 * Math.PI, false)
            // context.fillStyle = '#777877'
            // context.fill()

            // context.lineWidth = 2
            // context.strokeStyle = 'black'
            // context.stroke()             
            
            // context.beginPath()
            // context.arc(player.position.x + player.width/2, player.position.y + player.height/2, 2, 0, 2 * Math.PI, false)
            // context.fillStyle = 'black'
            // context.fill()

            this.speed = speed_value(this.agility)/2
        }else{
            this.speed = speed_value(this.agility)
        }    
        
        if(this.isRunning && !this.defending && this.stamina > 0){
            this.speed = speed_value(this.agility)*2
            this.stamina -= 0.5
        }else{
            this.speed = speed_value(this.agility)
        }
    }

    update(){
        //sprite switching
        if(!this.isAttack){
            if(this.isWalking){
                if(keys.right.pressed && lastKey === 'right' && this.currentSprite !== this.sprites.run.right){
                    this.currentSprite = this.sprites.run.right
                    this.frames = 1
                    this.cropWidth = this.sprites.run.cropWidth 
                    this.side = 'right'
            
                } else if (keys.left.pressed && lastKey === 'left' && this.currentSprite !== this.sprites.run.left){
                    this.currentSprite = this.sprites.run.left 
                    this.frames = 1
                    this.cropWidth = this.sprites.run.cropWidth          
                    this.side = 'left'
                
                } else if (keys.down.pressed && lastKey === 'down' && this.currentSprite !== this.sprites.run.down){
                    this.currentSprite = this.sprites.run.down 
                    this.frames = 1
                    this.cropWidth = this.sprites.run.cropWidth          
                    this.side = 'down'
                
                } else if (keys.up.pressed && lastKey === 'up' && this.currentSprite !== this.sprites.run.up){
                    this.currentSprite = this.sprites.run.up 
                    this.frames = 1
                    this.cropWidth = this.sprites.run.cropWidth          
                    this.side = 'up'
                }
            } else{
                if(!keys.right.pressed && lastKey === 'right' && this.currentSprite !== this.sprites.stand.right){
                    this.currentSprite = this.sprites.stand.right
                    this.frames = 4
                    this.cropWidth = this.sprites.stand.cropWidth          
                    this.side = 'right'
    
                } else if (!keys.left.pressed && lastKey === 'left' && this.currentSprite !== this.sprites.stand.left){
                    this.currentSprite = this.sprites.stand.left 
                    this.frames = 4
                    this.cropWidth = this.sprites.stand.cropWidth          
                    this.side = 'left'
    
                } else if (!keys.down.pressed && lastKey === 'down' && this.currentSprite !== this.sprites.stand.down){
                    this.currentSprite = this.sprites.stand.down 
                    this.frames = 4
                    this.cropWidth = this.sprites.stand.cropWidth          
                    this.side = 'down'
    
                } else if (!keys.up.pressed && lastKey === 'up' && this.currentSprite !== this.sprites.stand.up){
                    this.currentSprite = this.sprites.stand.up 
                    this.frames = 4
                    this.cropWidth = this.sprites.stand.cropWidth          
                    this.side = 'up'
                }
            }  
        }else{
            //this.frames = 7
        }

        if(lastTimestamp - this.frameTime > this.lastTimestamp){
            this.frames++            
            this.lastTimestamp = lastTimestamp
        }

        // this.count++
        // if (this.count==10 || this.count==20 || this.count==30 || this.count==40 || this.count==50 || this.count==60 || this.count==70 || this.count>=80){
        //   this.frames++
        // }


        //attack
        if(this.isAttack && this.frames > 7){            
            this.frames = 7
            this.isAttack = false
            this.frameTime = this.attackFrameTime
            this.lastTimestamp = lastTimestamp
        }
        
        if(this.isAttack && !(this.frames >= 6 && this.frames < 8)){
            this.frames = 6
            this.frameTime = this.attackFrameTime
            this.lastTimestamp = lastTimestamp
        }

        //stand
        if (!this.isAttack && !this.isWalking){
                if(this.frames > 5){
                    this.frames = 4
                    this.count = 0
                    this.frameTime = this.standFrameTime
                    this.lastTimestamp = lastTimestamp
                    this.frameTime = this.standFrameTime
                }

        }else 
        
        //walking
        if (!this.isAttack && this.isWalking
        //   (this.currentSprite === this.sprites.run.right || 
        //     this.currentSprite === this.sprites.run.left || 
        //     this.currentSprite === this.sprites.run.down || 
        //     this.currentSprite === this.sprites.run.up)
            ){
            if(this.frames > 3){
                this.frames = 0
                this.count = 0
                if(this.isRunning){
                    this.frameTime = this.runningFrameTime
                }else{
                    this.frameTime = this.walkingFrameTime
                }
                this.lastTimestamp = lastTimestamp
            }
        }        

        if(this.hp < this.max_hp){
            this.hp += this.hp_recovery
        }

        if(this.sp < this.max_sp){
            this.sp += 0.01
        }

        if(this.stamina < this.max_stamina){
            this.stamina += 0.04
        }

        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}