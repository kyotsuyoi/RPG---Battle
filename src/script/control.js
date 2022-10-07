let lastKey, lastKey2

const keys = {
    right : {
        pressed : false
    },
    left : {
        pressed : false
    },
    up : {
        pressed : false
    },
    down : {
        pressed : false
    },
    attack : {
        pressed : false
    },
    power_blade : {
        pressed : false
    },
    defense : {
        pressed : false
    },
    run : {
        pressed : false
    },
    rapid_blade : {
        pressed : false
    },
    cure : {
        pressed : false
    }
}

const keys2 = {
    right : {
        pressed : false
    },
    left : {
        pressed : false
    },
    up : {
        pressed : false
    },
    down : {
        pressed : false
    },
    attack : {
        pressed : false
    },
    power_blade : {
        pressed : false
    },
    defense : {
        pressed : false
    },
    run : {
        pressed : false
    },
    rapid_blade : {
        pressed : false
    },
    phanton_blade : {
        pressed : false
    }
}

window.addEventListener('keydown', ({keyCode}) => {
    keyCodeDown(keyCode)    
})

window.addEventListener('keyup', ({keyCode}) => {
    keyCodeUp(keyCode)   
})

function keyCodeDown(keyCode){
    
    backgroundMusic()
    
    //console.log('keydown:'+keyCode) 
    
    //Start Player 1 -----------------------------------
    switch (keyCode){
        
        case 38:
            if(!keys.up.pressed && !keys.down.pressed){
                keys.up.pressed = true       
                lastKey = 'up'  
                player.isWalking = true
                player.side = 'up'
                //console.log('keydown:'+keyCode)     
            }     
        break

        case 40:    
            if(!keys.down.pressed && !keys.down.pressed){        
                keys.down.pressed = true     
                lastKey = 'down'
                player.isWalking = true
                player.side = 'down'
                //console.log('keydown:'+keyCode)
            }
        break

        case 37:
            if(!keys.left.pressed && !keys.right.pressed){
                keys.left.pressed = true      
                lastKey = 'left'
                player.isWalking = true
                player.side = 'left'
                //console.log('keydown:'+keyCode)
            }
        break

        case 39:
            if(!keys.right.pressed && !keys.left.pressed){
                keys.right.pressed = true      
                lastKey = 'right'
                player.isWalking = true
                player.side = 'right'
                //console.log('keydown:'+keyCode)
            }
        break

        //attack
        case 97:
            if(!keys.attack.pressed && player.attackCoolDown <= 0){

                damage = new Damage({
                    x : player.position.x, y : player.position.y, 
                    owner_id : 'p1', owner : 'player', side : player.side, 
                    character_width : player.width, character_height: player.height, lastTimestamp : lastTimestamp
                }); 

                keys.attack.pressed = true      
                lastKey = 'attack'
                player.isAttack = true

                player.attackCoolDown = player.attributes_values.attack_speed
                swordSound()

                damages.push(damage)   
                weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p1', type : 'sword_1', side : player.side})
                weapons.push(weapon)

            }
        break

        //power_blade
        case 100:
            if(!keys.power_blade.pressed && player.powerBladeCoolDown == 0){

                damage = new Damage({
                    x : player.position.x, y : player.position.y, 
                    owner_id : 'p1', owner : 'player', type : 'power_blade', side : player.side, 
                    character_width : player.width, character_height: player.height, lastTimestamp : lastTimestamp
                }); 

                if(player.attributes_values.sp - damage.sp_value < 0){
                    return 
                }

                keys.power_blade.pressed = true      
                lastKey = 'power_blade'
                player.isAttack = true

                player.powerBladeCoolDown = spell_cooldown(damage.coolDown, player.attributes.inteligence, player.attributes.dexterity)   
                rapidBladeSound()
                powerSwordSound()             

                if(player.attributes_values.sp <= 0){
                    player.attributes_values.sp = 0
                }else{
                    player.attributes_values.sp -= damage.sp_value
                }
                 
                damages.push(damage)                
                weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p1', type : 'sword_1', side : player.side})
                weapons.push(weapon)
            }
        break

        //defend
        case 103:
            if(!keys.defense.pressed && player.attributes_values.stamina>=5){
                keys.defense.pressed = true  
                player.defending = true
                shieldGrabSound()
            }
        break

        //run
        case 98:
            if(!keys.run.pressed && player.attributes_values.stamina>=5){
                keys.run.pressed = true  
                player.isRunning = true                
                player.staminaCoolDown = 50
                runSound()
            }
        break

        //rapid_blade
        case 101:
            if(!keys.rapid_blade.pressed && player.rapidBladeCoolDown == 0){
                console.log("rapid")
                damage = new Damage({
                    x : player.position.x, y : player.position.y, 
                    owner_id : 'p1', owner : 'player', type : 'rapid_blade', side : player.side, 
                    character_width : player.width, character_height: player.height, lastTimestamp : lastTimestamp
                }); 

                if(player.attributes_values.sp - damage.sp_value < 0){
                    return 
                }

                keys.rapid_blade.pressed = true      
                lastKey = 'rapid_blade'
                player.isAttack = true

                player.rapidBladeCoolDown = spell_cooldown(damage.coolDown, player.attributes.inteligence, player.attributes.dexterity)  
                rapidBladeSound()

                if(player.attributes_values.sp <= 0){
                    player.attributes_values.sp = 0
                }else{
                    player.attributes_values.sp -= damage.sp_value
                }

                damages.push(damage)
                weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p1', type : 'sword_2', side : player.side})
                weapons.push(weapon)
            }
        break

        //cure
        case 104:
            if(!keys.cure.pressed && player.cureCoolDown == 0){
                
                console.log("cure")
                damage = new Damage({
                    x : player.position.x, y : player.position.y, 
                    owner_id : 'p1', owner : 'player', type : 'cure', side : player.side, 
                    character_width : player.width, character_height: player.height, lastTimestamp : lastTimestamp
                }); 

                if(player.attributes_values.sp - damage.sp_value < 0){
                    return 
                }

                keys.cure.pressed = true      
                lastKey = 'cure'
                player.isAttack = true

                player.cureCoolDown = spell_cooldown(damage.coolDown, player.attributes.inteligence, player.attributes.dexterity)   
                cureSound()

                if(player.attributes_values.sp <= 0){
                    player.attributes_values.sp = 0
                }else{
                    player.attributes_values.sp -= damage.sp_value
                }

                damages.push(damage)
                weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p1', type : 'sword_2', side : player.side})
                weapons.push(weapon)
            }
        break
        
    }
    //End Player 1 -----------------------------------
    
    //start
    if(keyCode == 84 && player2 == null){
        player2 = new Player('p2', lastTimestamp, 350+80, 700)        
    }

    if(player2 == null){
        return
    }

    //Start Player 2 -----------------------------------
    switch(keyCode){
        case 87:
            if(!keys2.up.pressed && !keys2.down.pressed){
                keys2.up.pressed = true       
                lastKey2 = 'up'  
                player2.isWalking = true
                player2.side = 'up'
                //console.log('keydown:'+keyCode)     
            }     
        break

        case 83:    
            if(!keys2.down.pressed && !keys2.down.pressed){        
                keys2.down.pressed = true     
                lastKey2 = 'down'
                player2.isWalking = true
                player2.side = 'down'
                //console.log('keydown:'+keyCode)
            }
        break

        case 65:
            if(!keys2.left.pressed && !keys2.right.pressed){
                keys2.left.pressed = true      
                lastKey2 = 'left'
                player2.isWalking = true
                player2.side = 'left'
                //console.log('keydown:'+keyCode)
            }
        break

        case 68:
            if(!keys2.right.pressed && !keys2.left.pressed){
                keys2.right.pressed = true      
                lastKey2 = 'right'
                player2.isWalking = true
                player2.side = 'right'
                //console.log('keydown:'+keyCode)
            }
        break

        //attack
        case 71:
            if(!keys2.attack.pressed && player2.attackCoolDown <= 0){
                  
                damage = new Damage({
                    x : player2.position.x, y : player2.position.y, 
                    owner_id : 'p2', owner : 'player2', side : player2.side, 
                    character_width : player.width, character_height: player.height, lastTimestamp : lastTimestamp
                });
                
                keys2.attack.pressed = true      
                lastKey2 = 'attack'
                player2.isAttack = true
                //console.log('keydown:'+keyCode)
                swordSound()

                player2.attackCoolDown = player2.attributes_values.attack_speed
                   
                damages.push(damage)   
                weapon = new Weapon({x : player2.position.x, y : player2.position.y, owner_id : 'p2', type : 'sword_2', side : player2.side})
                weapons.push(weapon)
            }
        break

        //power_blade
        case 89:
            if(!keys2.power_blade.pressed && player2.powerBladeCoolDown == 0){

                damage = new Damage({
                    x : player2.position.x, y : player2.position.y, 
                    owner_id : 'p2', owner : 'player2', type : 'power_blade', side : player2.side, 
                    character_width : player.width, character_height: player.height, lastTimestamp : lastTimestamp
                }); 

                if(player2.attributes_values.sp - damage.sp_value < 0){
                    return 
                }

                keys2.power_blade.pressed = true      
                lastKey2 = 'power_blade'
                player2.isAttack = true                  
                
                player2.powerBladeCoolDown = spell_cooldown(damage.coolDown, player2.attributes.inteligence, player2.attributes.dexterity)   
                rapidBladeSound()
                powerSwordSound()

                if(player2.attributes_values.sp <= 0){
                    player2.attributes_values.sp = 0
                }else{
                    player2.attributes_values.sp -= damage.sp_value
                }

                damages.push(damage)
                weapon = new Weapon({x : player2.position.x, y : player2.position.y, owner_id : 'p2', type : 'sword_2', side : player2.side})
                weapons.push(weapon)
            }
        break

        //defend
        case 85:
            if(!keys2.defense.pressed && player2.attributes_values.stamina>=5){
                //console.log('keydown:'+ keyCode)
                keys2.defense.pressed = true  
                player2.defending = true
                shieldGrabSound()
            }
        break

        //run
        case 72:
            if(!keys2.run.pressed && player2.attributes_values.stamina>=5){
                keys2.run.pressed = true  
                player2.isRunning = true
                player2.staminaCoolDown = 50
                runSound()
            }
        break

        //ghost_blade
        case 74:
            if(!keys2.rapid_blade.pressed && player2.rapidBladeCoolDown == 0){
                
                damage = new Damage({
                    x : player2.position.x, y : player2.position.y, 
                    owner_id : 'p2', owner : 'player2', type : 'ghost_blade', side : player2.side, 
                    character_width : player.width, character_height: player.height, lastTimestamp : lastTimestamp
                }); 

                if(player2.attributes_values.sp - damage.sp_value < 0){
                    return 
                }

                keys2.rapid_blade.pressed = true      
                lastKey2 = 'rapid_blade'
                player2.isAttack = true

                player2.rapidBladeCoolDown = spell_cooldown(damage.coolDown, player2.attributes.inteligence, player2.attributes.dexterity)     
                rapidBladeSound()

                if(player2.attributes_values.sp <= 0){
                    player2.attributes_values.sp = 0
                }else{
                    player2.attributes_values.sp -= damage.sp_value
                }

                damages.push(damage)
                weapon = new Weapon({x : player2.position.x, y : player2.position.y, owner_id : 'p2', type : 'sword_2', side : player2.side})
                weapons.push(weapon)
            }
        break
        
        //phanton_blade
        case 73:
            if(!keys2.phanton_blade.pressed && player2.phantonBladeCoolDown == 0){

                damage = new Damage({
                    x : player2.position.x, y : player2.position.y, 
                    owner_id : 'p2', owner : 'player2', type : 'phanton_blade', side : player2.side, 
                    character_width : player.width, character_height: player.height, lastTimestamp : lastTimestamp
                }); 

                if(player2.attributes_values.sp - damage.sp_value < 0){
                    return 
                }

                keys2.phanton_blade.pressed = true      
                lastKey2 = 'phanton_blade'
                player2.isAttack = true

                player2.phantonBladeCoolDown = spell_cooldown(damage.coolDown, player2.attributes.inteligence, player2.attributes.dexterity)      
                phantonBladeSound()            

                if(player2.attributes_values.sp <= 0){
                    player2.attributes_values.sp = 0
                }else{
                    player2.attributes_values.sp -= damage.sp_value
                }

                damages.push(damage)
                weapon = new Weapon({x : player2.position.x, y : player2.position.y, owner_id : 'p2', type : 'sword_2', side : player2.side})
                weapons.push(weapon)
            }
        break

        //End Player 2 -----------------------------------
    }
}

function keyCodeUp(keyCode){
    //console.log('keyCode up:'+keyCode)
    
    //Start Player 1 -----------------------------------
    switch (keyCode){

        case 38:
            keys.up.pressed = false
            if(keys.left.pressed == true){
                lastKey = 'left'
            }
            if(keys.right.pressed == true){
                lastKey = 'right'
            }
        break

        case 40:            
            keys.down.pressed = false  
            if(keys.left.pressed == true){
                lastKey = 'left'
            }
            if(keys.right.pressed == true){
                lastKey = 'right'
            }
        break

        case 37:
            keys.left.pressed = false  
            if(keys.up.pressed == true){
                lastKey = 'up'
            }
            if(keys.down.pressed == true){
                lastKey = 'down'
            }
        break

        case 39:
            keys.right.pressed = false 
            if(keys.up.pressed == true){
                lastKey = 'up'
            }
            if(keys.down.pressed == true){
                lastKey = 'down'
            }
        break

        case 97:
            keys.attack.pressed = false  
        break

        case 100:
            keys.power_blade.pressed = false  
        break

        case 103:
            keys.defense.pressed = false  
            player.defending = false
        break

        case 98:
            if(keys.run.pressed){                
                keys.run.pressed = false   
                player.isRunning = false
                runSoundStop()
            }
        break

        case 101:
            keys.rapid_blade.pressed = false 
        break

        case 104:
            keys.cure.pressed = false 
        break
    }
        
    if(keys.up.pressed == false && keys.down.pressed == false && keys.left.pressed == false && keys.right.pressed == false){
        player.isWalking = false
    }
    //End Player 1 -----------------------------------

    if(player2 == null){
        return
    }

    //Start Player 2 -----------------------------------
    switch(keyCode){
        case 87:
            keys2.up.pressed = false
            if(keys2.left.pressed == true){
                lastKey2 = 'left'
            }
            if(keys2.right.pressed == true){
                lastKey2 = 'right'
            }
        break

        case 83:            
            keys2.down.pressed = false  
            if(keys2.left.pressed == true){
                lastKey2 = 'left'
            }
            if(keys2.right.pressed == true){
                lastKey2 = 'right'
            }
        break

        case 65:
            keys2.left.pressed = false  
            if(keys2.up.pressed == true){
                lastKey2 = 'up'
            }
            if(keys2.down.pressed == true){
                lastKey2 = 'down'
            }
        break

        case 68:
            keys2.right.pressed = false 
            if(keys2.up.pressed == true){
                lastKey2 = 'up'
            }
            if(keys2.down.pressed == true){
                lastKey2 = 'down'
            }
        break

        case 71:
            keys2.attack.pressed = false  
        break

        case 89:
            keys2.power_blade.pressed = false  
        break

        case 85:
            keys2.defense.pressed = false  
            player2.defending = false
        break

        case 72:
            if(keys2.run.pressed){                
                keys2.run.pressed = false   
                player2.isRunning = false
                runSoundStop()
            }
        break

        case 74:
            keys2.rapid_blade.pressed = false 
        break

        case 73:
            keys2.phanton_blade.pressed = false 
        break
    }

    if(keys2.up.pressed == false && keys2.down.pressed == false && keys2.left.pressed == false && keys2.right.pressed == false){
        player2.isWalking = false
    }
    //End Player 2 -----------------------------------
}

function keypadLoop1(){
    if(keys.right.pressed && (player.position.x + player.width <= background.width)){
        player.velocity.x = player.attributes_values.speed
    } else if (keys.left.pressed && (player.position.x > 0)){
        player.velocity.x = -player.attributes_values.speed
    }else{
        player.velocity.x = 0
    }

    if (keys.up.pressed && (player.position.y > 0)){
        player.velocity.y = -player.attributes_values.speed
    } else if (keys.down.pressed && (player.position.y + player.height <= background.height)){
        player.velocity.y = player.attributes_values.speed    
    }else{
        player.velocity.y = 0
    }
}

function keypadLoop2(){
    if(keys2.right.pressed && (player2.position.x + player2.width <= background.width)){
        player2.velocity.x = player2.attributes_values.speed
    } else if (keys2.left.pressed && (player2.position.x > 0)){
        player2.velocity.x = -player2.attributes_values.speed
    }else{
        player2.velocity.x = 0
    }

    if (keys2.up.pressed && (player2.position.y > 0)){
        player2.velocity.y = -player2.attributes_values.speed
    } else if (keys2.down.pressed && (player2.position.y + player2.height <= background.height)){
        player2.velocity.y = player2.attributes_values.speed    
    }else{
        player2.velocity.y = 0
    }
}

var gamepads = {};

function gamepadHandler(event, connecting) {
    var gamepad = event.gamepad;
    // Note:
    // gamepad === navigator.getGamepads()[gamepad.index]

    if (connecting) {
        gamepads[gamepad.index] = gamepad;
        console.log('gamepad_connected')
    } else {
        delete gamepads[gamepad.index];
    }
}

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); })
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); })

function buttonPressed(b) {
    //console.log(b)
    if (typeof(b) == "object") {
        return b.pressed
    }
    return b == 1.0
}

function pad1Loop() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : [])
    if (!gamepads) {
        return
    }

    var gp = gamepads[0]
    if(gp==null)return

    //console.log(gp)

    //left
    if (buttonPressed(gp.buttons[14])) {
        keyCodeDown(37)
    }else{
        keyCodeUp(37)
    }

    if (buttonPressed(gp.axes[0])) {
        console.log('ts l right')
    }

    if (buttonPressed(gp.axes[1])) {
        console.log('ts l down')
    }

    if (buttonPressed(gp.axes[2])) {
        console.log('ts r right')
    }

    if (buttonPressed(gp.axes[3])) {
        console.log('3')
    }

    if (buttonPressed(gp.axes[4])) {
        console.log('4')
    }

    if (buttonPressed(gp.axes[5])) {
        console.log('ts r right')
    }

    if (buttonPressed(gp.axes[6])) {
        console.log('6')
    }

    if (buttonPressed(gp.axes[7])) {
        console.log('7')
    }

    if (buttonPressed(gp.axes[8])) {
        console.log('8')
    }

    if (buttonPressed(gp.axes[9])) {
        console.log('9')
    }

    //right
    if (buttonPressed(gp.buttons[15])) {
        keyCodeDown(39)
    }else{
        keyCodeUp(39)
    }

    //up
    if (buttonPressed(gp.buttons[12])) {
        keyCodeDown(38)
    } else {
        keyCodeUp(38)
    }

    //down
    if (buttonPressed(gp.buttons[13])) {
        keyCodeDown(40)
    } else {
        keyCodeUp(40)
    }

    //a
    if (buttonPressed(gp.buttons[0])) {
        keyCodeDown(98)
    }else{
        keyCodeUp(98)
    }

    //x
    if (buttonPressed(gp.buttons[2])) {
        keyCodeDown(97)
    }else{
        keyCodeUp(97)
    }

    //b
    if (buttonPressed(gp.buttons[1])) {
        keyCodeDown(101)
    } else {
        keyCodeUp(101)
    }

    //y
    if (buttonPressed(gp.buttons[3])) {
        keyCodeDown(100)
    } else {
        keyCodeUp(100)
    }

    //lb
    if (buttonPressed(gp.buttons[4])) {
        //keyCodeDown(97)
    } else {
        //keyCodeUp(97)
    }

    //rb
    if (buttonPressed(gp.buttons[5])) {
        keyCodeDown(104)
    }else{    
        keyCodeUp(104)
    }

    //lt
    if (buttonPressed(gp.buttons[6])) {
        keyCodeDown(103)
    } else {
        keyCodeUp(103)
    }

    if (buttonPressed(gp.buttons[7])) {
        
    }

    if (buttonPressed(gp.buttons[8])) {
        //console.log('b8')
    } else if (buttonPressed(gp.buttons[9])) {
        //console.log('b9')
    }

    if (buttonPressed(gp.buttons[10])) {
        //console.log('b10')
    } else if (buttonPressed(gp.buttons[11])) {
        //console.log('b11')
    }  
}

function pad2Loop() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : [])
    if (!gamepads) {
        return
    }

    var gp = gamepads[1]
    if(gp==null)return
    
    //left
    if (buttonPressed(gp.buttons[14])) {
        keyCodeDown(65)
    }else{
        keyCodeUp(65)
    }

    //right
    if (buttonPressed(gp.buttons[15])) {
        keyCodeDown(68)
    }else{
        keyCodeUp(68)
    }

    //up
    if (buttonPressed(gp.buttons[12])) {
        keyCodeDown(87)
    } else {
        keyCodeUp(87)
    }

    //down
    if (buttonPressed(gp.buttons[13])) {
        keyCodeDown(83)
    } else {
        keyCodeUp(83)
    }

    //a
    if (buttonPressed(gp.buttons[0])) {
        keyCodeDown(72)
    }else{
        keyCodeUp(72)
    }

    //x
    if (buttonPressed(gp.buttons[2])) {
        keyCodeDown(71)
    }else{
        keyCodeUp(71)
    }

    //b
    if (buttonPressed(gp.buttons[1])) {
        keyCodeDown(74)
    } else {
        keyCodeUp(74)
    }

    //y
    if (buttonPressed(gp.buttons[3])) {
        keyCodeDown(89)
    } else {
        keyCodeUp(89)
    }

    //lb
    if (buttonPressed(gp.buttons[4])) {
        //keyCodeDown(72)
    } else {
        //keyCodeUp(72)
    }

    //rb
    if (buttonPressed(gp.buttons[5])) {
        keyCodeDown(73)
    } else {
        keyCodeUp(73)
    }

    //lt
    if (buttonPressed(gp.buttons[6])) {
        keyCodeDown(85)
    } else {
        keyCodeUp(85)
    }

    //
    if (buttonPressed(gp.buttons[7])) {
        //console.log(7)
        //keyCodeDown(85)
    } else {
        //keyCodeUp(85)
    }

    //
    if (buttonPressed(gp.buttons[8])) {
        //console.log(8)
        //keyCodeDown(85)
    } else {
        //keyCodeUp(85)
    }

    //list (start)
    if (buttonPressed(gp.buttons[9])) {
        keyCodeDown(84)
    } else {
        keyCodeUp(84)
    }

    //
    if (buttonPressed(gp.buttons[10])) {
        //console.log(10)
        //keyCodeDown(85)
    } else {
        //keyCodeUp(85)
    }
}