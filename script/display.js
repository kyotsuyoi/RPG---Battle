class Display{
    constructor({x, y, color, text}){
        this.position ={
            x,
            y
        }
        this.width = 42
        this.height = 42
        this.time = 50

        this.color = color
        this.text = text

    }

    draw(){

        context.font = "20px Arial Black";
        context.strokeStyle = 'black';
        context.fillText(this.text,this.position.x,this.position.y);

        context.font = "20px Arial Black";
        context.fillStyle = this.color;
        context.fillText(this.text,this.position.x,this.position.y);
        
        this.position.x += 1
        this.position.y -= 1
    }

    // update(){
    //     this.draw()
    // }
}