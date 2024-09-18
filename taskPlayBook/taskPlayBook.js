import { api, LightningElement, track, wire } from 'lwc';
import getTaskDetails from '@salesforce/apex/TaskController.getTaskDetails';
import UserId from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import userEmailFIELD from '@salesforce/schema/User.Email';
import sendEmail from '@salesforce/apex/EmailController.sendEmail';
import quoteDetails from '@salesforce/apex/QuoteController.quoteDetails';
import sendquotePDF from '@salesforce/apex/QuoteController.sendquotePDF';

export default class TaskPlayBook extends LightningElement {
    @api objectApiName;
    @api recordId;
    @track currentUserEmail;
    columnList = [
        { label: 'Quote Number', fieldName: 'QuoteNumber' },
        { label: 'Name', fieldName: 'Name' },
        { label: 'Total Price', fieldName: 'TotalPrice' },
        { label: 'Discount', fieldName: 'Discount' },
        { label: 'GrandTotal', fieldName: 'GrandTotal' }
    ];
    @track sections=[
        {
            id:1,
            title:'Introduction',
            percentageTask:0,
            steps:[
                {id:1,label:'Log a Call',isCompleted:false},
                {id:2,label:'Send Email',isCompleted:false},
                {id:3,label:'Add Text Note',isCompleted:false}
            ]
        },
        {
            id:2,
            title:'Follow up',
            percentageTask:0,
            steps:[
                {id:1,label:'Log a Call',isCompleted:false},
                {id:2,label:'Send Email',isCompleted:false},
                {id:3,label:'Add Text Note',isCompleted:false}
            ]
        },
        {
            id:3,
            title:'Actions',
            percentageTask:0,
            steps:[
                {id:1,label:'Show Quote',isCompleted:false},
                {id:2,label:'Send Drawings',isCompleted:false}
            ]
        }
    ];
    @track sendCallOrText={
        Title:'',
        RelatedTo:'',
        Subject:'',
        Comments:'',
        ObjectName:'',
        IsCompleted:false
        };
    @track sendEmail={
        Title:'',
        fromAddress:'',
        toAddress:'',
        subject:'',
        body:'',
        RelatedTo:'',
        ObjectName:''
        };
    isModalOpen=false;
    showTable=false;
    quoteData;
    selectedRows;
    quoteIds=[];
    @wire(getRecord, { recordId: UserId, fields: [userEmailFIELD]}) 
    currentUserInfo({error, data}) {
        if (data) {
            this.currentUserEmail = data.fields.Email.value;
            console.log(this.currentUserEmail);
        } else if (error) {
            console.log(error);
        }
    }
    handleClick(event){
            if(event.target.name=='Introduction' || event.target.name=='Follow up'){
                if(event.target.label=='Log a Call' || event.target.label=='Add Text Note'){
                    this.sendCallOrText.Title=event.target.name +' :: ' + event.target.label;
                    this.sendCallOrText.RelatedTo=this.recordId;
                    this.sendCallOrText.ObjectName=this.objectApiName;
                    this.sendCallOrText.Subject=(event.target.label=='Log a Call')?'Call - '+event.target.name:'Text - '+event.target.name;
                    this.isModalOpen=true;
                    console.log(this.sendCallOrText);
                    console.log(this.isModalOpen);
                }
                if(event.target.label=='Send Email'){
                    this.sendEmail.RelatedTo=this.recordId;
                    this.sendEmail.Title=event.target.name +' :: ' + event.target.label;
                    this.sendEmail.ObjectName=this.objectApiName;
                    this.sendEmail.fromAddress=this.currentUserEmail;
                    this.isModalOpen=true;
                    console.log(this.sendEmail);
                }
            }
            if(event.target.label=='Show Quote'){
                quoteDetails({accId:this.recordId})
                .then(result=>{
                    this.quoteData=result;
                    console.log(this.quoteData);
                    this.showTable=true;}
                )
                .catch(error=>{
                    console.log(error);}
                )
            }
        }
        handleCallOrTextChange(event){
            if(event.target.label=='Comments'){
                this.sendCallOrText.Comments=event.target.value;
            }
            if(event.target.label=='IsCompleted'){
                this.sendCallOrText.IsCompleted=event.target.checked;
            }
        }
        handleEmailChange(event){
            if(event.target.label=='To Address'){
                this.sendEmail.toAddress=event.target.value;
            }
            if(event.target.label=='Subject'){
                this.sendEmail.subject=event.target.value;
            }
            if(event.target.label=='Body'){
                this.sendEmail.body=event.target.value;
            }
            if(event.target.label=='IsCompleted'){
                this.sendEmail.IsCompleted=event.target.checked;
            }
        }
        handlesendCallOrTextSave(){
            let check=this.sendCallOrText.Title;
            console.log(this.sendCallOrText);
            this.isModalOpen=false;
            getTaskDetails({createTask: this.sendCallOrText})
            .then(result=>{
                console.log('Task');
                console.log(result);
                    this.sections.forEach(x => {
                        console.log('inside check');
                        if(this.sendCallOrText.Title.includes(x.title)){
                            console.log('inside checkTitle');
                            x.steps.forEach(y => {
                                if(this.sendCallOrText.Title.includes(y.label)){
                                    console.log('inside checklabel');
                                    y.isCompleted=this.sendCallOrText.IsCompleted;
                                    console.log(y.isCompleted);
                                    if (y.isCompleted) x.percentageTask+=(1/3)*100;
                                }
                            });
                }});
                            console.log(this.sections);
                this.sendCallOrText={Title:'',RelatedTo:'',Subject:'',Comments:'',ObjectName:'',IsCompleted:false};

            })
            .catch(error=>{
                console.log(error);
                this.sendCallOrText={Title:'',RelatedTo:'',Subject:'',Comments:'',ObjectName:'',IsCompleted:false};
            })
        }
        handlesendEmailSave(){
            console.log(this.sendEmail);
            this.isModalOpen=false;
            sendEmail({emailDetails: this.sendEmail})
            .then(result=>{
                console.log(result);
                this.sections.forEach(x => {
                    console.log('inside check');
                    if(this.sendEmail.Title.includes(x.title)){
                        console.log('inside checkTitle');
                        x.steps.forEach(y => {
                            if(this.sendEmail.Title.includes(y.label)){
                                console.log('inside checklabel');
                                y.isCompleted=true;
                                console.log(y.isCompleted);
                                if (y.isCompleted) x.percentageTask+=(1/3)*100;
                            }
                        });
                }});
                console.log(this.sections);
                this.sendEmail={title:'',Subject:'',Comments:'', Name:'',RelatedTo:'',IsCompleted:false};
            })
            .catch(error=>{
                console.log(error);
                this.sendEmail={title:'',Subject:'',Comments:'', Name:'',RelatedTo:'',IsCompleted:false};
            })
        }
        handleSelect(event){
            this.selectedRows = event.detail.selectedRows;
        this.quoteIds = this.selectedRows.map(row => row.Id);
        
        console.log('Selected Quote IDs:', this.quoteIds);
            
        }
        handleQuoteClick(){
            sendquotePDF({quoteList:this.quoteIds})
            .then(result=>{
                console.log(result);
            })
            .catch(error=>{
                console.log(error);
            })

        }
        handleClose(){
            this.isModalOpen=false;
        }
        get openLogaCallorText(){
            return this.isModalOpen && (this.sendCallOrText.Title.includes('Call') || this.sendCallOrText.Title.includes('Text'));
        }
        get openSendEmail(){
            return this.isModalOpen && this.sendEmail.Title.includes('Email');
        }
    }
