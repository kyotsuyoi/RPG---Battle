class Damage{
    constructor({id, x, y, owner_id, owner, type, side, character_width, character_height, lastTimestamp}){
        this.id = id

        this.position ={
            x,
            y
        }
        this.velocity={
            x : 0,
            y : 0
        }
        this.width = 42
        this.height = 42
        this.speed = 4
        this.targetRange = 150 

        this.lastDamage = new Array() //saves id of target that has already taken damage

        this.frameTime = 30
        this.frames = 0
        this.time = 10
        this.damageCount = 1//for mult damages
        this.lastTimestamp = lastTimestamp
        this.positionTimestamp = lastTimestamp

        this.owner = owner
        this.owner_id = owner_id

        this.power = 8 //knock back only
        this.bonus_attack = 0
        this.bonus_dexterity = 0
        this.stun = 10

        this.sprites = {
            sprite : createImage('img/sword_attack.png'),
            cropWidth : 42,
            width : this.width            
        }

        this.type = type   
        switch (type){
            case 'power_blade':
                this.power = 40
                this.bonus_attack = 30
                this.bonus_dexterity = 5
                this.width = 100
                this.height = 100
                this.sprites.sprite = createImage('img/power_sword_attack.png')
                this.time = 60
                this.speed = 1.5
                this.stun = 50
            break

            case 'rapid_blade':
                this.power = 10
                this.bonus_attack = 2
                this.bonus_dexterity = 3
                this.width = 50
                this.height = 50
                this.sprites.sprite = createImage('img/power_sword_attack.png')
                this.time = 10
                this.damageCount = 3
                this.speed = 2.5
                this.stun = 30
            break
            
            case 'phanton_blade':
                this.power = 50
                this.bonus_attack = 5
                this.bonus_dexterity = 10
                this.width = 100
                this.height = 100
                this.sprites.sprite = createImage('img/power_sword_attack.png')
                this.time = 5
                this.speed = 0
                this.stun = 100
            break
        }

        this.currentSprite = this.sprites.sprite
        this.currentCropWidth = 42
        this.currentCropHeight = 0

        this.side = side
        switch (side){
            case 'up':
                this.position.x = (x + character_width /2) - (this.height/2)
                this.position.y = y - this.height/2 + character_height /2//- this.width //- this.height
                this.currentCropHeight = 42*2
                this.velocity.y = -this.speed
            break

            case 'down':
                this.position.x = (x + character_width /2) - (this.height/2)
                this.position.y = y - this.height/2 + character_height /2 //+ character_height 
                this.currentCropHeight = 42*3
                this.velocity.y = this.speed
            break

            case 'left':
                this.position.x = x - this.width/2 + character_width /2//- this.width
                this.position.y = (y + character_height /2) - (this.height/2) 
                this.currentCropHeight = 0
                this.velocity.x = -this.speed
            break

            case 'right':
                this.position.x = x - this.width/2 + character_width /2//+ character_width 
                this.position.y = (y + character_height /2) - (this.height/2)
                this.currentCropHeight = 42
                this.velocity.x = this.speed
            break
        }
    }

    draw(){
        // if(this.type == 'power_blade'){
        //     context.fillStyle = 'red'
        // }else{
        //     context.fillStyle = 'green'
        // }
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)

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
    }

    update(){
        if(lastTimestamp - this.frameTime > this.lastTimestamp){
            this.frames++            
            this.lastTimestamp = lastTimestamp
        }

        if(this.frames > 3){            
            this.frames = 0
            this.lastTimestamp = lastTimestamp
        } 

        if(lastTimestamp - 2 > this.positionTimestamp){            
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            this.positionTimestamp = lastTimestamp
        }
        this.draw()
    }
}

function damage_action(damage){
    if(damage.time <= 0){
        
        if(damage.type == 'rapid_blade'){ 
            if(damage.damageCount > 1){
                switch(damage.owner){                
                    case 'player':
                        weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p', type : 'sword_2', side : player.side})
                        weapons.push(weapon)
                    break
                    case 'player2':
                        weapon = new Weapon({x : player2.position.x, y : player2.position.y, owner_id : 'p2', type : 'sword_2', side : player2.side})
                        weapons.push(weapon)
                    break
                }  
                damage.lastDamage = new Array()
                damage.damageCount -= 1
                damage.time = 6
            }else{
                damages.pop(damage)  
            }                       
        }else{
            damages.pop(damage)
        }

    }else{
        damage.time -= 1
        //damage.draw()

        if(damage.owner == 'player' || damage.owner == 'player2'){
            playerDamage(damage)
        }  
        
        if(damage.owner == 'cpu'){
            enemyDamage(damage, player)
            enemyDamage(damage, player2)
        }
    }
}

function enemyDamage(damage, player){

    if(player == null){
        return
    }
    
    if (square_colision_area(damage, player)) {

        var id = damage.lastDamage.filter(element => element == player.id)
        if(id == 'p1' || id == 'p2'){
            return
        }
        damage.lastDamage.push(player.id)

        var enemy = enemies.find(element => element.id == damage.owner_id)  
        
        //Unknown problem
        if(enemy == undefined){
            console.log('ERROR: undefined enemy')
            return
        }   

        var is_hit = false

        if(enemy != undefined){
            is_hit = dexterity_vs_flee(enemy.dexterity, player.agility)
            
            if(player.defending){
                is_hit = true
            }
        } 


        if(is_hit){    

            var result = attack_vs_defense(enemy.attack, enemy.dexterity, player.defense)
            if(player.defending){ 

                res_stm = player.stamina - result
                if(res_stm < 0){
                    player.stamina = 0 
                    player.defending = false
                    result += Math.round(res_stm)
                    player.hp -= result   
                    if(player.hp <= 0){
                        player.hp = 0.0
                    }                       
                    swordSlashSound()                         
                    display = new Display({x : player.position.x + player.width/2, y : player.position.y + player.height/2, color : 'red', text : result, type : 'damage'})
                    displays.push(display)

                }else{
                    shieldSound()
                    player.stamina = player.stamina - result/2
                    damages.pop(damage)
                }  
                
                player.staminaCoolDown = 50

            }else{
                var result = attack_vs_defense(enemy.attack, enemy.dexterity, player.defense)
                player.hp -= result  
                if(player.hp < 0){
                    player.hp = 0
                }                  
                swordSlashSound()          
                display = new Display({x : player.position.x + player.width/2, y : player.position.y + player.height/2, color : 'red', text : result, type : 'damage'})
                displays.push(display)
            }

            //console.log('enemy_damage:'+result)
            
            switch (damage.side){
                case 'up': 
                    if(player.position.y <= 0){
                        player.position.y = 0
                    }else{
                        player.position.y -= knock_back(damage.power, enemy.power, player.power)
                    }                      
                break

                case 'down':
                    if(player.position.y + player.height >= background.height){
                        player.position.y = background.height - player.height
                    }else{
                        player.position.y += knock_back(damage.power, enemy.power, player.power)
                    }
                break

                case 'left':
                    if(player.position.x <= 0){
                        player.position.x = 0
                    }else{
                        player.position.x -= knock_back(damage.power, enemy.power, player.power)
                    }
                break

                case 'right':
                    if(player.position.x + player.width >= background.width){
                        player.position.x = background.width - player.width
                    }else{
                        player.position.x += knock_back(damage.power, enemy.power, player.power)
                    }
                break                    
            }

        }else{
            display = new Display({x : player.position.x + player.width/2, y : player.position.y + player.height/2, color : 'yellow', text : 'MISS', type : 'damage'})
            displays.push(display)
        }  

        if(player.hp <= 0){
            return
        }
    }
}

function playerDamage(damage){
    enemies.forEach(enemy => {
        if (square_colision_area(damage, enemy)) {
            
            //this is to not double damage
            var p = damage.lastDamage.filter(element => element == enemy.id)
            if(p == enemy.id){
                return
            }
            damage.lastDamage.push(enemy.id)
            
            var is_hit = false
            switch(damage.owner){
                case 'player':
                    is_hit = dexterity_vs_flee(player.dexterity + damage.bonus_dexterity, enemy.agility)
                break
                case 'player2':
                    is_hit = dexterity_vs_flee(player.dexterity + damage.bonus_dexterity, enemy.agility)
                break
            }                    
            
            if(is_hit){                        
                var result = 0
                switch(damage.owner){
                    case 'player':
                        result = attack_vs_defense(player.attack + damage.bonus_attack, player.dexterity + damage.bonus_dexterity, enemy.defense)
                    break
                    case 'player2':
                        result = attack_vs_defense(player2.attack + damage.bonus_attack, player2.dexterity + damage.bonus_dexterity, enemy.defense)
                    break
                }  

                enemy.hp -= result   
                enemy.stunTime = damage.stun    
                swordSlashSound()              
                display = new Display({x : enemy.position.x + enemy.width/2, y : enemy.position.y + enemy.height/2, color : 'red', text : result, type : 'damage'})
                displays.push(display)

                if(!enemy.knock_back){
                    return
                }

                switch(damage.owner){
                    case 'player':
                        switch (player.side){
                            case 'up':                        
                                enemy.position.y -= knock_back(damage.power, player.power, enemy.power)
                            break
        
                            case 'down':
                                enemy.position.y += knock_back(damage.power, player.power, enemy.power)
                            break
        
                            case 'left':
                                enemy.position.x -= knock_back(damage.power, player.power, enemy.power)
                            break
        
                            case 'right':
                                enemy.position.x += knock_back(damage.power, player.power, enemy.power)
                            break 
                        }
                    break  

                    case 'player2':
                        switch (player2.side){
                            case 'up':                        
                                enemy.position.y -= knock_back(damage.power, player2.power, enemy.power)
                            break
        
                            case 'down':
                                enemy.position.y += knock_back(damage.power, player2.power, enemy.power)
                            break
        
                            case 'left':
                                enemy.position.x -= knock_back(damage.power, player2.power, enemy.power)
                            break
        
                            case 'right':
                                enemy.position.x += knock_back(damage.power, player2.power, enemy.power)
                            break 
                        }
                    break                             
                }
            }else{
                display = new Display({x : enemy.position.x + enemy.width/2, y : enemy.position.y + enemy.height/2, color : 'yellow', text : 'MISS', type : 'damage'})
                displays.push(display)
            }    
        }
    }) 
}