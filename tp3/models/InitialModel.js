import { Model } from "./Model.js";

class InitialModel extends Model {
  constructor() {
    super();

    this.action ={
      left: true,
      right: false,
    }
  }

  updateMenuPanel(key, value){
    switch (key){
      case 'left': 
        this.action[key] = value;
        this.action['right'] = false;
        break
      case 'right':
        this.action[key] = value;
        this.action['left'] = false;
        break
      case 'enter':
        if(this.action['left']){
          this.state = 'game'
        }
        break
    }
    console.log(this.action);
      
  }
}

export { InitialModel };
