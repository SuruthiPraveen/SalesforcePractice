import { LightningElement } from 'lwc';

export default class MyCourse extends LightningElement {
    firstName='AJ';
    lastName='Skill';
    email='aa@gmail.com';
    days=90;
    course=["Admin",'Developer','Apex','LWC'];
    courseChosen;
    QASLOT={
        Session:"9.00 AM",
        Duration:"1 HOUR"
    };
    isSlotAvailable=true;
    handleChange(event){
        this.firstName=event.target.value;
        this.courseChosen=event.target.value;
    }
    get isApexChosen(){
        if(this.courseChosen=='Apex'){
            return true;
        }
        return false;
    }
    get noOfWeeks(){
        return this.days/7;
    }
}