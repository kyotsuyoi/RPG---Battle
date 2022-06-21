class Roof {
    constructor({x, y, cropWidth, cropHeight}){
        this.position = {
            x,
            y
        }
        this.width = 45
        this.height = 45
        
        this.sprite = createImage('src/img/path_and_object.png')

        this.currentSprite = this.sprite
        this.cropWidth = cropWidth
        this.cropHeight = cropHeight
    }

    draw(){
        // context.fillStyle = 'blue'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)

        context.drawImage(          
            this.currentSprite, 
            this.cropWidth,//(45*10)-3,
            this.cropHeight,//(45*9)-2,
            45, //largura
            45, //altura
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        )
    }
}