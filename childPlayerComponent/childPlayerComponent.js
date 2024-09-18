import { api, LightningElement } from 'lwc';

export default class ChildPlayerComponent extends LightningElement {
    playersCSKDetails;
    playersMIDetails;
    @api get playerdetails(){

    }
    set playerdetails(value){
        this.playersCSKDetails = value.filter(player => player.Team === 'CSK').map((player)=>({
            ...player,
            Name: player.Name.toUpperCase()
        }));
        console.log(this.playersCSKDetails);
        this.playersMIDetails = value.filter(player => player.Team === 'MI').map((player)=>({
            ...player,
            Name: player.Name.toUpperCase()
        }));
    }
}