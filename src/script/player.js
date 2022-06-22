class Player{
    constructor(id, lastTimestamp, x, y){
        this.id = id
        this.start = false
        this.position ={
            x : x,
            y : y
        }
        this.velocity={
            x : 0,
            y : 0
        }
        this.width = 0
        this.height = 0

        this.frames = 4
        this.lastTimestamp = lastTimestamp

        this.frameTime = 0
        this.walkingFrameTime = 100
        this.runningFrameTime = this.walkingFrameTime/2
        this.standFrameTime = 500
        this.attackFrameTime = 150

        this.recoveryTime = 100     
        this.lastRecoveryTime = lastTimestamp

        this.isAttack = false
        this.isWalking = false
        this.defending = false
        this.isRunning = false

        if(id == 'p1'){
            this.power = 12
            this.agility = 8
            this.dexterity = 12
            this.vitality = 12
            this.inteligence = 15
        }

        if(id == 'p2'){
            this.power = 16
            this.agility = 6
            this.dexterity = 12
            this.vitality = 14
            this.inteligence = 7
        }

        this.max_hp = hp_value(this.vitality, this.power)
        this.max_sp = sp_value(this.inteligence, this.dexterity)
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
        this.sp_recovery = sp_recovery(this.inteligence, this.dexterity)  

        this.staminaCoolDown = 0
        this.attackCoolDown = 0
        this.powerBladeCoolDown = 0
        this.rapidBladeCoolDown = 0
        this.phantonBladeCoolDown = 0
        this.cureCoolDown = 0

        this.side = 'down'

        if(id=='p1'){
            this.width = 32
            this.height = 43
            
            this.currentCropWidth = 33
            this.currentCropHeight = 0

            this.sprites = {
                character : {
                    sprite : createImage('src/img/knight_female.png'),
                    cropWidth : 0,
                    width : this.width
                },
                shield : {
                    sprite : createImage('src/img/shield_1.png'),
                    cropWidth : 45,
                    width : 45
                }
            }
        }

        if(id=='p2'){            
            this.width = 32
            this.height = 45
            
            this.currentCropWidth = 34
            this.currentCropHeight = 0

            this.sprites = {
                character : {
                    sprite : createImage('src/img/knight_male.png'),
                    cropWidth : 0,
                    width : this.width
                },
                shield : {
                    sprite : createImage('src/img/shield_2.png'),
                    cropWidth : 45,
                    width : 45
                }
            }            
        }

        this.currentSprite = this.sprites.character.sprite

        this.currentShieldSprite = this.sprites.shield.sprite
        this.currentShieldCropWidth = 45
    }

    draw(){
        // context.fillStyle = 'blue'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)

        //draw shield first (up only)
        if(this.side == 'up' && this.defending){

            var posx = 0
            if(this.id == 'p1'){
                posx = -11
            }
            if(this.id == 'p2'){
                posx = -12
            }

            context.drawImage(          
                this.currentShieldSprite, 
                this.currentShieldCropWidth * 3,
                0,
                45, //largura
                45, //altura
                this.position.x + posx, 
                this.position.y + 8,
                this.sprites.shield.width,
                this.height
            )
        }

        //draw character
        context.drawImage(          
            this.currentSprite, 
            this.currentCropWidth * this.frames,
            this.currentCropHeight,
            this.currentCropWidth, //largura
            42, //altura
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        )

        // var display = new Display({x : this.position.x + this.width/2, y : this.position.y + this.height+8, color : 'red', text : this.hp, type : 'hp'})
        // displays.push(display)

        var x_abs = this.position.x - Math.abs(this.width/2 - 20)

        //HP bar
        if(this.hp < this.max_hp){
            context.fillStyle = 'black'
            context.fillRect(x_abs, this.position.y + this.height+1, 40, 4)
            var hp_percent = Math.round(this.hp * 100) / this.max_hp
            var bar_value = (40 * hp_percent) / 100
            if(hp_percent<=25){
                context.fillStyle = 'red'
            }else{
                context.fillStyle = 'green'
            }
            context.fillRect(x_abs, this.position.y + this.height+1, bar_value, 3)
        }

        //SP bar
        if(this.sp < this.max_sp){
            context.fillStyle = 'black'
            context.fillRect(x_abs, this.position.y + this.height+4, 40, 4)
            var sp_percent = Math.round(this.sp * 100) / this.max_sp
            var bar_value = (40 * sp_percent) / 100
            context.fillStyle = 'blue'        
            context.fillRect(x_abs, this.position.y + this.height+4, bar_value, 3)
        }

        //Stamina bar
        if(this.stamina < this.max_stamina){
            context.fillStyle = 'black'
            context.fillRect(x_abs, this.position.y + this.height+8, 40, 4)
            var stamina_percent = Math.round(this.stamina * 100) / this.max_stamina
            var bar_value = (40 * stamina_percent) / 100
            if(stamina_percent<=25){
                context.fillStyle = 'orange'
            }else{
                context.fillStyle = 'yellow'
            }       
            context.fillRect(x_abs, this.position.y + this.height+8, bar_value, 3)
        }

        if(this.defending){
            
            var side_num = 0
            var pos_x = -2
            var pos_y = 10

            if(this.id == 'p1'){
                switch(this.side){
                    case 'down':
                        side_num = 0
                        pos_x = -2
                        pos_y = 10
                    break

                    case 'left':
                        side_num = 1
                        pos_x = -14
                        pos_y = 10
                    break

                    case 'right':
                        side_num = 2
                        pos_x = 2
                        pos_y = 10
                    break
                }
            }

            if(this.id == 'p2'){
                switch(this.side){
                    case 'down':
                        side_num = 0
                        pos_x = -2
                        pos_y = 10
                    break

                    case 'left':
                        side_num = 1
                        pos_x = -14
                        pos_y = 10
                    break

                    case 'right':
                        side_num = 2
                        pos_x = 2
                        pos_y = 10
                    break
                }
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
                    this.sprites.shield.width,
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

        }          
    }

    update(){

        //sprite switching player 1
        if(!this.isAttack && this.isWalking && this.id == 'p1'){
            if(keys.right.pressed && lastKey === 'right'){
                this.side = 'right'
                this.currentCropHeight = this.height * 1
        
            } else if (keys.left.pressed && lastKey === 'left'){       
                this.side = 'left'
                this.currentCropHeight = this.height * 2
            
            } else if (keys.down.pressed && lastKey === 'down'){        
                this.side = 'down'
                this.currentCropHeight = this.height * 0
            
            } else if (keys.up.pressed && lastKey === 'up'){        
                this.side = 'up'
                this.currentCropHeight = this.height * 3
            }
        }

        //sprite switching player 2
        if(!this.isAttack && this.isWalking && this.id == 'p2'){
            if(keys2.right.pressed && lastKey2 === 'right'){
                this.side = 'right'
                this.currentCropHeight = this.height * 1
        
            } else if (keys2.left.pressed && lastKey2 === 'left'){       
                this.side = 'left'
                this.currentCropHeight = this.height * 2
            
            } else if (keys2.down.pressed && lastKey2 === 'down'){        
                this.side = 'down'
                this.currentCropHeight = this.height * 0
            
            } else if (keys2.up.pressed && lastKey2 === 'up'){        
                this.side = 'up'
                this.currentCropHeight = this.height * 3
            }
        }

        this.speed = speed_value(this.agility)

        if(this.isRunning && !this.defending && this.stamina > 0){
            this.speed = speed_value(this.agility)*2
            this.stamina -= 0.5
        }
        
        if(this.defending){
            this.speed = speed_value(this.agility)/2
        }

        if(lastTimestamp - this.frameTime > this.lastTimestamp){
            this.frames++            
            this.lastTimestamp = lastTimestamp
        }

        //attack
        if(this.isAttack && this.frames > 7){            
            this.frames = 7
            this.isAttack = false
            this.frameTime = this.attackFrameTime
            this.lastTimestamp = lastTimestamp
        }        
        if(this.isAttack && !(this.frames >= 6 && this.frames <= 7)){
            this.frames = 6
            this.frameTime = this.attackFrameTime
            this.lastTimestamp = lastTimestamp
        }

        //stand
        if (!this.isAttack && !this.isWalking){
            if(this.frames > 5){
                this.frames = 4
                this.frameTime = this.standFrameTime
                this.lastTimestamp = lastTimestamp
            }
            if(!(this.frames >= 4 && this.frames <= 5)){
                this.frames = 4
                this.frameTime = this.standFrameTime
                this.lastTimestamp = lastTimestamp
            }
        }
        
        //walk
        if (!this.isAttack && this.isWalking){
            if(this.frames > 3){
                this.frames = 0
                if(this.isRunning){
                    this.frameTime = this.runningFrameTime
                }else{
                    this.frameTime = this.walkingFrameTime
                }
                this.lastTimestamp = lastTimestamp
            }
            if(!(this.frames >= 0 && this.frames <= 3)){
                this.frames = 0
                this.frameTime = this.walkingFrameTime
                this.lastTimestamp = lastTimestamp
            }
        }    
        
        if(lastTimestamp - this.recoveryTime > this.lastRecoveryTime){
            if(this.hp < this.max_hp && this.hp > 0){
                this.hp += this.hp_recovery
            }
    
            if(this.sp < this.max_sp){
                this.sp += this.sp_recovery
            }
    
            if(this.stamina < this.max_stamina && this.staminaCoolDown <= 0){
                this.stamina += 1
            }
            else{
                this.staminaCoolDown -= 1
            }

            if(this.attackCoolDown > 0){
                this.attackCoolDown -= 1
            }
            if(this.powerBladeCoolDown > 0){
                this.powerBladeCoolDown -= 1
            }
            if(this.rapidBladeCoolDown > 0){
                this.rapidBladeCoolDown -= 1
            }
            if(this.phantonBladeCoolDown > 0){
                this.phantonBladeCoolDown -= 1
            }
            if(this.cureCoolDown > 0){
                this.cureCoolDown -= 1
            }

            this.lastRecoveryTime = lastTimestamp
        }

        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}