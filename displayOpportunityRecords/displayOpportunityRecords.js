import { LightningElement, track, wire} from 'lwc';
import getAllOpportunityList from '@salesforce/apex/OpportunityHandler.getAllOpportunityList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STAGE_NAME from '@salesforce/schema/Opportunity.StageName';
import sortOpportunityList from '@salesforce/apex/OpportunityHandler.sortOpportunityList';
import searchOpportunity from '@salesforce/apex/OpportunityHandler.searchOpportunity';
import updateOpportunity from '@salesforce/apex/OpportunityHandler.updateOpportunity';

export default class DisplayOpportunityRecords extends LightningElement {
    
    opportunityList;
    oppPageList;
    sortedBy;
    sortDirection;
    searchKey;
    @track startingRecord=1;
    @track page=1;
    @track totalRecordCount;
    @track endingRecord=0;
    @track totalPage;
    @track pageSize=10;
    columnList=[
        { label: 'Opportunity Name', fieldName: 'Name',type:'text',editable:true,sortable:true},
        { label: 'Amount', fieldName: 'Amount',type:'number',editable:true,sortable:true},
        { label: 'Stage', fieldName: 'StageName',
            type: 'customPicklist',
            editable:true,
            sortable:true,
            typeAttributes:{
                options:{fieldName:'pickListOptions'},
                value:{fieldName:'StageName'},
                context:{fieldName:'Id'}}
            },
        { label: 'Close Date', fieldName: 'CloseDate',type:'date',editable:true,sortable:true},
        { label: 'Id', fieldName: 'Id',type:'text'}
    ];
    draftValues=[];
    oppRefresh;
    stageNameOptions;
    @wire(getAllOpportunityList,{pickList:'$stageNameOptions'})
    getOppList(result){
        this.oppRefresh=result;
        const { data, error } = result;
        if(data)
        {
            //this.opportunityList = data;
            this.opportunityList=data.map(x=>{
            return{
                ...x,
                pickListOptions: this.stageNameOptions
            };
            });
            console.log(this.opportunityList);
            this.totalRecordCount=this.opportunityList.length;
            this.totalPage=Math.ceil(this.totalRecordCount/this.pageSize);
            this.oppPageList=this.opportunityList.slice(0,this.pageSize);
            this.endingRecord=this.pageSize;
        }
        else if(error)
        {
            console.log(error);
        }
    }
    @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT })
    objectInfo;
    
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: STAGE_NAME })
        stageNameValues({error, data}) {
        if(data) {
            console.log(data);
            this.stageNameOptions=data.values;
            console.log(this.stageNameOptions);
        }
        else if(error) {
            console.log(error);
        }
    }
    @wire(sortOpportunityList,{sortedBy:'$sortedBy',sortedDirection:'$sortDirection'})
    sortedDataList({data,error}){
        if(data)
        {
            this.dispatchEvent(
                new ShowToastEvent({
                  title: "Sorting Opportunities",
                  message: "Opportunities sorted",
                  variant: "success"
                })
              );
            this.opportunityList=data;
            this.totalRecordCount=this.opportunityList.length;
            this.totalPage=Math.ceil(this.totalRecordCount/this.pageSize);
            this.oppPageList=this.opportunityList.slice(0,this.pageSize);
            this.endingRecord=this.pageSize;
            console.log(this.opportunityList);
        }
        else if(error)
        {
            console.log(error);
            this.dispatchEvent(
                new ShowToastEvent({
                  title: "Sorting Opportunities",
                  message: error,
                  variant: "error"
                })
              );
        }
    }
    @wire (searchOpportunity,{searchKey:'$searchKey'})
    searchDataList({data,error}){
            if(data)
            {
            this.opportunityList=data;
            this.totalRecordCount=this.opportunityList.length;
            this.totalPage=Math.ceil(this.totalRecordCount/this.pageSize);
            this.oppPageList=this.opportunityList.slice(0,this.pageSize);
            this.endingRecord=this.pageSize;
                console.log(this.opportunityList);
            }
            else if(error)
            {
                console.log(error);
            }
        }

    handleSort(event){
        this.sortedBy=event.detail.fieldName;
        this.sortDirection=event.detail.sortDirection;
        console.log(this.sortedBy);
        console.log(this.sortDirection);
    }

    handleSearch(event){
        this.searchKey=event.detail.value;
    }

    async handleSave(event){
        let records=[...event.detail.draftValues];
        console.log(records);
    this.draftValues=[];
    console.log(records);
    await updateOpportunity({oppData:records})
    .then(result=>{
        console.log('result');
        console.log(result);
        this.dispatchEvent(
            new ShowToastEvent({
              title: "Success",
              message: "Opportunities updated",
              variant: "success"
            })
          );
    })
    .catch(error=>{
        console.log('error');
        console.log(error);
        this.dispatchEvent(
            new ShowToastEvent({
              title: "Error",
              message: error,
              variant: "error"
            })
          );
    })
      await refreshApex(this.oppRefresh);

    }
    prevHandler(event){
        if(this.page>1){
            this.page=this.page-1;
            this.displayRecordsPerPage(this.page);

        }
    }

    nextHandler(event){
        if(this.page<this.totalPage && this.page!==this.totalPage){
            this.page=this.page+1;
            this.displayRecordsPerPage(this.page);
        }
    }
    displayRecordsPerPage(page){
        this.startingRecord=this.pageSize*(page-1);
        this.endingRecord=this.pageSize*page;
        this.endingRecord=(this.endingRecord>this.totalRecordCount)?this.totalRecordCount:this.endingRecord;
        this.oppPageList=this.opportunityList.slice(this.startingRecord,this.endingRecord);
        this.startingRecord=this.startingRecord+1;
    }
}