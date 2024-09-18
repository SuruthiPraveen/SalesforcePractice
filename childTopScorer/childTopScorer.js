import { api, LightningElement } from 'lwc';

export default class ChildTopScorer extends LightningElement {
    @api topscore;
    get displayTopScorer(){
        return this.topscore!=null;
    }
}