class Enemy{
    constructor({id, x, y}){
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

        this.frames = 0
        this.count = 0
        this.jumpCount = 0

        this.patrol_time = 1000
        this.patrol_x = 0
        this.patrol_y = 0
        this.in_battle = false
        this.in_patrol = false

        this.attack_wait = 0

        this.id = id

        this.hp = 100
        this.attack = 10
        this.defense = 5

        this.power = 5
        this.agility = 5

        this.sprites = {
            stand : {
              right : createImage('img/archer_male_2_2.png'),
              left : createImage('img/archer_male_2_4.png'),
              up : createImage('img/archer_male_2_3.png'),
              down : createImage('img/archer_male_2_1.png'),
              cropWidth : 42,
              width : this.width
            },
            run : {
              right : createImage('img/archer_male_2_2.png'),
              left : createImage('img/archer_male_2_4.png'),
              up : createImage('img/archer_male_2_3.png'),
              down : createImage('img/archer_male_2_1.png'),
              cropWidth : 42,
              width : this.width
            }
        }

        this.currentSprite = this.sprites.stand.down
        this.currentCropWidth = 42
    }

    draw(){
        // context.fillStyle = 'green'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)

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