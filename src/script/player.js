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
        this.width = 32
        this.height = 32

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

        if(id == 'p1'){ //64
            this.attributes = {
                power : 12,
                agility : 9,
                dexterity : 12,
                vitality : 11,
                inteligence : 20
            }
        }

        if(id == 'p2'){ //64
            this.attributes = {
                power : 16,
                agility : 7,
                dexterity : 14,
                vitality : 15,
                inteligence : 12
            }
        }

        this.attributes_values = {
            max_hp : 0,
            max_sp : 0,
            max_stamina : 100,
    
            hp : 0,
            sp : 0,
            stamina : 0,
            
            attack : 0,
            defense : 0,
            flee : 0,
            
            speed : 0,
            attack_speed : -12,  
            hp_recovery : 0,    
            sp_recovery : 0   
        }

        this.attributes_values.max_hp = hp_value(this.attributes.vitality, this.attributes.power)
        this.attributes_values.max_sp = sp_value(this.attributes.inteligence, this.attributes.dexterity)

        this.attributes_values.hp = this.attributes_values.max_hp
        this.attributes_values.sp = this.attributes_values.max_sp
        this.attributes_values.stamina = this.attributes_values.max_stamina
        
        this.attributes_values.attack = attack_value(this.attributes.power, this.attributes.dexterity)
        this.attributes_values.defense = defense_value(this.attributes.vitality, this.attributes.dexterity)
        this.attributes_values.flee = flee_value(this.attributes.agility, this.attributes.dexterity)
        
        this.attributes_values.speed = speed_value(this.attributes.agility) 
        this.attributes_values.attack_speed = attack_speed_value(this.attributes.agility) + this.attributes_values.attack_speed
        this.attributes_values.hp_recovery = hp_recovery(this.attributes.vitality)   
        this.attributes_values.sp_recovery = sp_recovery(this.attributes.inteligence, this.attributes.dexterity)  

        this.staminaCoolDown = 0
        this.attackCoolDown = 0
        this.powerBladeCoolDown = 0
        this.rapidBladeCoolDown = 0
        this.phantonBladeCoolDown = 0
        this.cureCoolDown = 0

        this.side = 'down'

        if(id=='p1'){
            this.currentCropWidth = 33
            this.currentCropHeight = 0

            this.sprites = {
                character : {
                    sprite : createImage('src/img/knight_female.png'),
                    cropWidth : 0,
                    width : 32,
                    height : 43,
                    cropWidth : 32,
                    cropHeight : 43
                },
                shield : {
                    sprite : createImage('src/img/shield_1.png'),
                    cropWidth : 45,
                    width : 45
                }
            }
        }

        if(id=='p2'){ 
            this.currentCropWidth = 34
            this.currentCropHeight = 0

            this.sprites = {
                character : {
                    sprite : createImage('src/img/knight_male.png'),
                    cropWidth : 0,
                    width : 32,
                    height : 50,
                    cropWidth : 32,
                    cropHeight : 45
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
        //area
        // context.fillStyle = '#ff000055'
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
                45, 
                45, 
                this.position.x + posx, 
                this.position.y - 4,
                this.sprites.shield.width,
                this.height
            )
        }

        this.center_x = (this.position.x + this.width/2) - (this.sprites.character.width/2)
        this.center_y = (this.position.y + this.height - this.sprites.character.height)

        //draw character
        context.drawImage(          
            this.currentSprite, 
            this.currentCropWidth * this.frames, //corte no eixo x
            this.currentCropHeight, //corte no eixo y
            this.sprites.character.cropWidth, //largura do corte
            this.sprites.character.cropHeight, //altura do corte
            this.center_x, 
            this.center_y,
            this.sprites.character.width,
            this.sprites.character.height
        )

        // var display = new Display({x : this.position.x + this.width/2, y : this.position.y + this.height+8, color : 'red', text : this.attributes_values.hp, type : 'hp'})
        // displays.push(display)

        var bar_width = 40
        var center_x = (this.position.x + this.width/2) - (bar_width/2)

        //HP bar
        if(this.attributes_values.hp < this.attributes_values.max_hp){
            context.fillStyle = 'black'
            context.fillRect(center_x, this.position.y + this.height+1, bar_width, 4)
            var hp_percent = Math.round(this.attributes_values.hp * 100) / this.attributes_values.max_hp
            var bar_value = (bar_width * hp_percent) / 100
            if(hp_percent<=25){
                context.fillStyle = 'red'
            }else{
                context.fillStyle = 'green'
            }
            context.fillRect(center_x, this.position.y + this.height+1, bar_value, 3)
        }

        //SP bar
        if(this.attributes_values.sp < this.attributes_values.max_sp){
            context.fillStyle = 'black'
            context.fillRect(center_x, this.position.y + this.height+4, bar_width, 4)
            var sp_percent = Math.round(this.attributes_values.sp * 100) / this.attributes_values.max_sp
            var bar_value = (bar_width * sp_percent) / 100
            context.fillStyle = 'blue'        
            context.fillRect(center_x, this.position.y + this.height+4, bar_value, 3)
        }

        //Stamina bar
        if(this.attributes_values.stamina < this.attributes_values.max_stamina){
            context.fillStyle = 'black'
            context.fillRect(center_x, this.position.y + this.height+8, bar_width, 4)
            var stamina_percent = Math.round(this.attributes_values.stamina * 100) / this.attributes_values.max_stamina
            var bar_value = (bar_width * stamina_percent) / 100
            if(stamina_percent<=25){
                context.fillStyle = 'orange'
            }else{
                context.fillStyle = 'yellow'
            }       
            context.fillRect(center_x, this.position.y + this.height+8, bar_value, 3)
        }

        if(this.defending){
            
            var side_num = 0
            var pos_x = -2
            var pos_y = 2

            switch(this.side){
                case 'down':
                    side_num = 0
                    pos_x = -2
                break

                case 'left':
                    side_num = 1
                    pos_x = -14
                break

                case 'right':
                    side_num = 2
                    pos_x = 2
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
                this.currentCropHeight = this.sprites.character.cropHeight * 1
        
            } else if (keys.left.pressed && lastKey === 'left'){       
                this.side = 'left'
                this.currentCropHeight = this.sprites.character.cropHeight * 2
            
            } else if (keys.down.pressed && lastKey === 'down'){        
                this.side = 'down'
                this.currentCropHeight = this.sprites.character.cropHeight * 0
            
            } else if (keys.up.pressed && lastKey === 'up'){        
                this.side = 'up'
                this.currentCropHeight = this.sprites.character.cropHeight * 3
            }
        }

        //sprite switching player 2
        if(!this.isAttack && this.isWalking && this.id == 'p2'){
            if(keys2.right.pressed && lastKey2 === 'right'){
                this.side = 'right'
                this.currentCropHeight = this.sprites.character.cropHeight * 1
        
            } else if (keys2.left.pressed && lastKey2 === 'left'){       
                this.side = 'left'
                this.currentCropHeight = this.sprites.character.cropHeight * 2
            
            } else if (keys2.down.pressed && lastKey2 === 'down'){        
                this.side = 'down'
                this.currentCropHeight = this.sprites.character.cropHeight * 0
            
            } else if (keys2.up.pressed && lastKey2 === 'up'){        
                this.side = 'up'
                this.currentCropHeight = this.sprites.character.cropHeight * 3
            }
        }

        this.attributes_values.speed = speed_value(this.attributes.agility)

        //need adjust: stamina on timestamp
        if(this.isRunning && !this.defending && this.attributes_values.stamina > 0){
            this.attributes_values.speed = speed_value(this.attributes.agility)*2
            if (this.id=='p1' && (keys.up.pressed || keys.down.pressed || keys.left.pressed ||keys.right.pressed)){             
                this.attributes_values.stamina -= 0.5
            }
            if (this.id=='p2' && (keys2.up.pressed || keys2.down.pressed || keys2.left.pressed ||keys2.right.pressed)){             
                this.attributes_values.stamina -= 0.5
            }
        }        
        if(this.defending){
            this.attributes_values.speed = speed_value(this.attributes.agility)/2
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
            if(this.attributes_values.hp < this.attributes_values.max_hp && this.attributes_values.hp > 0){
                this.attributes_values.hp += this.attributes_values.hp_recovery
                if(this.attributes_values.hp > this.attributes_values.max_hp){
                    this.attributes_values.hp = this.attributes_values.max_hp
                }
            }
    
            if(this.attributes_values.sp < this.attributes_values.max_sp){
                this.attributes_values.sp += this.attributes_values.sp_recovery
                if(this.attributes_values.sp > this.attributes_values.max_sp){
                    this.attributes_values.sp = this.attributes_values.max_sp
                }
            }
    
            if(this.attributes_values.stamina < this.attributes_values.max_stamina && this.staminaCoolDown <= 0){
                this.attributes_values.stamina += 1
                if(this.attributes_values.stamina > this.attributes_values.max_stamina){
                    this.attributes_values.stamina = this.attributes_values.max_stamina
                }
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

        //this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}