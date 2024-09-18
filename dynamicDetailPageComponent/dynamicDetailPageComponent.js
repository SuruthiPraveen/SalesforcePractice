import { api, LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import dynamicfieldvalues from '@salesforce/apex/dynamicObjectController.dynamicfieldvalues';

export default class DynamicDetailPageComponent extends LightningElement {
    @api objectApiName;
    @api recordId;
    fields=[];
    records={};
    recordsArray = [];
    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    objectinfo({data,error}){
        if(data){
            console.log('data');
            console.log(data);
            console.log('this.fields');
            this.fields=Object.keys(data.fields);
            this.fields=[...this.fields];
            console.log('this.fields');
            console.log(this.fields);
        }
        else if(error){
            console.log(error);
        }
    }
    @wire(dynamicfieldvalues, { objectName: '$objectApiName', recordId:'$recordId'})
    fieldValue({data,error}){
        if(data){
            console.log('fieldValue data');
            console.log(data);
            this.records=data;
            this.recordsArray = Object.entries(data).map(([field, value]) => ({ field, value }));
            console.log('this.records');
            console.log(this.recordsArray );
    
        }
        else if(error){
            console.log(error);
        }
    }
    
}