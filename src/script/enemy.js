class Enemy{
    constructor({id, type, x, y, patrol, follow, knock_back, lastTimestamp}){
        this.position ={
            x,
            y
        }
        this.velocity={
            x : 0,
            y : 0
        }
        this.width = 32
        this.height = 32
        
        this.targetRange = 150 

        this.frameTime = 100
        this.frames = 0

        this.recoveryTime = 100     
        this.lastRecoveryTime = lastTimestamp

        this.patrol_time_wait = 1000
        this.in_patrol_time = 0
        this.patrol_x = 0
        this.patrol_y = 0
        this.in_battle = false
        this.in_patrol = false
        this.patrol = patrol //enable or disable patrol
        this.follow = follow //enable or disable follow
        this.knock_back = knock_back //enable or disable knock_back
        this.type = type   
        this.is_stun = false   
        this.stunLastTimestamp = lastTimestamp  
        this.stunTime = 0

        this.attackCoolDown = 0

        this.id = id
        this.side = 'down'

        this.sprites = {
            sprite : null         
        }

        switch(type){
            case 'thief':
                this.sprites = {
                    character : {
                        sprite : createImage('src/img/thief_male.png'),
                        cropWidth : 0,
                        width : 46,
                        height : 46
                    }
                } 
                this.attributes = {
                    power : 11,
                    agility : 7,
                    dexterity : 10,
                    vitality : 11,
                    inteligence : 5
                }                
            break

            case 'thief_master':
                this.sprites = {
                    character : {
                        sprite : createImage('src/img/thief_master_male.png'),
                        cropWidth : 0,
                        width : 32,
                        height : 45
                    }
                } 
                this.attributes = {
                    power : 12,
                    agility : 10,
                    dexterity : 18,
                    vitality : 14,
                    inteligence : 10
                }
            break
        }

        this.attributes_values = {
            max_hp : 0,
            max_sp : 0,
    
            hp : 0,
            sp : 0,
            
            attack : 0,
            defense : 0,
            flee : 0,
            
            speed : 0,
            attack_speed : 0,  
            hp_recovery : 0,    
            sp_recovery : 0   
        }

        this.attributes_values.max_hp = hp_value(this.attributes.vitality, this.attributes.power)
        this.attributes_values.max_sp = sp_value(0,0)

        this.attributes_values.hp = this.attributes_values.max_hp 
        this.attributes_values.sp = this.attributes_values.max_sp
        
        this.attributes_values.attack = attack_value(this.attributes.power, this.attributes.dexterity)
        this.attributes_values.defense = defense_value(this.attributes.vitality, this.attributes.dexterity)
        this.attributes_values.flee = flee_value(this.attributes.agility, this.attributes.dexterity)
        
        this.attributes_values.speed = speed_value(this.attributes.agility)       
        this.attributes_values.attack_speed = attack_speed_value(this.attributes.agility) 
        this.attributes_values.hp_recovery = hp_recovery(this.attributes.vitality)

        switch(type){            
            case 'thief_master':
                this.attributes_values.max_hp *=2
                this.attributes_values.max_sp *=2
            break
        }

        this.currentSprite = this.sprites.character.sprite
        this.currentCropWidth = 46
        this.currentCropHeight = 0
    }

    draw(){
        //area
        // context.fillStyle = '#ff000055'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)

        this.center_x = (this.position.x + this.width/2) - (this.sprites.character.width/2)
        this.center_y = (this.position.y + this.height - this.sprites.character.height)

        //draw character
        context.drawImage(          
            this.currentSprite, 
            this.currentCropWidth * this.frames, //corte no eixo x
            this.currentCropHeight, //corte no eixo y
            this.sprites.character.width, //largura do corte
            this.sprites.character.height, //altura do corte
            this.center_x, 
            this.center_y,
            this.sprites.character.width,
            this.sprites.character.height
        )
        
        if(this.in_battle){
            // var display = new Display({x : this.position.x + this.width/2, y : this.position.y + this.height+8, color : 'black', text : Math.round(this.hp), type : 'hp'})
            // displays.push(display)

            var bar_width = 40
            var center_x = (this.position.x + this.width/2) - (bar_width/2)
            
            //HP bar
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
    }

    update(){

        if(lastTimestamp - this.frameTime > this.lastTimestamp){
            this.frames++            
            this.lastTimestamp = lastTimestamp
        }

        if(!this.in_patrol && !this.in_battle){
            this.frames = 0          
            this.lastTimestamp = lastTimestamp
        }

        if(this.frames > 3){            
            this.frames = 0
            this.lastTimestamp = lastTimestamp
        }   
        
        if(lastTimestamp - this.recoveryTime > this.lastRecoveryTime){
            
            if(this.attributes_values.hp < this.attributes_values.max_hp && this.attributes_values.hp > 0){
                this.attributes_values.hp += this.attributes_values.hp_recovery
            }

            if(this.attackCoolDown > 0){
                this.attackCoolDown -= 1
            }

            this.lastRecoveryTime = lastTimestamp
        }

        //this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

function enemy_action(enemy){
    if(enemy.stunTime > 0){
        if(lastTimestamp - 500 > enemy.stunLastTimestamp){   
            enemy.stunTime -= 1
            enemy.lastTimestamp = lastTimestamp
        }
        return
    }

    distance_x = Math.abs(player.position.x - enemy.position.x)
    distance_y = Math.abs(player.position.y - enemy.position.y)

    if(player2 != null){
        distance_x_2 = Math.abs(player2.position.x - enemy.position.x)
        distance_y_2 = Math.abs(player2.position.y - enemy.position.y)
    }

    var p1_battle = false
    var p2_battle = false

    if(
        ((player.position.x > enemy.position.x) 
        ||(enemy.position.x > player.position.x) 
        ||(player.position.y > enemy.position.y) 
        || (enemy.position.y > player.position.y))
        && distance_x < enemy.targetRange
        && distance_y < enemy.targetRange
    ){
        p1_battle = true 
    }else{
        p1_battle = false 
    }

    if(player2 != null){
        if(
            ((player2.position.x > enemy.position.x) 
            ||(enemy.position.x > player2.position.x) 
            ||(player2.position.y > enemy.position.y) 
            || (enemy.position.y > player2.position.y))
            && distance_x_2 < enemy.targetRange
            && distance_y_2 < enemy.targetRange
        ){
            p2_battle = true 
        }else{
            p2_battle = false 
        }
    }    

    if(p1_battle && p2_battle){
        if(distance_x + distance_y < distance_x_2 + distance_y_2 && enemy.in_battle){  
            hunt(enemy, player, distance_x, distance_y)            
            attack(enemy, player)
        }else{
            hunt(enemy, player2, distance_x_2, distance_y_2)
            attack(enemy, player2)
        }
        enemy.in_battle = true

    }else if(p1_battle && !p2_battle){
            hunt(enemy, player, distance_x, distance_y)
            attack(enemy, player)            
            enemy.in_battle = true

    }else if(!p1_battle && p2_battle){
            hunt(enemy, player2, distance_x_2, distance_y_2)
            attack(enemy, player2)            
            enemy.in_battle = true

    }else{
            enemy.in_battle = false
    }     
    
    patrol(enemy)
}

function patrol(enemy){
    if(!enemy.patrol){
        return
    }
    if(enemy.in_battle){
        enemy.patrol_time_wait = 1000              
        enemy.in_patrol = false 
    }  
    
    if(!enemy.in_patrol && enemy.patrol_time_wait > 0){
        enemy.patrol_time_wait = enemy.patrol_time_wait-5
        return
    }    

    if(!enemy.in_patrol){
        enemy.in_patrol = true    
        enemy.patrol_x = enemy.position.x + random_patrol()
        enemy.patrol_y = enemy.position.y + random_patrol()   
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
        //console.log('patrol')
    }else{
        if((Math.round(enemy.patrol_x) == Math.round(enemy.position.x))
            && (Math.round(enemy.patrol_y) == Math.round(enemy.position.y))
            ){                                                   
            enemy.patrol_time_wait = 1000                    
            enemy.in_patrol = false               
            enemy.in_patrol_time = 0 
            return          
        }

        if(enemy.in_patrol_time>=500){
            enemy.in_patrol_time = 0
            enemy.in_patrol = false
        }
        enemy.in_patrol_time+=1

        //patrol left/right
        if(Math.round(enemy.patrol_x) != Math.round(enemy.position.x)){
            if(enemy.patrol_x >= enemy.position.x){
                if(enemy.position.x + enemy.attributes_values.speed > enemy.patrol_x){
                    enemy.position.x = enemy.patrol_x
                }else{
                    enemy.position.x += enemy.attributes_values.speed
                }
                enemy.side = 'right'                                          
                //console.log('right:'+enemy.position.x)
                enemy.currentCropHeight = 46*1
            }else{
                enemy.position.x -= enemy.attributes_values.speed                        
                enemy.side = 'left'  
                //console.log('left:'+enemy.position.x) 
                enemy.currentCropHeight = 46*2
            }  
        }

        //patrol down/up
        if(Math.round(enemy.patrol_y) != Math.round(enemy.position.y)){
            if(enemy.patrol_y >= enemy.position.y){
                if(enemy.position.y + enemy.attributes_values.speed > enemy.patrol_y){
                    enemy.position.y = enemy.patrol_y
                }else{
                    enemy.position.y += enemy.attributes_values.speed 
                }                      
                enemy.side = 'down'  
                //console.log('down:'+enemy.position.y)                        
                enemy.currentCropHeight = 46*0
            }else{
                enemy.position.y -= enemy.attributes_values.speed                       
                enemy.side = 'up'  
                //console.log('up:'+enemy.position.y)                        
                enemy.currentCropHeight = 46*3
            } 
        }
    }
}

function hunt(enemy, player, distance_x, distance_y){    

    //follow right
    if(player.position.x > enemy.position.x + enemy.width 
        //&& player.position.x - (enemy.position.x + enemy.width) < 100
        && distance_x < enemy.targetRange
        && distance_y < enemy.targetRange
        ){
        if(enemy.follow){
            enemy.position.x += enemy.attributes_values.speed
        }
        enemy.side = 'right'               
        enemy.currentCropHeight = 46*1  

    //follow left
    }else if(enemy.position.x > player.position.x + player.width
        //&& (enemy.position.x) - player.position.x - player.width < 100
        && distance_x < enemy.targetRange
        && distance_y < enemy.targetRange
        ){
        if(enemy.follow){
            enemy.position.x -= enemy.attributes_values.speed
        }            
        enemy.side = 'left'  
        enemy.currentCropHeight = 46*2
    }

    //follow down
    if(player.position.y > enemy.position.y + enemy.height 
        //&& player.position.y - (enemy.position.x + enemy.height) < 100
        && distance_y < enemy.targetRange
        && distance_x < enemy.targetRange
        ){
        if(enemy.follow){
            enemy.position.y+= enemy.attributes_values.speed
        }
        enemy.side = 'down'                       
        enemy.currentCropHeight = 46*0

    //follow up
    }else if(enemy.position.y > player.position.y + player.height
        //&& (enemy.position.y) - player.position.y - player.height < 100
        && distance_y < enemy.targetRange
        && distance_x < enemy.targetRange 
        ){
        if(enemy.follow){
            enemy.position.y-= enemy.attributes_values.speed
        }
        enemy.side = 'up'                       
        enemy.currentCropHeight = 46*3
    }

    if(enemy.in_battle){

        if(!enemy.follow){
            return
        }

        var en_r = (enemy.position.x + enemy.width/2)
        var p_r = (player.position.x + player.width/2)

        var en_l = -(enemy.position.x + enemy.width/2)
        var p_l = -(player.position.x + player.width/2)

        var en_u = -(enemy.position.y + enemy.height/2)
        var p_u = -(player.position.y + player.height/2)

        var en_d = (enemy.position.y + enemy.height/2)
        var p_d = (player.position.y + player.height/2)

        var right = Math.round(en_r - p_r)
        var left = Math.round(en_l - p_l)
        var up = Math.round(en_u - p_u)
        var down = Math.round(en_d - p_d)
        
        // context.font = "12px Arial";
        // context.fillStyle = 'black';
        // context.fillText('right:'+ right,2,20+20);
        // context.fillText('left:'+ left,2,20+40);
        // context.fillText('up:'+ up,2,20+60);
        // context.fillText('down:'+ down,2,20+80);

        var distance = [
            { side: 'right', value: right },
            { side: 'left', value: left }
            ,
            { side: 'up', value: up },
            { side: 'down', value: down }
        ]
        //distance.sort((a,b) => a.value + b.value)

        distance.sort(function (a,b){
            if (a.value > b.value) {
                return 1;
              }
              if (a.value < b.value) {
                return -1;
              }
              return 0;
        })

        distance.sort(function (a,b){
            if (Math.abs(a.value) > Math.abs(b.value)) {
                return 1;
            }
            if (Math.abs(a.value) < Math.abs(b.value)) {
                return -1;
            }
            return 0;
        })

        var near_side = distance[0].side

        if(near_side == 'left' && (enemy.side == 'down' || enemy.side == 'up') && enemy.position.x + enemy.width /2 > player.position.x + player.width /2){
            enemy.position.x -= enemy.attributes_values.speed
        }else 
        if(near_side == 'right' && (enemy.side == 'down' || enemy.side == 'up') && enemy.position.x < player.position.x){
            enemy.position.x += enemy.attributes_values.speed
        }else
        if(near_side == 'up' && (enemy.side == 'left' || enemy.side == 'right') && enemy.position.y + enemy.height /2 > player.position.y + player.height /2){
            enemy.position.y -= enemy.attributes_values.speed
        }else
        if(near_side == 'down' && (enemy.side == 'left' || enemy.side == 'right') && enemy.position.y < player.position.y){
            enemy.position.y += enemy.attributes_values.speed
        }
    }
}

function attack(enemy, player){
    var attack_range = 42

    if (player.position.x < enemy.position.x + enemy.width + attack_range &&
        player.position.x + player.width+  attack_range > enemy.position.x &&
        player.position.y < enemy.position.y + enemy.height + attack_range &&
        player.position.y + player.height + attack_range > enemy.position.y &&
        enemy.attackCoolDown <= 0) {

        //console.log("enemy attack")

        enemy.attackCoolDown = enemy.attributes_values.attack_speed
        swordSound()
        switch (enemy.side){
            case 'up':                        
                damage = new Damage({
                    x : enemy.position.x, y : enemy.position.y, 
                    owner_id : enemy.id, owner : 'cpu', side : 'up', 
                    character_width : enemy.width, character_height: enemy.height, lastTimestamp : lastTimestamp
                }); 
                damages.push(damage)                   
                enemy.currentCropHeight = 46*3
            break

            case enemy.side = 'down':
                damage = new Damage({
                    x : enemy.position.x, y : enemy.position.y, 
                    owner_id : enemy.id, owner : 'cpu', side : 'down', 
                    character_width : enemy.width, character_height: enemy.height, lastTimestamp : lastTimestamp
                }); 
                damages.push(damage)                   
                enemy.currentCropHeight = 46*0
            break

            case enemy.side = 'left':
                damage = new Damage({
                    x : enemy.position.x, y : enemy.position.y, 
                    owner_id : enemy.id, owner : 'cpu', side : 'left', 
                    character_width : enemy.width, character_height: enemy.height, lastTimestamp : lastTimestamp
                }); 
                damages.push(damage)
                        
                enemy.currentCropHeight = 46*2
            break

            case enemy.side = 'right':
                damage = new Damage({
                    x : enemy.position.x, y : enemy.position.y, 
                    owner_id : enemy.id, owner : 'cpu', side : 'right', 
                    character_width : enemy.width, character_height: enemy.height, lastTimestamp : lastTimestamp
                }); 
                damages.push(damage)
                        
                enemy.currentCropHeight = 46*1  
            break                    
        }
    }
}

function random_patrol(){    
    val = Math.round(Math.random() * (100 - 1) + 1)
    s = Math.random() * (3 - 1) + 1
    
    if(s>2){
        return +val
    }else{
        return -val
    }
}