const background = document.getElementById('background')
const context = background.getContext('2d')

background.width = 800
background.height = 800

let scrollOffset = 0

var damages = new Array();
var displays = new Array();
const player = new Player()
var grounds = new Array()

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

const platforms = [
    new Platform({
        x : 42*0, y : 200
    }), 
    new Platform({
        x : 42*1, y : 200
    }), 
    new Platform({
        x : 42*2, y : 200
    }), 
    new Platform({
        x : 42*3, y : 200
    }), 
    new Platform({
        x : 42*4, y : 200
    }), 
    new Platform({
        x : 42*5, y : 200
    }), 
    new Platform({
        x : 42*6, y : 200
    }), 
    new Platform({
        x : 42*7, y : 200
    }), 
    // new Platform({
    //     x : 42*8, y : 200
    // }), 
    // new Platform({
    //     x : 42*9, y : 200
    // }), 
    // new Platform({
    //     x : 42*10, y : 200
    // }), 
    new Platform({
        x : 42*11, y : 200
    }), 
    new Platform({
        x : 42*12, y : 200
    }), 
    new Platform({
        x : 42*13, y : 200
    }), 
    new Platform({
        x : 42*14, y : 200
    }), 
    new Platform({
        x : 42*15, y : 200
    }), 
    new Platform({
        x : 42*16, y : 200
    }), 
    new Platform({
        x : 42*17, y : 200
    }), 
    new Platform({
        x : 42*18, y : 200
    })
]

function gound_construct_x(y, fold){
    var count = 0
    while(count <= fold){
        var ground = new Ground({
            x : 45*count, y : y
        })
        grounds.push(ground)
        count++
    }
}

gound_construct_x(0,17)
gound_construct_x(45,17)
gound_construct_x(90,17)
gound_construct_x(90+45,17)
gound_construct_x(90+45+45,17)

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
    context.closePath() 

    grounds.forEach(ground => {
        ground.draw()
    })
    
    platforms.forEach(platform => {
        platform.draw()  
        platform_colision(player, platform)
        enemies.forEach(enemy => {
            platform_colision(enemy, platform)
        })
    })    

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


