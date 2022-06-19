class Damage{
    constructor({id, x, y, owner_id, owner, type, side}){
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
        this.speed = 0.6
        this.targetRange = 150 

        this.lastDamage = new Array() //saves id of target that has already taken damage

        this.frames = 0
        this.count = 0
        this.time = 10

        this.owner = owner
        this.owner_id = owner_id

        this.attack_wait = 10
        this.power = 10 //knock back only
        this.bonus_attack = 0
        this.bonus_dexterity = 0

        this.sprites = {
            sprite : createImage('img/sword_attack.png'),
            cropWidth : 42,
            width : this.width            
        }

        this.type = type
        
        if(this.type == 'power_blade'){
            this.attack_wait = 30
            this.power = 40
            this.bonus_attack = 30
            this.bonus_dexterity = 5
            this.width = 100
            this.height = 100
            this.sprites.sprite = createImage('img/power_sword_attack.png')
            this.time = 60
        }

        this.currentSprite = this.sprites.sprite
        this.currentCropWidth = 42
        this.currentCropHeight = 0

        this.side = side
        switch (side){
            case 'up':
                this.position.x = (x + 42 /2) - (this.height/2)
                this.position.y = y - this.height
                this.currentCropHeight = 42*2
            break

            case 'down':
                this.position.x = (x + 42 /2) - (this.height/2)
                this.position.y = y + 42 
                this.currentCropHeight = 42*3
            break

            case 'left':
                this.position.x = x - this.width
                this.position.y = this.position.y = (y + 42 /2) - (this.height/2) 
                this.currentCropHeight = 0
            break

            case 'right':
                this.position.x = x + 42 
                this.position.y = (y + 42 /2) - (this.height/2)
                this.currentCropHeight = 42
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
        this.count++
        if(this.type == 'power_blade'){
            if(this.count==5 || this.count==10 || this.count==20 || this.count==30){
                this.frames++
            }
        }else
        if (this.count==3 || this.count==6 || this.count==9 || this.count==12){
            this.frames++
        }

        // if (this.frames > 3){  
        //     this.frames = 0
        //     this.count = 0
        // }

        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

function damage_action(damage){
    if(damage.time == 0){
        damages.pop(damage)
    }else{
        damage.time -= 1
        //damage.draw()

        if(damage.owner == "player" || damage.owner == "player2"){
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
                        display = new Display({x : enemy.position.x + enemy.width/2, y : enemy.position.y + enemy.height/2, color : 'red', text : result, type : 'damage'})
                        displays.push(display)

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
        
        if(damage.owner == "cpu"){
            enemyDamage(player)
            enemyDamage(player2)
        }
    }
}

function enemyDamage(player){
    if (square_colision_area(damage, player)) {

        var p = damage.lastDamage.filter(element => element == player.id)
        if(p == 'p1' || p == 'p2'){
            return
        }
        damage.lastDamage.push(player.id)

        var enemy = enemies.find(element => element.id == damage.owner_id)   
        var is_hit = false

        if(enemy != undefined){
            is_hit = dexterity_vs_flee(enemy.dexterity, player.agility)
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
                    display = new Display({x : player.position.x + player.width/2, y : player.position.y + player.height/2, color : 'red', text : result, type : 'damage'})
                    displays.push(display)

                }else{
                    player.stamina = player.stamina - result/2
                }  
                
                player.staminaCoolDown = 50

            }else{
                var result = attack_vs_defense(enemy.attack, enemy.dexterity, player.defense)
                player.hp -= result  
                if(player.hp < 0){
                    player.hp = 0
                }
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