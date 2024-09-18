import { LightningElement, wire } from 'lwc';
import getaccountDetails from '@salesforce/apex/AccountController.getaccountDetails'
import getContactDetails from '@salesforce/apex/ContactController.getContactDetails'


export default class DisplayAccountList extends LightningElement {

    columnList=[
        { label:'Id',fieldName:'Id'},
        { label:'Name',fieldName:'Name'},
        { label:'Rating',fieldName:'Rating'},
    ];
    accountData;
    contactData;
    selectedRows;
    selectedAccountId;
    isModalOpen;

    @wire(getaccountDetails)
    accountList({ data,error  }) {
        if (data) {
            this.accountData = data;
            console.log(data);

        } else if (error) {
            console.log(error);
        }
    }
    handleSelect(event)
    {
        this.selectedRows = event.detail.selectedRows.Id;
        console.log(JSON.stringify(this.selectedRows));
    }

    handleClick(event){
    this.selectedAccountId = this.selectedRows.map(row=>row.Id);
        console.log(this.selectedAccountId);
        getContactDetails({accountIds:this.selectedAccountId})
            .then(result => {
                this.contactData=result;
                console.log('result')
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });

            this.isModalOpen = true;
            
}
handleCloseModal() {
    this.isModalOpen = false;
}

}