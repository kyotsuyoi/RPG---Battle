function attack_value(power, dexterity){
    return power + (power/2) + (dexterity/5)
}

function defense_value(vitality, dexterity){
    return  vitality + (dexterity/4)
}

function flee_value(agility, dexterity){
    return  (agility/2) + (dexterity/5)
}

function hp_value(vitality, power){
    return  100 + (vitality*10) + (power*5)
}

function sp_value(inteligence, dexterity){
    return  40 + (inteligence*6) + (dexterity*3)
}

//reverse
function attack_speed_value(agility){
    return 10 - agility/2
}

function speed_value(agility){
    return 0.5 + agility / 10
}

function attack_vs_defense(attack, dexterity, defense){
    var round = Math.round(Math.random() * (attack/(2-(dexterity/100)) - 1 + (dexterity/100)) + 1 + (dexterity/100));

    var result = attack + round - defense;  
    if(defense > attack){
        round = Math.round(Math.random() * (attack/(4-(dexterity/100)) - 1 + (dexterity/100)) + 1 + (dexterity/100));
        result = round; 
    }

    if(result <= 0){
        return 1
    }
    return Math.round(result)
}

function dexterity_vs_flee(dexterity, agility){
    var percent = Math.round(Math.random() * ((100) - 0) + 0);
    var hit = (dexterity*100/agility)/2;        
    
    //is hit?
    if(percent < hit){
        return true;
    }
    return false;
}

//power_a is attack and power_b is defense
function knock_back(damage_power, power_a, power_b){
    var result = (power_a - power_b) + damage_power
    if(result <= 0){
        return 0
    }
    return result
}

function hp_recovery(vitality){
    return 0.01 + (vitality/1000)
}

