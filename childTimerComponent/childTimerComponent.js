import { api, LightningElement } from 'lwc';

export default class ChildTimerComponent extends LightningElement {
timerId;
Seconds=0;
Minutes=0;
Hours=0;
  @api handleStart() {
    this.timerId=setInterval(()=>{
      this.Seconds++;
      if(this.Seconds>59){
        this.Seconds=0;
        this.Minutes++;
      }
      if(this.Minutes>59){
        this.Minutes=0;
        this.Hours++;
      }
      this.Hours=String(this.Hours).padStart(2, "0");
      this.Minutes=String(this.Minutes).padStart(2, "0");
      this.Seconds=String(this.Seconds).padStart(2, "0");
      this.template.querySelector(".timer").innerText=`${this.Hours}:${this.Minutes}:${this.Seconds}`;  
      
    },1000);
  }
  @api handleStop(){
    clearInterval(this.timerId);
  }
  @api handleReset(){
    clearInterval(this.timerId);
    this.Seconds=0;
    this.Minutes=0;
    this.Hours=0;
    this.template.querySelector(".timer").innerText=`00:00:00`; 
  }
  
}