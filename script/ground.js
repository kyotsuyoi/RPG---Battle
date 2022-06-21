class Ground {
    constructor({x, y}){
        this.position = {
            x,
            y
        }
        this.width = 45
        this.height = 45
        
        this.sprite = createImage('src/img/path_and_object.png')

        this.currentSprite = this.sprite
        this.currentCropWidth = 0
    }

    draw(){
        // context.fillStyle = 'blue'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)

        context.drawImage(          
            this.currentSprite, 
            45*9,
            45*3,
            45, //largura
            45, //altura
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        )
    }
}