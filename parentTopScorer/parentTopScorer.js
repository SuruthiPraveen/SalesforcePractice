import { LightningElement } from 'lwc';

export default class ParentTopScorer extends LightningElement {
    playerDetails=[];
    playerName;
    score;
    team;
    addMore=false;
    topScore;

    handleChange(event){
        if(event.target.label=="Player Name"){
            this.playerName=event.target.value;
        }
        if(event.target.label=="Score"){
            this.score=event.target.value;
        }
        if(event.target.label=="Team"){
            this.team=event.target.value;
        }
        if(event.target.label=="Add More"){
            this.addMore=event.target.checked;

            console.log(this.addMore);
            if(this.addMore){
                this.playerDetails.push({
                    playerName:this.playerName,
                    score:this.score,
                    team:this.team
                });
                console.log(this.playerDetails);
            }
            this.template.querySelector(".check").checked=false;
            this.addMore=false;
            this.playerName='';
            this.score='';
            this.team='';
        } 
    }
    handleTopScorer(){
        console.log('inside top');
        this.playerDetails=this.playerDetails.sort(function(a,b){
            return b.score-a.score;
        });
        this.topScore=this.playerDetails[0];
    }
    get dispTopScorer(){
        return this.playerDetails.length>0;
    }
    
    }