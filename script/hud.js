class Hud {
    constructor({id}){
        this.id = id
        this.position = {
            x : 0,
            y : 0
        }
        this.width = 150
        this.height = 48

        this.position.x = 0
        this.position.y = 0
        if(id == 'p1'){
            this.position.x = 0 + 2
            this.position.y = 800 - this.height - 2
            this.face = createImage('img/knight_female_face.png')
        }

        if(id == 'p2'){
            this.position.x = 800 - this.width - 2
            this.position.y = 800 - this.height - 2
            this.face = createImage('img/knight_male_face.png')
        }
        
        this.sprite = createImage('img/hud_large.png')
        this.sprite_spell = createImage('img/hud_spell.png')

        this.currentSprite = this.sprite
        this.currentCropWidth = 0

        this.currentSpriteSpell = this.sprite_spell
        this.currentSpellCropWidth = 0
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
        
        context.drawImage(          
            this.face, 
            0,
            0,
            150, //largura
            48, //altura
            this.position.x +14, 
            this.position.y +15,
            this.width,
            this.height
        )  

        context.drawImage(          
            this.sprite_spell, 
            0,
            0,
            150, //largura
            48, //altura
            this.position.x +14 + 20, 
            this.position.y - 25,
            this.width,
            this.height
        ) 
        
        var hp = 0
        var max_hp = 0
        var sp = 0
        var max_sp = 0
        var stamina = 0
        var max_stamina = 0

        if(this.id == 'p1'){
            var hp = player.hp
            var max_hp = player.max_hp
            var sp = player.sp
            var max_sp = player.max_sp
            var stamina = player.stamina
            var max_stamina = player.max_stamina            
            var powerBladeCoolDown = player.powerBladeCoolDown
            var rapidBladeCoolDown = player.rapidBladeCoolDown
        }

        if(this.id == 'p2'){
            var hp = player2.hp
            var max_hp = player2.max_hp
            var sp = player2.sp
            var max_sp = player2.max_sp
            var stamina = player2.stamina
            var max_stamina = player2.max_stamina
            var powerBladeCoolDown = player2.powerBladeCoolDown
            var rapidBladeCoolDown = player2.rapidBladeCoolDown
        }

        //HP bar
        var hp_percent = Math.round(hp * 100) / max_hp
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
        context.fillText(Math.round(hp) + '/' + Math.round(max_hp),this.position.x + 70, this.position.y + 12);

        //SP bar
        var sp_percent = Math.round(sp * 100) / max_sp
        var bar_value = (76 * sp_percent) / 100
        context.fillStyle = '#2865c7'        
        context.fillRect(this.position.x + 55, this.position.y + 21, bar_value, 6)  
        
        //SP text
        context.font = "8px Arial Black";
        context.fillStyle = 'black';
        context.fillText(Math.round(sp) + '/' + Math.round(max_sp),this.position.x + 70, this.position.y + 27);
        
        var stamina_percent = Math.round(stamina * 100) / max_stamina
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
        context.fillText(Math.round(stamina) + '/' + Math.round(max_stamina),this.position.x + 70, this.position.y + 42);

        //Power Blade bar
        var powerBladeCoolDown_percent = Math.round(powerBladeCoolDown * 100) / 30
        var bar_value = (16 * powerBladeCoolDown_percent) / 100
        context.fillStyle = '#555555dd'        
        context.fillRect(this.position.x + 47, this.position.y - 20, bar_value, 16)  

        //Rapid Blade bar
        var rapidBladeCoolDown_percent = Math.round(rapidBladeCoolDown * 100) / 20
        var bar_value = (16 * rapidBladeCoolDown_percent) / 100
        context.fillStyle = '#555555dd'        
        context.fillRect(this.position.x + 72, this.position.y - 20, bar_value, 16) 
        
    }
}