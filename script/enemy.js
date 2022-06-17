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
        this.width = 42
        this.height = 42
        this.speed = 0.6
        this.targetRange = 150 

        this.frames = 0
        this.count = 0
        this.jumpCount = 0

        this.patrol_time = 1000
        this.patrol_x = 0
        this.patrol_y = 0
        this.in_battle = false
        this.in_patrol = false

        this.attack_wait = 0

        this.id = id

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
            stand : {
              right : createImage('img/archer_male_2_2.png'),
              left : createImage('img/archer_male_2_4.png'),
              up : createImage('img/archer_male_2_3.png'),
              down : createImage('img/archer_male_2_1.png'),
              cropWidth : 42,
              width : this.width
            },
            run : {
              right : createImage('img/archer_male_2_2.png'),
              left : createImage('img/archer_male_2_4.png'),
              up : createImage('img/archer_male_2_3.png'),
              down : createImage('img/archer_male_2_1.png'),
              cropWidth : 42,
              width : this.width
            }
        }

        this.currentSprite = this.sprites.stand.down
        this.currentCropWidth = 42
    }

    draw(){
        // context.fillStyle = 'green'
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

        if(!enemy.in_battle){
            if(enemy.patrol_time <= 0){

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

                //patrulhar esquerda/direita
                if(enemy.patrol_x != Math.round(enemy.position.x) 
                    ){
                    if(enemy.patrol_x >= enemy.position.x){
                        enemy.position.x += enemy.speed
                        enemy.currentSprite = enemy.sprites.run.right                                           
                        //console.log('right:'+enemy.position.x)
                    }else{
                        enemy.position.x -= enemy.speed
                        enemy.currentSprite = enemy.sprites.run.left 
                        //console.log('left:'+enemy.position.x) 
                    }  
                }
        
                //patrulhar baixo/cima
                if(enemy.patrol_y != Math.round(enemy.position.y) 
                    ){
                    if(enemy.patrol_y >= enemy.position.y){
                        enemy.position.y += enemy.speed
                        enemy.currentSprite = enemy.sprites.stand.down 
                        //console.log('down:'+enemy.position.y)
                    }else{
                        enemy.position.y -= enemy.speed
                        enemy.currentSprite = enemy.sprites.stand.up 
                        //console.log('up:'+enemy.position.y)
                    } 
                }                

                if(enemy.patrol_x == Math.round(enemy.position.x) && enemy.patrol_y == Math.round(enemy.position.y)){                                                   
                    enemy.patrol_time = 1000                    
                    enemy.in_patrol = false  
                }

            }else{
                enemy.patrol_time = enemy.patrol_time-4
            }
        }else{
            enemy.patrol_time = 1000  
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

        //seguir direita
        if(player.position.x > enemy.position.x + enemy.width 
            //&& player.position.x - (enemy.position.x + enemy.width) < 100
            && distance_x < enemy.targetRange
            && distance_y < enemy.targetRange
            ){
            enemy.position.x += enemy.speed
            enemy.currentSprite = enemy.sprites.stand.right    

        //seguir esquerda
        }else if(enemy.position.x > player.position.x + player.width
            //&& (enemy.position.x) - player.position.x - player.width < 100
            && distance_x < enemy.targetRange
            && distance_y < enemy.targetRange
            ){
            enemy.position.x -= enemy.speed
            enemy.currentSprite = enemy.sprites.stand.left
        }

        //seguir baixo
        if(player.position.y > enemy.position.y + enemy.height 
            //&& player.position.y - (enemy.position.x + enemy.height) < 100
            && distance_y < enemy.targetRange
            && distance_x < enemy.targetRange
            ){
            enemy.position.y+= enemy.speed
            enemy.currentSprite = enemy.sprites.stand.down

        //seguir cima
        }else if(enemy.position.y > player.position.y + player.height
            //&& (enemy.position.y) - player.position.y - player.height < 100
            && distance_y < enemy.targetRange
            && distance_x < enemy.targetRange 
            ){
            enemy.position.y-= enemy.speed
            enemy.currentSprite = enemy.sprites.stand.up
        }

        if (player.position.x < enemy.position.x + enemy.width &&
            player.position.x + player.width > enemy.position.x &&
            player.position.y < enemy.position.y + enemy.height &&
            player.position.y + player.height > enemy.position.y &&
            enemy.attack_wait <= 0) {

            //console.log("enemy attack")

            enemy.attack_wait = 60
            
            switch (enemy.currentSprite.src){
                case enemy.sprites.stand.up.src:                        
                    damage = new Damage({x : enemy.position.x, y : enemy.position.y - enemy.height, owner_id : enemy.id, owner : 'cpu'}); 
                    damage.currentSprite = damage.sprites.up
                    damages.push(damage)
                break

                case enemy.sprites.stand.down.src:
                    damage = new Damage({x : enemy.position.x, y : enemy.position.y + enemy.height, owner_id : enemy.id, owner : 'cpu'}); 
                    damage.currentSprite = damage.sprites.down
                    damages.push(damage)
                break

                case enemy.sprites.stand.left.src:
                    damage = new Damage({x : enemy.position.x - enemy.width, y : enemy.position.y, owner_id : enemy.id, owner : 'cpu'}); 
                    damage.currentSprite = damage.sprites.left
                    damages.push(damage)
                break

                case enemy.sprites.stand.right.src:
                    damage = new Damage({x : enemy.position.x + enemy.width, y : enemy.position.y, owner_id : enemy.id, owner : 'cpu'}); 
                    damage.currentSprite = damage.sprites.right
                    damages.push(damage)
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