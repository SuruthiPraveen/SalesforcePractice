import { LightningElement, track } from 'lwc';

export default class Top5ConceptsLWC extends LightningElement {
    lwcConcept=[{
        topics:'Reactivity',
        Concepts:'@track'
    },
    {
        topics:'Parent-Child Communication',
        Concepts:'@api'
    },
    {
        topics:'Child-Parent Communication',
        Concepts:'CustomEvent'
    },
    {
        topics:'LifeCycle Hooks',
        Concepts:'Constructor,ConnectedCallback, DisconnectedCallback,ErrorCallback'
    },
    {
        topics:'Event Handling',
        Concepts:'addEventListener, dispatchEvent, removeEventListener'
    },
    {
        topics:'Lightning Data Service',
        Concepts:'@wire'
    }
];
}