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
    power_attack : {
        pressed : false
    },
    defense : {
        pressed : false
    },
    run : {
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
    power_attack : {
        pressed : false
    },
    defense : {
        pressed : false
    },
    run : {
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
    
    //console.log('keydown:'+keyCode) 
    switch (keyCode){

        //Start Player 1 -----------------------------------
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
                keys.attack.pressed = true      
                lastKey = 'attack'
                player.isAttack = true
                //console.log('keydown:'+keyCode)

                player.attackCoolDown = player.attack_speed

                damage = new Damage({x : player.position.x, y : player.position.y, owner_id : 'p1', owner : 'player', side : player.side}); 
                damages.push(damage)   
                weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p1', type : 'sword', side : player.side})
                weapons.push(weapon)

            }
        break

        //power_attack
        case 100:
            if(!keys.power_attack.pressed && player.powerAttackCoolDown == 0){

                if(player.sp - 10 < 0){
                    return 
                }

                keys.power_attack.pressed = true      
                lastKey = 'power_attack'
                player.isAttack = true

                player.powerAttackCoolDown = 150                

                if(player.sp <= 0){
                    player.sp = 0
                }else{
                    player.sp -= 10
                }
                     
                damage = new Damage({x : player.position.x, y : player.position.y, owner_id : 'p1', owner : 'player', type : 'power_blade', side : player.side}); 
                damages.push(damage)                
                weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p1', type : 'sword', side : player.side})
                weapons.push(weapon)
            }
        break

        //defend
        case 103:
            if(!keys.defense.pressed && player.stamina>=5){
                keys.defense.pressed = true  
                player.defending = true
            }
        break

        //run
        case 98:
            if(!keys.run.pressed && player.stamina>=5){
                keys.run.pressed = true  
                player.isRunning = true
                player.staminaCoolDown = 50
            }
        break
        //End Player 1 -----------------------------------

        //Start Player 2 -----------------------------------
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
                keys2.attack.pressed = true      
                lastKey2 = 'attack'
                player2.isAttack = true
                //console.log('keydown:'+keyCode)

                player2.attackCoolDown = player2.attack_speed
                     
                damage = new Damage({x : player2.position.x, y : player2.position.y, owner_id : 'p2', owner : 'player2', side : player2.side});
                damages.push(damage)   
                weapon = new Weapon({x : player2.position.x, y : player2.position.y, owner_id : 'p2', type : 'sword', side : player2.side})
                weapons.push(weapon)
            }
        break

        //power_attack
        case 89:
            if(!keys2.power_attack.pressed && player2.powerAttackCoolDown == 0){

                if(player2.sp - 10 < 0){
                    return 
                }

                keys2.power_attack.pressed = true      
                lastKey2 = 'power_attack'
                player2.isAttack = true

                player2.powerAttackCoolDown = 150                

                if(player2.sp <= 0){
                    player2.sp = 0
                }else{
                    player2.sp -= 10
                }

                damage = new Damage({x : player2.position.x, y : player2.position.y, owner_id : 'p2', owner : 'player2', type : 'power_blade', side : player2.side}); 
                damages.push(damage)
                weapon = new Weapon({x : player2.position.x, y : player2.position.y, owner_id : 'p2', type : 'sword', side : player2.side})
                weapons.push(weapon)
            }
        break

        //defend
        case 85:
            if(!keys2.defense.pressed && player2.stamina>=5){
                //console.log('keydown:'+ keyCode)
                keys2.defense.pressed = true  
                player2.defending = true
            }
        break

        //run
        case 72:
            if(!keys2.run.pressed && player2.stamina>=5){
                keys2.run.pressed = true  
                player2.isRunning = true
                player2.staminaCoolDown = 50
            }
        break
        //End Player 2 -----------------------------------
    }
}

function keyCodeUp(keyCode){
    //console.log('keyCode up:'+keyCode)
    switch (keyCode){

        //Start Player 1 -----------------------------------
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
            keys.power_attack.pressed = false  
        break

        case 103:
            keys.defense.pressed = false  
            player.defending = false
        break

        case 98:
            keys.run.pressed = false   
            player.isRunning = false
        break
        //End Player 1 -----------------------------------

        //Start Player 2 -----------------------------------
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
            keys2.power_attack.pressed = false  
        break

        case 85:
            keys2.defense.pressed = false  
            player2.defending = false
        break

        case 72:
            keys2.run.pressed = false   
            player2.isRunning = false
        break
        //End Player 2 -----------------------------------
    }

    if(keys.up.pressed == false && keys.down.pressed == false && keys.left.pressed == false && keys.right.pressed == false){
        player.isWalking = false
    }

    if(keys2.up.pressed == false && keys2.down.pressed == false && keys2.left.pressed == false && keys2.right.pressed == false){
        player2.isWalking = false
    }
}

function keypad_loop(){
    if(keys.right.pressed && (player.position.x + player.width <= background.width)){
        player.velocity.x = player.speed
    } else if (keys.left.pressed && (player.position.x > 0)){
        player.velocity.x = -player.speed
    }else{
        player.velocity.x = 0
    }

    if (keys.up.pressed && (player.position.y > 0)){
        player.velocity.y = -player.speed
    } else if (keys.down.pressed && (player.position.y + player.height <= background.height)){
        player.velocity.y = player.speed    
    }else{
        player.velocity.y = 0
    }

    if(keys2.right.pressed && (player2.position.x + player2.width <= background.width)){
        player2.velocity.x = player2.speed
    } else if (keys2.left.pressed && (player2.position.x > 0)){
        player2.velocity.x = -player2.speed
    }else{
        player2.velocity.x = 0
    }

    if (keys2.up.pressed && (player2.position.y > 0)){
        player2.velocity.y = -player2.speed
    } else if (keys2.down.pressed && (player2.position.y + player2.height <= background.height)){
        player2.velocity.y = player2.speed    
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
        console.log('gamepadconnected')
    } else {
        delete gamepads[gamepad.index];
    }
}

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);

function buttonPressed(b) {
    //console.log(b)
    if (typeof(b) == "object") {
        return b.pressed;
    }
    return b == 1.0;
}

function padLoop() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gamepads) {
        return;
    }

    var gp = gamepads[0];
    if(gp==null)return

    //left
    if (buttonPressed(gp.buttons[14])) {
        keyCodeDown(37)
    }else{
        keyCodeUp(37)
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

    if (buttonPressed(gp.buttons[1])) {
        console.log('b1')
    } else {

    }

    //y
    if (buttonPressed(gp.buttons[3])) {
        keyCodeDown(100)
    } else {
        keyCodeUp(100)
    }

    //lb
    if (buttonPressed(gp.buttons[4])) {
        keyCodeDown(97)
    } else {
        keyCodeUp(97)
    }

    if (buttonPressed(gp.buttons[5])) {
        console.log('rb')
        player.maxSpeed=10
    }else{    
        player.maxSpeed=4
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
        console.log('b8')
    } else if (buttonPressed(gp.buttons[9])) {
        console.log('b9')
    }

    if (buttonPressed(gp.buttons[10])) {
        console.log('b10')
    } else if (buttonPressed(gp.buttons[11])) {
        console.log('b11')
    }  
}