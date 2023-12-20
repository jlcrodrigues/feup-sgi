class MainMenu {
    constructor(){
        this.playPosition = -1
        this.exitPosition = 1

        this.selected = this.playPosition        
    }

    processInput(action) {
        switch (action){
            case 'left': this.selected = this.playPosition; break;
            case 'right': this.selected = this.exitPosition; break;
            case 'enter': if (this.selected == -1){ console.log("here"); return 'play';}
        }
        return 
    }
}

export { MainMenu };
