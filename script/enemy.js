class Enemy{
    constructor({id, x, y}){
        this.position ={
            x,
            y
        }
        this.velocity={
            x : 0,
            y : 0
        }
        this.width = 45
        this.height = 45
        this.speed = 0.6
        this.targetRange = 150 

        this.frames = 0
        this.count = 0

        this.patrol_time_wait = 1000
        this.in_patrol_time = 0
        this.patrol_x = 0
        this.patrol_y = 0
        this.in_battle = false
        this.in_patrol = false
        
        this.in_patrol_time = 0

        this.attack_wait = 0

        this.id = id
        this.side = 'down'

        this.power = 5
        this.agility = 8
        this.dexterity = 6
        this.vitality = 10

        this.max_hp = hp_value(this.vitality, this.power)
        this.max_sp = sp_value()

        this.hp = this.max_hp
        this.sp = this.max_sp
        
        this.attack = attack_value(this.power, this.dexterity)
        this.defense = defense_value(this.vitality, this.dexterity)
        this.flee = flee_value(this.agility, this.dexterity)
        
        this.speed = 0.8 
        this.attack_speed = 0  

        this.sprites = {
            sprite : createImage('img/thief_male.png'),
            cropWidth : 46,
            width : this.width            
        }

        this.currentSprite = this.sprites.sprite
        this.currentCropWidth = 46
        this.currentCropHeight = 0
    }

    draw(){
        // context.fillStyle = 'green'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)

        context.drawImage(          
            this.currentSprite, 
            this.currentCropWidth * this.frames,
            this.currentCropHeight,
            this.currentCropWidth, //largura
            45, //altura
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        )
        
        if(this.in_battle){
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
        }
    }

    update(){
        this.count++
        if (this.count==10 || this.count==20 || this.count==30 || this.count==40){
            this.frames++
        }

        if(!this.in_patrol && !this.in_battle){
            this.frames = 0
            this.count = 0
        }

        if(this.frames > 3){            
            this.frames = 0
            this.count = 0
        }
        
        if(this.hp < this.max_hp){
            this.hp += 0.01
        }

        // if(this.sp < this.max_sp){
        //     this.sp += 0.01
        // }

        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

function enemy_action(enemy){
        distance_x = Math.abs(player.position.x - enemy.position.x)
        distance_y = Math.abs(player.position.y - enemy.position.y)

        if(enemy.attack_wait > 0){
            enemy.attack_wait -= 1
        }

        enemy.in_patrol_time+=1
        if(enemy.in_patrol_time>1000){
            enemy.in_patrol_time = 0
            enemy.in_patrol = false
        }

        if(!enemy.in_battle){
            if(enemy.patrol_time_wait <= 0){

                if(!enemy.in_patrol){
                    enemy.in_patrol = true   
                    enemy.patrol_x = Math.round(enemy.position.x + random_patrol() )
                    enemy.patrol_y = Math.round(enemy.position.y + random_patrol() )   
                    if(enemy.patrol_x > background.width - enemy.width){
                        enemy.patrol_x = background.width - enemy.width
                    }
                    if(enemy.patrol_x < 0){
                        enemy.patrol_x = 0
                    }
                    if(enemy.patrol_y > background.height - enemy.height){
                        enemy.patrol_y = background.width - enemy.height
                    }
                    if(enemy.patrol_y < 0){
                        enemy.patrol_y = 0
                    }
                }

                //patrol left/right
                if(enemy.patrol_x != Math.round(enemy.position.x) 
                    ){
                    if(enemy.patrol_x >= enemy.position.x){
                        enemy.position.x += enemy.speed
                        enemy.side = 'right'                                          
                        //console.log('right:'+enemy.position.x)
                        enemy.currentCropHeight = 46*1
                    }else{
                        enemy.position.x -= enemy.speed                        
                        enemy.side = 'left'  
                        //console.log('left:'+enemy.position.x) 
                        enemy.currentCropHeight = 46*2
                    }  
                }
        
                //patrol down/up
                if(enemy.patrol_y != Math.round(enemy.position.y) 
                    ){
                    if(enemy.patrol_y >= enemy.position.y){
                        enemy.position.y += enemy.speed                       
                        enemy.side = 'down'  
                        //console.log('down:'+enemy.position.y)                        
                        enemy.currentCropHeight = 46*0
                    }else{
                        enemy.position.y -= enemy.speed                       
                        enemy.side = 'up'  
                        //console.log('up:'+enemy.position.y)                        
                        enemy.currentCropHeight = 46*3
                    } 
                }                

                if(enemy.patrol_x == Math.round(enemy.position.x) && enemy.patrol_y == Math.round(enemy.position.y)){                                                   
                    enemy.patrol_time_wait = 1000                    
                    enemy.in_patrol = false  
                }

            }else{
                enemy.patrol_time_wait = enemy.patrol_time_wait-4
            }
        }else{
            enemy.patrol_time_wait = 1000  
            enemy.patrol_x = 0
            enemy.patrol_y = 0              
            enemy.in_patrol = false 
        }

        if(
            ((player.position.x > enemy.position.x) 
            ||(enemy.position.x > player.position.x) 
            ||(player.position.y > enemy.position.y) 
            || (enemy.position.y > player.position.y))
            && distance_x < enemy.targetRange
            && distance_y < enemy.targetRange
        ){
            enemy.in_battle = true 
        }else{
            enemy.in_battle = false 
        }

        //follow right
        if(player.position.x > enemy.position.x + enemy.width 
            //&& player.position.x - (enemy.position.x + enemy.width) < 100
            && distance_x < enemy.targetRange
            && distance_y < enemy.targetRange
            ){
            enemy.position.x += enemy.speed
            enemy.side = 'right'               
            enemy.currentCropHeight = 46*1  

        //follow left
        }else if(enemy.position.x > player.position.x + player.width
            //&& (enemy.position.x) - player.position.x - player.width < 100
            && distance_x < enemy.targetRange
            && distance_y < enemy.targetRange
            ){
            enemy.position.x -= enemy.speed
            enemy.side = 'left'  
            enemy.currentCropHeight = 46*2
        }

        //follow down
        if(player.position.y > enemy.position.y + enemy.height 
            //&& player.position.y - (enemy.position.x + enemy.height) < 100
            && distance_y < enemy.targetRange
            && distance_x < enemy.targetRange
            ){
            enemy.position.y+= enemy.speed
            enemy.side = 'down'                       
            enemy.currentCropHeight = 46*0

        //follow up
        }else if(enemy.position.y > player.position.y + player.height
            //&& (enemy.position.y) - player.position.y - player.height < 100
            && distance_y < enemy.targetRange
            && distance_x < enemy.targetRange 
            ){
            enemy.position.y-= enemy.speed
            enemy.side = 'up'                       
            enemy.currentCropHeight = 46*3
        }

        if (player.position.x < enemy.position.x + enemy.width &&
            player.position.x + player.width > enemy.position.x &&
            player.position.y < enemy.position.y + enemy.height &&
            player.position.y + player.height > enemy.position.y &&
            enemy.attack_wait <= 0) {

            //console.log("enemy attack")

            enemy.attack_wait = 60
            
            switch (enemy.side){
                case 'up':                        
                    damage = new Damage({x : enemy.position.x, y : enemy.position.y, owner_id : enemy.id, owner : 'cpu', side : 'up'}); 
                    damages.push(damage)                   
                    enemy.currentCropHeight = 46*3
                break

                case enemy.side = 'down':
                    damage = new Damage({x : enemy.position.x, y : enemy.position.y, owner_id : enemy.id, owner : 'cpu', side : 'down'}); 
                    damages.push(damage)                   
                    enemy.currentCropHeight = 46*0
                break

                case enemy.side = 'left':
                    damage = new Damage({x : enemy.position.x, y : enemy.position.y, owner_id : enemy.id, owner : 'cpu', side : 'left'}); 
                    damages.push(damage)
                            
                    enemy.currentCropHeight = 46*2
                break

                case enemy.side = 'right':
                    damage = new Damage({x : enemy.position.x, y : enemy.position.y, owner_id : enemy.id, owner : 'cpu', side : 'right'}); 
                    damages.push(damage)
                            
                    enemy.currentCropHeight = 46*1  
                break                    
            }
        }

        // //cima para baixo
        // if(player.position.y + player.height <= enemy.position.y + enemy.height
        //     && player.position.y + player.height >= enemy.position.y

        //     && player.position.x + player.width >= enemy.position.x
        //     && player.position.x <= enemy.position.x + enemy.width
        //     && keys.down.pressed){
                
        //     player.velocity.y = 0
        // }
        // //baixo para cima
        // if(player.position.y <= enemy.position.y + enemy.height
        //     && player.position.y >= enemy.position.y
            
        //     && player.position.x + player.width >= enemy.position.x
        //     && player.position.x <= enemy.position.x + enemy.width
        //     && keys.up.pressed){
        //     player.velocity.y = 0
        // }

        // //esquerda para direita
        // if(player.position.x + player.width <= enemy.position.x + enemy.width && 
        //     player.position.x + player.width >= enemy.position.x

        //     && player.position.y + player.height >= enemy.position.y
        //     && player.position.y <= enemy.position.y + enemy.height
        //     && keys.right.pressed){
        //     player.velocity.x = 0
        // }

        // //direita para esquerda
        // if(player.position.x <= enemy.position.x + enemy.width
        //     && player.position.x >= enemy.position.x
            
        //     && player.position.y + player.height >= enemy.position.y
        //     && player.position.y <= enemy.position.y + enemy.height
        //     && keys.left.pressed
        //     ){
        //     player.velocity.x = 0
        // }
}