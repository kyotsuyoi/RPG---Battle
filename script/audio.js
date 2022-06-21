var MaxWebMediaPlayerCount = 0
var background_song = new sound("src/sound/35.mp3")
//var sword_sound = new sound("src/sound/sword_sound.wav")
// var sword_slash_sound = new sound("src/sound/sword_slash_sound.mp3")
// var power_sword_sound = new sound("src/sound/power_sword_sound.wav")
//var shield_sound = new sound("src/sound/shield_sound.wav")
// var rapid_blade = new sound("src/sound/rapid_blade.wav")
// var shield_grab_sond = new sound("src/sound/shield_grab_sond.wav")
var run_sound = new sound("src/sound/run_sound.wav")

function sound(src) {
    this.sound = document.createElement("audio")
    this.sound.src = src
    this.sound.setAttribute("preload", "auto")
    this.sound.setAttribute("controls", "none")
    this.sound.style.display = "none"
    document.body.appendChild(this.sound)

    this.play = function(){
        this.sound.play();       
    }
    console.log(MaxWebMediaPlayerCount)
    this.stop = function(){
        this.sound.pause()
    } 
}

function backgroundMusic(){
    background_song.play()
}

function swordSound(  ) {
    var sword_sound = new Audio("./src/sound/sword_sound.wav");
    sword_sound.play()
    sword_sound.onended = function(){
        this.currentSrc = null
        this.src = ""
        this.srcObject = null
        this.remove()
    }
}

function swordSlashSound(){
    var sword_slash_sound = new sound("./src/sound/sword_slash_sound.mp3")
    sword_slash_sound.play()
    sword_slash_sound.onended = function(){
        this.currentSrc = null
        this.src = ""
        this.srcObject = null
        this.remove()
    }
}

function shieldSound(){
    var shield_sound = new sound("src/sound/shield_sound.wav")
    shield_sound.play()
    shield_sound.onended = function(){
        this.currentSrc = null
        this.src = ""
        this.srcObject = null
        this.remove()
    }
}

function powerSwordSound(){
    var power_sword_sound = new sound("src/sound/power_sword_sound.wav")
    power_sword_sound.play()
    power_sword_sound.onended = function(){
        this.currentSrc = null
        this.src = ""
        this.srcObject = null
        this.remove()
    }
}

function rapidBladeSound(){
    var rapid_blade = new sound("src/sound/rapid_blade.wav")
    rapid_blade.play()
    rapid_blade.onended = function(){
        this.currentSrc = null
        this.src = ""
        this.srcObject = null
        this.remove()
    }
}

function shieldGrabSound(){
    var shield_grab_sound = new sound("./src/sound/shield_grab_sond.wav")
    shield_grab_sound.play()
    shield_grab_sound.onended = function(){
        this.currentSrc = null
        this.src = ""
        this.srcObject = null
        this.remove()
    }
}

function runSound(){
    //var run_sound = new sound("src/sound/run_sound.wav")
    run_sound.play()
    run_sound.onended = function(){
        this.currentSrc = null
        this.src = ""
        this.srcObject = null
        this.remove()
    }
}

function runSoundStop(){
    run_sound.stop();   
    //run_sound = new sound("src/sound/run_sound.wav")
}
