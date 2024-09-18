import { LightningElement } from 'lwc';

export default class ParentTimerComponent extends LightningElement {
clicked;
handleClick(event) {
        if(event.target.label == "Start"){
            console.log('start');
            this.clicked = "Start";
            this.template.querySelector('c-child-timer-component').handleStart();
            console.log('start');
        }
        else if(event.target.label == "Stop"){
            console.log('stop');
            this.template.querySelector('c-child-timer-component').handleStop();
            console.log('stop');
            this.clicked = "Stop"; 
        }
        else if(event.target.label == "Reset"){
            console.log('Reset');
            this.template.querySelector('c-child-timer-component').handleReset();
            console.log('stop');
            this.clicked = "Reset"; 
        }
}

}