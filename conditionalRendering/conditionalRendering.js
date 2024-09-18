import { LightningElement } from 'lwc';

export default class ConditionalRendering extends LightningElement {
    isShoppingChosen=false;
    isReadingChosen=false;
    handleShoppingChange(event){

        this.isShoppingChosen=event.target.checked;
        this.isReadingChosen=false;
        this.template.querySelector(".readCheck").checked=false;
    }
    handleReadingChange(event){
        
        this.isReadingChosen=event.target.checked;
        this.isShoppingChosen =false;
        this.template.querySelector(".shopCheck").checked=false;
    }
}