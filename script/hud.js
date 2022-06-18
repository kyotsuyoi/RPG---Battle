class Hud {
    constructor({id}){
        this.position = {
            x : 0,
            y : 0
        }
        this.width = 150
        this.height = 48

        this.position.x = 0 + 2
        this.position.y = 800 - this.height - 2
        
        this.sprite = createImage('img/hud_large.png')

        this.currentSprite = this.sprite
        this.currentCropWidth = 0
    }

    draw(){
        // context.fillStyle = 'blue'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)

        context.drawImage(          
            this.currentSprite, 
            0,
            0,
            150, //largura
            48, //altura
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        )        

        //HP bar
        var hp_percent = Math.round(player.hp * 100) / player.max_hp
        var bar_value = (76 * hp_percent) / 100
        if(hp_percent<=25){
            context.fillStyle = 'red'
        }else{
            context.fillStyle = 'green'
        }
        context.fillRect(this.position.x + 55, this.position.y + 6, bar_value, 6)   
        
        //HP text
        context.font = "8px Arial Black";
        context.fillStyle = 'black';
        context.fillText(Math.round(player.hp) + '/' + Math.round(player.max_hp),this.position.x + 70, this.position.y + 12);

        //SP bar
        var sp_percent = Math.round(player.sp * 100) / player.max_sp
        var bar_value = (76 * sp_percent) / 100
        context.fillStyle = '#2865c7'        
        context.fillRect(this.position.x + 55, this.position.y + 21, bar_value, 6)  
        
        //SP text
        context.font = "8px Arial Black";
        context.fillStyle = 'black';
        context.fillText(Math.round(player.sp) + '/' + Math.round(player.max_sp),this.position.x + 70, this.position.y + 27);
        
        var stamina_percent = Math.round(player.stamina * 100) / player.max_stamina
        var bar_value = (76 * stamina_percent) / 100
        if(stamina_percent<=25){
            context.fillStyle = 'orange'
        }else{
            context.fillStyle = 'yellow'
        }       
        context.fillRect(this.position.x + 55, this.position.y + 21 + 15, bar_value, 6)

        //Stamina text
        context.font = "8px Arial Black";
        context.fillStyle = 'black';
        context.fillText(Math.round(player.stamina) + '/' + Math.round(player.max_stamina),this.position.x + 70, this.position.y + 42);
        
    }
}