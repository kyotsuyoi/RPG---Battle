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
        this.finished = false
        this.isKnockBack = true //enable or disable knock back

        this.owner = owner
        this.owner_id = owner_id

        this.power = 8 //knock back only
        this.bonus_attack = 0
        this.bonus_dexterity = 0
        this.stun = 10

        this.sprites = {
            sprite : createImage('src/img/sword_attack.png'),
            width : this.width,
            height : this.height               
        }
        
        this.currentCropWidth = 42
        this.currentCropHeight = 0

        this.type = type   
        switch (type){
            case 'power_blade':
                this.power = 40
                this.bonus_attack = 30
                this.bonus_dexterity = 5
                this.width = 100
                this.height = 100
                this.sprites.sprite = createImage('src/img/power_sword_attack.png')
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
                this.sprites.sprite = createImage('src/img/power_sword_attack.png')
                this.time = 10
                this.damageCount = 3
                this.speed = 2.5
                this.stun = 30
            break
            
            case 'phanton_blade':
                this.power = 0
                this.bonus_attack = -10
                this.bonus_dexterity = 10
                this.width = 100
                this.height = 100
                this.sprites.sprite = createImage('src/img/phanton_blade_attack.png')
                this.time = 80                
                this.damageCount = 10
                this.speed = 0
                this.stun = 100                
                this.currentCropWidth = 84
                this.sprites.width = 84
                this.sprites.height = 84
                this.currentCropHeight = 0
                this.isKnockBack = false
            break

            case 'cure':
                this.power = 0
                this.width = 100
                this.height = 100
                this.sprites.sprite = createImage('src/img/cure.png')
                this.time = 30                
                this.damageCount = 6
                this.speed = 0
                this.stun = 0                
                this.currentCropWidth = 84
                this.sprites.width = 84
                this.sprites.height = 84
                this.currentCropHeight = 0
                this.isKnockBack = false
            break
        }
        
        this.currentSprite = this.sprites.sprite

        this.side = side
        if(type == 'phanton_blade' || type == 'cure'){
            this.position.x = x - this.width/2 + character_width /2
            this.position.y = (y + character_height /2) - (this.height/2) 
            this.currentCropHeight = 0

        }else{
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
    }

    draw(){
        // if(this.owner_id == 'p1'){
        //     context.fillStyle = 'red'
        // }else{
        //     context.fillStyle = 'green'
        // }
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)

        if(this.type == 'cure'){
            // context.fillStyle = '#1b690f55'
            // context.fillRect(this.position.x, this.position.y, this.width, this.height)
            var radius = 50
            context.beginPath()
            context.arc(this.position.x + this.width/2, this.position.y + (this.height/2), radius, 0, 2 * Math.PI, false)
            context.fillStyle = '#1b690f22'
            context.fill()

            // context.lineWidth = 2
            // context.strokeStyle = 'black'
            // context.stroke()             
            
            // context.beginPath()
            // context.arc(player.position.x + player.width/2, player.position.y + player.height/2, 2, 0, 2 * Math.PI, false)
            // context.fillStyle = 'black'
            // context.fill()
        }

        context.drawImage(          
            this.currentSprite, 
            this.currentCropWidth * this.frames,
            this.currentCropHeight,
            this.sprites.width, //largura
            this.sprites.height, //altura
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
        
        switch(damage.type){

            case 'rapid_blade':
                if(damage.damageCount > 1){
                    switch(damage.owner_id){                
                        case 'p1':
                            weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p', type : 'sword_2', side : player.side})
                            weapons.push(weapon)
                        break
                        case 'p2':
                            weapon = new Weapon({x : player2.position.x, y : player2.position.y, owner_id : 'p2', type : 'sword_2', side : player2.side})
                            weapons.push(weapon)
                        break
                    }  
                    damage.lastDamage = new Array()
                    damage.damageCount -= 1
                    damage.time = 6
                }else{
                    //damages.pop(damage)  
                    damage.finished = true
                }  
            break

            case 'phanton_blade':
                if(damage.damageCount > 1){
                    switch(damage.owner_id){                
                        case 'p1':
                            weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p', type : 'sword_2', side : player.side})
                            weapons.push(weapon)
                        break
                        case 'p2':
                            weapon = new Weapon({x : player2.position.x, y : player2.position.y, owner_id : 'p2', type : 'sword_2', side : player2.side})
                            weapons.push(weapon)
                        break
                    }  
                    damage.lastDamage = new Array()
                    damage.damageCount -= 1
                    damage.time = 6
                }else{
                    //damages.pop(damage)  
                    damage.finished = true
                } 
            break

            case 'cure':
                if(damage.damageCount > 1){ 
                    damage.lastDamage = new Array()
                    damage.damageCount -= 1
                    damage.time = 20
                }else{
                    //damages.pop(damage)  
                    damage.finished = true
                } 
            break

            default:
                damage.finished = true
        }

    }else{
        damage.time -= 1
        //damage.draw()

        if(damage.owner_id == 'p1' || damage.owner_id == 'p2'){
            if(damage.type == 'cure'){
                playerCure(damage, player)
                if(player2 != null){
                    playerCure(damage, player2)
                }                
            }else{
                playerDamage(damage)
            }
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
          
        //If enemy is dead
        var enemy = enemies.find(element => element.id == damage.owner_id)
        if(enemy == undefined){
            //console.log('undefined enemy')
            return
        } 

        //if the player has already been hit
        var id = damage.lastDamage.filter(element => element == player.id)
        if(id == 'p1' || id == 'p2'){
            return
        }
        damage.lastDamage.push(player.id)          

        var is_hit = dexterity_vs_flee(enemy.dexterity, player.agility)            
        if(player.defending){
            is_hit = true
        }

        if(is_hit){   

            var result = attack_vs_defense(enemy.attack, enemy.dexterity, player.defense)
            if(player.defending){ 

                res_stm = player.stamina - result
                if(res_stm < 0){
                    player.stamina = 0 
                    player.defending = false
                    //result += Math.round(res_stm)
                    //result += res_stm
                    player.hp += res_stm  
                    if(player.hp <= 0){
                        player.hp = 0.0
                    }                       
                    swordSlashSound()                         
                    display = new Display({x : player.position.x + player.width/2, y : player.position.y + player.height/2, color : 'red', text : result, type : 'damage'})
                    displays.push(display)

                }else{
                    shieldSound()
                    player.stamina = player.stamina - stamina_vs_attack(player.defense, result)
                    //damages.pop(damage)
                    damage.finished = true
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
            
            if(damage.isKnockBack){
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
        if(damage.owner == 'cpu'){
            console.log('wrong damage detected')
        }
        if (square_colision_area(damage, enemy)) {
            
            //this is to not double damage
            var p = damage.lastDamage.filter(element => element == enemy.id)
            if(p == enemy.id){
                return
            }
            damage.lastDamage.push(enemy.id)
            
            var is_hit = false
            switch(damage.owner_id){
                case 'p1':
                    is_hit = dexterity_vs_flee(player.dexterity + damage.bonus_dexterity, enemy.agility)
                break
                case 'p2':
                    is_hit = dexterity_vs_flee(player.dexterity + damage.bonus_dexterity, enemy.agility)
                break
            }                    
            
            if(is_hit){                        
                var result = 0
                switch(damage.owner_id){
                    case 'p1':
                        result = attack_vs_defense(player.attack + damage.bonus_attack, player.dexterity + damage.bonus_dexterity, enemy.defense)
                    break
                    case 'p2':
                        result = attack_vs_defense(player2.attack + damage.bonus_attack, player2.dexterity + damage.bonus_dexterity, enemy.defense)
                    break
                }  

                enemy.hp -= result   
                enemy.stunTime = damage.stun    
                swordSlashSound()    
                if(enemy.hp <= 0){
                    screamSound()
                }          
                display = new Display({x : enemy.position.x + enemy.width/2, y : enemy.position.y + enemy.height/2, color : 'red', text : result, type : 'damage'})
                displays.push(display)

                if(!enemy.knock_back || !damage.isKnockBack){
                    return
                }

                switch(damage.owner_id){
                    case 'p1':
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

                    case 'p2':
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

//damage is reversed to cure
function playerCure(cure, player){
    if(square_colision_area(cure, player)){

        if(player.hp >= player.max_hp){
            return
        }
        
        var id = damage.lastDamage.filter(element => element == player.id)
        if(id == 'p1' || id == 'p2'){
            return
        }
        damage.lastDamage.push(player.id) 

        var cure_value = player.max_hp/30
        player.hp += cure_value
        display = new Display({x : player.position.x + player.width/2, y : player.position.y + player.height/2, color : 'green', text : Math.round(cure_value), type : 'damage'})
        displays.push(display)
 
    }
}