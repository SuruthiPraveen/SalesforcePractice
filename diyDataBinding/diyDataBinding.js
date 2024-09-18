import { LightningElement } from 'lwc';

export default class DiyDataBinding extends LightningElement {
    choosenStyle;
    styleEntered;
    handleChange(event){
        this.styleEntered=event.target.value;
    }
    handleClick(event){
        if(this.styleEntered=='blue'){
            this.choosenStyle="backBlue";
        }
        if(this.styleEntered=='bold'){
            this.choosenStyle="fontBold";
        }
        if(this.styleEntered=='italic'){
            this.choosenStyle="fontItalic";
        }
        
    }
}