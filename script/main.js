//import platform from './img/platform.png'

const background = document.getElementById('background')
const context = background.getContext('2d')

background.width = 800
background.height = 800

let scrollOffset = 0


var damages = new Array();
var displays = new Array();

// class Platform {
//     constructor({x, y}){
//         this.position = {
//             x,
//             y
//         }
//         this.width = 30
//         this.height = 30
//     }

//     draw(){
//         context.fillStyle = 'blue'
//         context.fillRect(this.position.x, this.position.y, this.width, this.height)
//     }
// }

const player = new Player()

var enemies = [
    new Enemy({
        id : '01',
        x : 500, y : 500
    }),
    new Enemy({
        id : '02',
        x : 700, y : 500
    })
    ,
    new Enemy({
        id : '03',
        x : 700, y : 600
    })
    ,
    new Enemy({
        id : '04',
        x : 700, y : 700
    })
    ,
    new Enemy({
        id : '05',
        x : 600, y : 600
    })
]

// const platforms = [
//     new Platform({
//         x : 200, y : 100
//     }), 
//     new Platform({
//         x : 500, y : 200
//     })
// ]

function createImage(imageSrc){
    const image = new Image()
    image.src = imageSrc
    return image
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

function animate(){
    //padLoop()
    if(player.hp <= 0){        
        alert('MORREU')
        return
    }

    if(enemies.length <= 0){        
        alert('VENCEU')
        return
    }

    requestAnimationFrame(animate)
    context.clearRect(0, 0, background.width, background.height)     
    
    // platforms.forEach(platform => {
    //     platform.draw()        
    // })    

    enemies.sort((a,b) => a.position.y - b.position.y);

    enemies.forEach(enemy => {
        enemy.draw()
    })  
    
    displays.forEach(display => {
        display.draw()
        display.time -= 1
        if(display.time <= 0){
            displays = displays.filter(display => display.time > 0)
        }
    })

    if(player.attack_wait > 0){
        player.attack_wait -= 1
    }
    
    damages.forEach(damage => {
        if(damage.time == 0){
            damages.pop(damage)
        }else{
            damage.time -= 1
            damage.draw()

            if(damage.owner == "player"){
                enemies.forEach(enemy => {
                    if (damage.position.x < enemy.position.x + enemy.width &&
                        damage.position.x + damage.width > enemy.position.x &&
                        damage.position.y < enemy.position.y + enemy.height &&
                        damage.position.y + damage.height > enemy.position.y) {

                        if(damage == enemy.lastDamage){
                            return
                        }
                        enemy.lastDamage = damage
                        
                        var result = (Math.round(Math.random() * (player.attack - 1) + 1)) //- enemy.defense

                        if(result <= 0){
                            result = 1
                        }
                        
                        enemy.hp -= result   
                        
                        display = new Display({x : enemy.position.x + enemy.width/2, y : enemy.position.y + enemy.height/2, color : 'red', text : result})
                        displays.push(display)

                        //console.log('hp:'+enemy.hp)

                        switch (player.currentSprite.src){
                            case player.sprites.stand.up.src:                        
                                enemy.position.y -= player.power + damage.power
                            break
        
                            case player.sprites.stand.down.src:
                                enemy.position.y += player.power + damage.power
                            break
        
                            case player.sprites.stand.left.src:
                                enemy.position.x -= player.power + damage.power
                            break
        
                            case player.sprites.stand.right.src:
                                enemy.position.x += player.power + damage.power
                            break                    
                        }
                    }
                })   
            }  
            
            if(damage.owner == "cpu"){
                if (damage.position.x < player.position.x + player.width &&
                    damage.position.x + damage.width > player.position.x &&
                    damage.position.y < player.position.y + player.height &&
                    damage.position.y + damage.height > player.position.y) {

                    if(damage == player.lastDamage){
                        return
                    }
                    player.lastDamage = damage
                    var enemy = enemies.find(element => element.id == damage.owner_id)   
                    
                    var result = (Math.round(Math.random() * (enemy.attack - 1) + 1)) //- enemy.defense
                    if(result <= 0){
                        result = 1
                    }
                    
                    player.hp -= result  
                    console.log('hp:'+player.hp)

                    if(player.hp <= 0){
                        return
                    }

                    switch (enemy.currentSprite.src){
                        case enemy.sprites.stand.up.src: 
                            if(player.position.y <= 0){
                                player.position.y = 0
                            }else{
                                player.position.y -= enemy.power + damage.power
                            }                      
                        break
    
                        case enemy.sprites.stand.down.src:
                            if(player.position.y + player.height >= background.height){
                                player.position.y = background.height - player.height
                            }else{
                                player.position.y += enemy.power + damage.power
                            }
                        break
    
                        case enemy.sprites.stand.left.src:
                            if(player.position.x <= 0){
                                player.position.x = 0
                            }else{
                                player.position.x -= enemy.power + damage.power
                            }
                        break
    
                        case enemy.sprites.stand.right.src:
                            if(player.position.x + player.width >= background.width){
                                player.position.x = background.width - player.width
                            }else{
                                player.position.x += enemy.power + damage.power
                            }
                        break                    
                    }
                }
            }
        }  
    })
    
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

    enemies.forEach(enemy =>{
        
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

            console.log("enemy attack")

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
    }) 

    enemies = enemies.filter(enemy => enemy.hp > 0)
    
    player.update()

}

player.draw()

animate()


