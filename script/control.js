let lastKey

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

window.addEventListener('keydown', ({keyCode}) => {
    keyCodeDown(keyCode)    
})

window.addEventListener('keyup', ({keyCode}) => {
    keyCodeUp(keyCode)   
})

function keyCodeDown(keyCode){
    
    //console.log('keydown:'+keyCode) 
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

        case 97:
            if(!keys.attack.pressed && player.attack_wait == 0){
                keys.attack.pressed = true      
                lastKey = 'attack'
                player.isAttack = true
                //console.log('keydown:'+keyCode)

                player.attack_wait = player.attack_speed

                switch (player.currentSprite.src){
                    case player.sprites.stand.up.src:                        
                        damage = new Damage({x : player.position.x, y : player.position.y, owner_id : 'p1', owner : 'player', side : 'up'}); 
                        //damage.currentSprite = damage.sprites.up
                        damages.push(damage)                        

                        weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p1', type : 'sword', side : 'up'})
                        weapons.push(weapon)
                    break

                    case player.sprites.stand.down.src:
                        damage = new Damage({x : player.position.x, y : player.position.y, owner_id : 'p1', owner : 'player', side : 'down'}); 
                        //damage.currentSprite = damage.sprites.down
                        damages.push(damage)

                        weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p1', type : 'sword', side : 'down'})
                        weapons.push(weapon)
                    break

                    case player.sprites.stand.left.src:
                        damage = new Damage({x : player.position.x, y : player.position.y, owner_id : 'p1', owner : 'player', side : 'left'}); 
                        //damage.currentSprite = damage.sprites.left
                        damages.push(damage)

                        weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p1', type : 'sword', side : 'left'})
                        weapons.push(weapon)
                    break

                    case player.sprites.stand.right.src:
                        damage = new Damage({x : player.position.x, y : player.position.y, owner_id : 'p1', owner : 'player', side : 'right'}); 
                        //damage.currentSprite = damage.sprites.right
                        damages.push(damage)

                        weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p1', type : 'sword', side : 'right'})
                        weapons.push(weapon)
                    break                    
                }
            }
        break

        case 100:
            if(!keys.power_attack.pressed && player.power_attack_wait == 0){
                keys.power_attack.pressed = true      
                lastKey = 'power_attack'
                player.isAttack = true

                player.power_attack_wait = 150

                if(player.sp-10 <= 0){
                    return 
                }

                if(player.sp <= 0){
                    player.sp = 0
                }else{
                    player.sp -= 10
                }

                switch (player.currentSprite.src){
                    case player.sprites.stand.up.src:                        
                        damage = new Damage({x : player.position.x, y : player.position.y, owner_id : 'p1', owner : 'player', type : 'power_blade', side : 'up'}); 
                        //damage.currentSprite = damage.sprites.up
                        damages.push(damage)
                        
                        weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p1', type : 'sword', side : 'up'})
                        weapons.push(weapon)
                    break

                    case player.sprites.stand.down.src:
                        damage = new Damage({x : player.position.x, y : player.position.y, owner_id : 'p1', owner : 'player', type : 'power_blade', side : 'down'}); 
                        //damage.currentSprite = damage.sprites.down
                        damages.push(damage)
                        
                        weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p1', type : 'sword', side : 'down'})
                        weapons.push(weapon)
                    break

                    case player.sprites.stand.left.src:
                        damage = new Damage({x : player.position.x, y : player.position.y, owner_id : 'p1', owner : 'player', type : 'power_blade', side : 'left'}); 
                        //damage.currentSprite = damage.sprites.left
                        damages.push(damage)
                        
                        weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p1', type : 'sword', side : 'left'})
                        weapons.push(weapon)
                    break

                    case player.sprites.stand.right.src:
                        damage = new Damage({x : player.position.x, y : player.position.y, owner_id : 'p1', owner : 'player', type : 'power_blade', side : 'right'}); 
                        //damage.currentSprite = damage.sprites.right
                        damages.push(damage)
                        
                        weapon = new Weapon({x : player.position.x, y : player.position.y, owner_id : 'p1', type : 'sword', side : 'right'})
                        weapons.push(weapon)
                    break                    
                }

                //console.log('keydown:'+ keyCode)
            }
        break

        case 103:
            if(!keys.defense.pressed && player.stamina>=5){
                //console.log('keydown:'+ keyCode)
                keys.defense.pressed = true  
                player.defending = true
            }
        break

        case 98:
            if(!keys.run.pressed && player.stamina>=5){
                keys.run.pressed = true  
                player.isRunning = true
            }
        break
    }
}

function keyCodeUp(keyCode){
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
    }

    if(keys.up.pressed == false && keys.down.pressed == false && keys.left.pressed == false && keys.right.pressed == false){
        player.isWalking = false
    }
}

function keypad_loop(){
    if(keys.right.pressed && (player.position.x + player.width <= background.width)){
        player.velocity.x = player.speed
        // if(keys.up.pressed || keys.down.pressed){
        //     player.velocity.x = (player.velocity.x / 10) * 7.5
        //     player.velocity.y = (player.velocity.y / 10) * 7.5
        // }
    } else if (keys.left.pressed && (player.position.x > 0)){
        player.velocity.x = -player.speed
        // if(keys.up.pressed || keys.down.pressed){
        //     player.velocity.x = (player.velocity.x / 10) * 7.5
        //     player.velocity.y = (player.velocity.y / 10) * 7.5
        // }
    }else{
        player.velocity.x = 0
    }

    if (keys.up.pressed && (player.position.y > 0)){
        player.velocity.y = -player.speed
        // if(keys.right.pressed || keys.left.pressed){
        //     player.velocity.x = (player.velocity.x / 10) * 7.5
        //     player.velocity.y = (player.velocity.y / 10) * 7.5
        // }
    } else if (keys.down.pressed && (player.position.y + player.height <= background.height)){
        player.velocity.y = player.speed  
        // if(keys.right.pressed || keys.left.pressed){
        //     player.velocity.x = (player.velocity.x / 10) * 7.5
        //     player.velocity.y = (player.velocity.y / 10) * 7.5
        // }     
    }else{
        player.velocity.y = 0
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