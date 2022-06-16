class Damage{
    constructor({x, y, owner_id, owner}){
        this.position ={
            x,
            y
        }
        this.velocity={
            x : 0,
            y : 0
        }
        this.width = 42
        this.height = 42
        this.speed = 0.6
        this.targetRange = 150 

        this.lastDamage = null

        this.frames = 0
        this.count = 0
        this.time = 10

        this.owner = owner
        this.owner_id = owner_id

        this.attack_wait = 10

        this.power = 10

        this.sprites = {
            right : createImage('img/sword_attack_right.png'),
            left : createImage('img/sword_attack_left.png'),
            up : createImage('img/sword_attack_up.png'),
            down : createImage('img/sword_attack_down.png'),
            cropWidth : 42,
            width : this.width            
        }

        this.currentSprite = null
        this.currentCropWidth = 42
    }

    draw(){
        //context.fillStyle = 'red'
        //context.fillRect(this.position.x, this.position.y, this.width, this.height)

        context.drawImage(          
            this.currentSprite, 
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth, //largura
            42, //altura
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        )
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}