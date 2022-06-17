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

function square_colision_area(a, b){
    if(
        a.position.x < b.position.x + b.width &&
        a.position.x + a.width > b.position.x &&
        a.position.y < b.position.y + b.height &&
        a.position.y + a.height > b.position.y
    ){
        return true
    }

    return false
}

function animate(){

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
        enemy.update()
    })      

    if(player.attack_wait > 0){
        player.attack_wait -= 1
    }

    if(player.power_attack_wait > 0){
        player.power_attack_wait -= 1
    }
    
    damages.forEach(damage => {
        damage_action(damage)  
        damage.update()    
    })
    
    padLoop()
    keypad_loop()    

    enemies.forEach(enemy =>{        
        enemy_action(enemy)
    }) 

    enemies = enemies.filter(enemy => enemy.hp > 0)
    
    player.update()
    
    displays.forEach(display => {
        display.draw()
        display.time -= 1
        if(display.time <= 0){
            displays = displays.filter(display => display.time > 0)
        }
    })

}

player.draw()

animate()


