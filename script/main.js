const background = document.getElementById('background')
const context = background.getContext('2d')

background.width = 800
background.height = 800

let scrollOffset = 0

const perfectFrameTime = 1000 / 60;
let deltaTime = 0;
let lastTimestamp = 0;

var damages = new Array()
var displays = new Array()
var player = new Player('p1', lastTimestamp, 350, 700)
var player2 = null
var grounds = new Array()
var weapons = new Array()

const huds = [
    new Hud({
        id : 'p1'
    }),
    new Hud({
        id : 'p2'
    })
]

var enemies = [
    //G1 left
    new Enemy({
        id : '01', type : 'thief',
        x : 50, y : 50, patrol : true, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    })
    ,
    new Enemy({
        id : '02', type : 'thief',
        x : 70, y : 50, patrol : true, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '03', type : 'thief',
        x : 70, y : 70, patrol : true, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '04', type : 'thief',
        x : 60, y : 60, patrol : true, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '05', type : 'thief',
        x : 50, y : 70, patrol : true, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    })

    ,

    //G3 right
    new Enemy({
        id : '06', type : 'thief',
        x : 650 + 25, y : 50, patrol : true, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '07', type : 'thief',
        x : 670 + 25, y : 50, patrol : true, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '08', type : 'thief',
        x : 670 + 25, y : 70, patrol : true, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    })    ,
    new Enemy({
        id : '09', type : 'thief',
        x : 660 + 25, y : 60, patrol : true, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '10', type : 'thief',
        x : 650 + 25, y : 70, patrol : true, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    })
    
    ,

    //G2 center
    new Enemy({
        id : '11', type : 'thief',
        x : 650 -280, y : 50, patrol : false, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '12', type : 'thief',
        x : 670 -280, y : 50, patrol : false, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '13', type : 'thief',
        x : 670 -280, y : 70, patrol : false, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    })    ,
    new Enemy({
        id : '14', type : 'thief',
        x : 660 -280, y : 60, patrol : false, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '15', type : 'thief',
        x : 650 -280, y : 70, patrol : false, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    })
    
    ,

    //G4 right
    new Enemy({
        id : '16', type : 'thief',
        x : 650 - 215, y : 50 + 200, patrol : false, follow : false, knock_back : false, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '17', type : 'thief',
        x : 670 - 215, y : 50 + 200, patrol : false, follow : false, knock_back : false, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '18', type : 'thief',
        x : 670 - 215, y : 70 + 200, patrol : false, follow : false, knock_back : false, lastTimestamp : lastTimestamp
    })    ,
    new Enemy({
        id : '19', type : 'thief',
        x : 660 - 215, y : 60 + 200, patrol : false, follow : false, knock_back : false, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '20', type : 'thief',
        x : 650 - 215, y : 70 + 200, patrol : false, follow : false, knock_back : false, lastTimestamp : lastTimestamp
    })

    ,

    //G5 left
    new Enemy({
        id : '21', type : 'thief',
        x : 650 - 350, y : 50 + 200, patrol : false, follow : false, knock_back : false, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '22', type : 'thief',
        x : 670 - 350, y : 50 + 200, patrol : false, follow : false, knock_back : false, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '23', type : 'thief',
        x : 670 - 350, y : 70 + 200, patrol : false, follow : false, knock_back : false, lastTimestamp : lastTimestamp
    })    ,
    new Enemy({
        id : '24', type : 'thief',
        x : 660 - 350, y : 60 + 200, patrol : false, follow : false, knock_back : false, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '25', type : 'thief',
        x : 650 - 350, y : 70 + 200, patrol : false, follow : false, knock_back : false, lastTimestamp : lastTimestamp
    })

    ,

    new Enemy({
        id : '26', type : 'thief_master',
        x : 0, y : 0, patrol : false, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    }),
    new Enemy({
        id : '27', type : 'thief_master',
        x : 800 - 45, y : 0, patrol : false, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    })

    ,

    new Enemy({
        id : '28', type : 'thief',
        x : 400-22, y : 300, patrol : true, follow : true, knock_back : true, lastTimestamp : lastTimestamp
    })
]

const platforms = [
    new Platform({
        x : 42*0, y : 200, cropWidth : 0, cropHeight : 0
    }), 
    new Platform({
        x : 42*1, y : 200, cropWidth : 0, cropHeight : 0
    }), 
    new Platform({
        x : 42*2, y : 200, cropWidth : 0, cropHeight : 0
    }), 
    new Platform({
        x : 42*3, y : 200, cropWidth : 0, cropHeight : 0
    }), 
    new Platform({
        x : 42*4, y : 200, cropWidth : 0, cropHeight : 0
    }), 
    new Platform({
        x : 42*5, y : 200, cropWidth : 0, cropHeight : 0
    }), 
    new Platform({
        x : 42*6, y : 200, cropWidth : 0, cropHeight : 0
    }), 
    new Platform({
        x : 42*7, y : 200, cropWidth : 0, cropHeight : 0
    }), 

    new Platform({
        x : 42*11, y : 200, cropWidth : 0, cropHeight : 0
    }), 
    new Platform({
        x : 42*12, y : 200, cropWidth : 0, cropHeight : 0
    }), 
    new Platform({
        x : 42*13, y : 200, cropWidth : 0, cropHeight : 0
    }), 
    new Platform({
        x : 42*14, y : 200, cropWidth : 0, cropHeight : 0
    }), 
    new Platform({
        x : 42*15, y : 200, cropWidth : 0, cropHeight : 0
    }), 
    new Platform({
        x : 42*16, y : 200, cropWidth : 0, cropHeight : 0
    }), 
    new Platform({
        x : 42*17, y : 200, cropWidth : 0, cropHeight : 0
    }), 
    new Platform({
        x : 42*18, y : 200, cropWidth : 0, cropHeight : 0
    })
    ,

    new Platform({
        x : 465+40, y : 500, cropWidth : (45*11)-14, cropHeight : (45*3)-7, spriteType : 'wood_axe'
    }),
    new Platform({
        x : 435, y : 500, cropWidth : (45*3)-6, cropHeight : (45*7)+5, spriteType : 'cutted_wood'
    }),
    new Platform({
        x : 400, y : 0, cropWidth : (45*8)-8, cropHeight : (45*6)-13, spriteType : 'grain_sack'
    }),
    new Platform({
        x : 440, y : 0, cropWidth : (45*3)-6, cropHeight : (45*7)+5, spriteType : 'cutted_wood'
    }),
    new Platform({
        x : 370, y : 0, cropWidth : (45*6)-15, cropHeight : (45*7)+8, spriteType : 'open_grain_sack'
    })
]

const roofs = [
    new Roof({
        x : 335, y : 200, cropWidth : (45*10)-3, cropHeight : (45*9)-2
    }),
    new Roof({
        x : 420, y : 200, cropWidth : (45*11)-28, cropHeight : (45*9)-2
    }),
    new Roof({
        x : 380, y : 200, cropWidth : (45*10)+9.5, cropHeight : (45*9)-2
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

function start() {    
    requestAnimationFrame(animate);
}

function animate(timestamp){

    if(player2 != null){
        if(player2.hp <= 0){        
            alert('MORREU')
            return
        }
    }

    if(player.hp <= 0){        
        alert('MORREU')
        return
    }    

    if(enemies.length <= 0){        
        alert('VENCEU')
        return
    }
    
    requestAnimationFrame(animate);
    deltaTime = (timestamp - lastTimestamp) / perfectFrameTime;
    lastTimestamp = timestamp;
    //console.log(Math.round(lastTimestamp))

    context.clearRect(0, 0, background.width, background.height)  
    context.closePath() 

    grounds.forEach(ground => {
        ground.draw()
    })
    
    platforms.forEach(platform => {
        platform.draw()  
        platform_colision(player, platform)
        if(player2 != null){
            platform_colision(player2, platform)
        }
        enemies.forEach(enemy => {
            platform_colision(enemy, platform)
        })
    })    

    enemies.sort((a,b) => a.position.y - b.position.y)

    enemies.forEach(enemy => {
        enemy.update()
    })  
    
    damages.forEach(damage => {  
        damage_action(damage)   
        damage.update() 
    })
    
    pad1Loop()
    pad2Loop()
    keypadLoop1()  
    if(player2 != null){
        keypadLoop2()  
    }  

    enemies.forEach(enemy =>{        
        enemy_action(enemy)  
    }) 

    enemies = enemies.filter(enemy => enemy.hp > 0)
    
    weapons.forEach(weapon => {
        if(weapon.side == 'up'){
            weapon.update() 
        }      
    })

    if(player2 != null){
        if(player.position.y > player2.position.y){
            player2.update()
            player.update()
        }else{
            player.update()
            player2.update()
        }  
    }else{
        player.update()
    }
      

    weapons = weapons.filter(weapon => weapon.frames <= 3)
    weapons.forEach(weapon => {
        if(weapon.side != 'up'){
            weapon.update() 
        }      
    })

    roofs.forEach(roof =>{
        roof.draw()
    })
    
    displays.forEach(display => {
        display.draw()
        display.time -= 1
        if(display.time <= 0){
            displays = displays.filter(display => display.time > 0)
        }
    }) 
    
    huds.forEach(hud =>{
        hud.draw()
    })

    var dam_c = damages.length
    context.font = "12px Arial";
    context.fillStyle = 'black';
    context.fillText('dam_c:'+dam_c,2,20);

    // var en = enemies.filter(enemy => enemy.id == '28')
    // var dam_c = damages.length
    // context.font = "12px Arial";
    // context.fillStyle = 'black';
    // context.fillText('enemy-patrol:'+ en[0].in_patrol,2,20+20);
    // context.fillText('enemy-in_patrol_time:'+ en[0].in_patrol_time,2,20+40);
    // context.fillText('enemy-patrol_time_wait:'+ en[0].patrol_time_wait,2,20+60);
}

start()


