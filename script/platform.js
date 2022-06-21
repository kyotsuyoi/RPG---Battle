class Platform {
    constructor({x, y, cropWidth, cropHeight, spriteType}){
        this.position = {
            x,
            y
        }
        this.width = 42
        this.height = 42        

        this.sprite = createImage('src/img/wall01.png')
        this.spriteType = spriteType

        switch(spriteType){
            case 'wood_axe':
                this.width = 32
                this.height = 32
                this.sprite = createImage('src/img/path_and_object.png')
            break

            case 'cutted_wood':
                this.width = 32
                this.height = 32
                this.sprite = createImage('src/img/path_and_object.png')
            break

            case 'grain_sack':
                this.width = 32
                this.height = 32
                this.sprite = createImage('src/img/path_and_object.png')
            break
            
            case 'open_grain_sack':
                this.width = 32
                this.height = 32
                this.sprite = createImage('src/img/path_and_object.png')
            break
        }

        this.currentSprite = this.sprite
        this.cropWidth = cropWidth
        this.cropHeight = cropHeight
    }

    draw(){
        // context.fillStyle = 'yellow'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)

        context.drawImage(          
            this.currentSprite, 
            this.cropWidth,
            this.cropHeight,
            this.width, //largura
            this.height, //altura
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

    var touch = up && down && left && right
    if(touch && object.side == 'up'){
        object.position.y+= object.speed 
    }
    if(touch && object.side == 'down'){
        object.position.y-= object.speed 
    }
    if(touch && object.side == 'left'){
        object.position.x+= object.speed  
    }
    if(touch && object.side == 'right'){
        object.position.x-= object.speed  
    }
    
    if(up && !up_pass && ((left && !left_pass) || (right && !right_pass))){
        if(vy < vx){
            //console.log(platform.spriteType + ':up')
            object.position.y+= object.speed        
        }
    }

    if(down && !down_pass  && ((left && !left_pass) || (right && !right_pass))){
        if(vy < vx){
            //console.log(platform.spriteType + ':down')
            object.position.y-= object.speed        
        }
    }

    if(left && !left_pass && ((up && !up_pass) || (down && !down_pass))){  
        if(vx < vy){
            //console.log(platform.spriteType + ':left')
            object.position.x+= object.speed         
        }
    }

    if(right && !right_pass && ((up && !up_pass) || (down && !down_pass))){
        if(vx < vy){
            //console.log(platform.spriteType + ':right')
            object.position.x-= object.speed            
        }
    }

}