import { LightningElement } from 'lwc';

export default class DiytemplateLooping extends LightningElement {
    leadName='';
    leadSource='';
    annualRevenue='';
    email='';
    leadList=[];
    errMessage;
    displayClicked='';
    handleChange(event){
            if(event.target.label == "Lead Name"){
                this.leadName = event.target.value;
            } 
            if(event.target.label == "Lead Source"){
                this.leadSource = event.target.value;
            }
            if(event.target.label == "Annual Revenue"){
                this.annualRevenue = event.target.value;
            }
            if(event.target.label == "Email"){
                this.email = event.target.value;
            }
        }
        
    handleButtonClick(event){
        if(event.target.label=='Add'){
            if(!this.leadName || !this.leadSource || !this.annualRevenue || !this.email){
                this.errMessage = 'Please fill all the fields';
                console.log(this.errMessage);
            }
            else{
                this.errMessage = '';
                this.leadList.push({leadName:this.leadName,leadSource:this.leadSource,annualRevenue:this.annualRevenue,email:this.email});
                    console.log(this.leadList);
                    this.template.querySelectorAll('lightning-input').forEach(element => {
                        element.value='';
                    });
                    this.leadName='';
                    this.leadSource='';
                    this.annualRevenue='';
                    this.email='';
                
            }
        } 
        if(event.target.label=='Clear'){
            this.template.querySelectorAll('lightning-input').forEach(element => {
                element.value='';
            });
        }
        if(event.target.label=='Display'){
            this.errMessage = '';
            if(this.leadList.length>0){
                this.template.querySelectorAll('lightning-input').forEach(element => {
                    element.value='';
                });
                this.displayClicked=true;
            }
            else{
                this.errMessage = 'Please add atleast one lead';
            }
        }
}
get checkError(){
    return (this.errMessage);
}
}