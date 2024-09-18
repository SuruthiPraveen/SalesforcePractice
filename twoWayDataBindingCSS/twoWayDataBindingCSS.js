import { LightningElement } from 'lwc';

export default class TwoWayDataBindingCSS extends LightningElement {
    age;
    isEligible;
    choosenStyle;

    handleChange(event){
        this.age=event.target.value;
    }
    handleClick(event){
        if(this.age>18){
            this.isEligible="Eligible";
            this.choosenStyle="backgrdGreen";
            this.age=null;
        }
        else{
            this.isEligible="Not Eligible";
            this.choosenStyle="backgrdRed";
            this.age=null;
        }
    }
}