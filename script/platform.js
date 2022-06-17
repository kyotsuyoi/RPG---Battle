class Platform {
    constructor({x, y}){
        this.position = {
            x,
            y
        }
        this.width = 42
        this.height = 42
        
        this.sprite = createImage('img/wall01.png')

        this.currentSprite = this.sprite
        this.currentCropWidth = 0
    }

    draw(){
        // context.fillStyle = 'blue'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)

        context.drawImage(          
            this.currentSprite, 
            this.currentCropWidth * 1,
            0,
            42, //largura
            42, //altura
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        )
    }
}

function platform_colision(object, platform){

    left = object.position.x < platform.position.x + platform.width
    left_pass = object.position.x < platform.position.x
    right = object.position.x + object.width > platform.position.x
    right_pass = object.position.x > platform.position.x
    up = object.position.y < platform.position.y + platform.height
    up_pass = object.position.y < platform.position.y
    down = object.position.y + object.height > platform.position.y
    down_pass = object.position.y > platform.position.y

    var height_dif_pos = 0
    if(object.position.y < platform.position.y){
        height_dif_pos = platform.position.y - object.position.y
    }
    if(object.position.y > platform.position.y){
        height_dif_pos = object.position.y - platform.position.y
    }

    var height_dif_size = (object.height - platform.height) * -1
    var vy = object.height - height_dif_size - height_dif_pos

    var width_dif_pos = 0
    if(object.position.x < platform.position.x){
        width_dif_pos = platform.position.x - object.position.x
    }
    if(object.position.x > platform.position.x){
        width_dif_pos = object.position.x - platform.position.x
    }

    var width_dif_size = (object.width - platform.width) * -1
    var vx = object.width - width_dif_size - width_dif_pos

    if(left && !left_pass && ((up && !up_pass) || (down && !down_pass))){  
        if(vx < vy){
            //console.log('left')
                object.position.x+= object.speed
            
        }
    }

    if(right && !right_pass && ((up && !up_pass) || (down && !down_pass))){
        if(vx < vy){
            //console.log('right')
                object.position.x-= object.speed
            
        }
    }

    if(up && !up_pass && ((left && !left_pass) || (right && !right_pass))){
        if(vy < vx){
            //console.log('up')
                object.position.y+= object.speed
            
        }
    }

    if(down && !down_pass  && ((left && !left_pass) || (right && !right_pass))){
        if(vy < vx){
            //console.log('down')
                object.position.y-= object.speed
            
        }
    }
}