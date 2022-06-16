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
    }
}

window.addEventListener('keydown', ({keyCode}) => {
    //console.log('keydown:'+keyCode)

    switch (keyCode){
        case 38:
            if(!keys.up.pressed){
                keys.up.pressed = true       
                lastKey = 'up'  
                player.isWalking = true
                //console.log('keydown:'+keyCode)     
            }     
        break

        case 40:    
            if(!keys.down.pressed){        
                keys.down.pressed = true     
                lastKey = 'down'
                player.isWalking = true
                //console.log('keydown:'+keyCode)
            }
        break

        case 37:
            if(!keys.left.pressed){
                keys.left.pressed = true      
                lastKey = 'left'
                player.isWalking = true
                //console.log('keydown:'+keyCode)
            }
        break

        case 39:
            if(!keys.right.pressed){
                keys.right.pressed = true      
                lastKey = 'right'
                player.isWalking = true
                //console.log('keydown:'+keyCode)
            }
        break

        case 97:
            if(!keys.attack.pressed && player.attack_wait == 0){
                keys.attack.pressed = true      
                lastKey = 'attack'
                player.isAttack = true
                //console.log('keydown:'+keyCode)

                player.attack_wait = 30 - player.agility

                switch (player.currentSprite.src){
                    case player.sprites.stand.up.src:                        
                        damage = new Damage({x : player.position.x, y : player.position.y - player.height, owner_id : 'p1', owner : 'player'}); 
                        damage.currentSprite = damage.sprites.up
                        damages.push(damage)
                    break

                    case player.sprites.stand.down.src:
                        damage = new Damage({x : player.position.x, y : player.position.y + player.height, owner_id : 'p1', owner : 'player'}); 
                        damage.currentSprite = damage.sprites.down
                        damages.push(damage)
                    break

                    case player.sprites.stand.left.src:
                        damage = new Damage({x : player.position.x - player.width, y : player.position.y, owner_id : 'p1', owner : 'player'}); 
                        damage.currentSprite = damage.sprites.left
                        damages.push(damage)
                    break

                    case player.sprites.stand.right.src:
                        damage = new Damage({x : player.position.x + player.width, y : player.position.y, owner_id : 'p1', owner : 'player'}); 
                        damage.currentSprite = damage.sprites.right
                        damages.push(damage)
                    break                    
                }
            }
        break
    }
})

window.addEventListener('keyup', ({keyCode}) => {
    //console.log('keyup:'+keyCode)

    switch (keyCode){
        case 38:
            keys.up.pressed = false  
        break

        case 40:            
            keys.down.pressed = false  
        break

        case 37:
            keys.left.pressed = false  
        break

        case 39:
            keys.right.pressed = false 
        break

        case 97:
            keys.attack.pressed = false  
        break
    }

    if(keys.up.pressed == false && keys.down.pressed == false && keys.left.pressed == false && keys.right.pressed == false){
        player.isWalking = false
    }
})

// var gamepads = {};

// function gamepadHandler(event, connecting) {
//   var gamepad = event.gamepad;
//   // Note:
//   // gamepad === navigator.getGamepads()[gamepad.index]

//   if (connecting) {
//     gamepads[gamepad.index] = gamepad;
//     console.log('gamepadconnected')
//   } else {
//     delete gamepads[gamepad.index];
//   }
// }

// window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
// window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);

// function buttonPressed(b) {
//   //console.log(b)
//   if (typeof(b) == "object") {
//     return b.pressed;
//   }
//   return b == 1.0;
// }

// function padLoop() {
//   var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
//   if (!gamepads) {
//     return;
//   }

//   var gp = gamepads[0];
//   if(gp==null)return
  
//   if (buttonPressed(gp.buttons[14])) {
//     console.log('left')
//     keys.left.pressed = true
//     lastKey = 'left'
//     // if(player.speed < player.maxSpeed){
//     //   player.speed+=0.2
//     // }
//   } else //if (lastKey == 'left')
//   {
//     keys.left.pressed = false
//     lastKey = 'left'
//     //player.speed=0
//   }

//   if (buttonPressed(gp.buttons[15])) {
//     console.log('right')
//     keys.right.pressed = true
//     lastKey = 'right'
//     // if(player.speed < player.maxSpeed){
//     //   player.speed+=0.2
//     // }
//   }else 
//   //if (lastKey == 'right')
//   {
//     keys.right.pressed = false
//     lastKey = 'right'
//     //player.speed=0
//   }

//   if (buttonPressed(gp.buttons[12])) {
//     console.log('up')
//     keys.up.pressed = true
//   } else {
//     keys.up.pressed = false
//   }
  
//   if (buttonPressed(gp.buttons[13])) {
//     console.log('down')
//     keys.down.pressed = true
//   } else {
//     keys.down.pressed = false
//   }

//   if (buttonPressed(gp.buttons[0])) {
//     console.log('a')
//   }else {
//   } 
  
//   if (buttonPressed(gp.buttons[2])) {
//     console.log('b2')
//   }
//   if (buttonPressed(gp.buttons[1])) {
//     console.log('b1')
//   } else if (buttonPressed(gp.buttons[3])) {
//     console.log('b3')
//   }

//   if (buttonPressed(gp.buttons[4])) {
//     console.log('lb')
//   } else {

//   }

//   if (buttonPressed(gp.buttons[5])) {
//     console.log('rb')
//     player.maxSpeed=10
//   }else{    
//     player.maxSpeed=4
//   }

//   if (buttonPressed(gp.buttons[6])) {
//     console.log('b6')
//   } else if (buttonPressed(gp.buttons[7])) {
//     console.log('b7')
//   }

//   if (buttonPressed(gp.buttons[8])) {
//     console.log('b8')
//   } else if (buttonPressed(gp.buttons[9])) {
//     console.log('b9')
//   }

//   if (buttonPressed(gp.buttons[10])) {
//     console.log('b10')
//   } else if (buttonPressed(gp.buttons[11])) {
//     console.log('b11')
//   }

  
// }