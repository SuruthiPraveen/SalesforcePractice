import LightningModal from 'lightning/modal'
export default class MyModal extends LightningModal {

    
    handleCloseModal() {
        this.close("Okay");
    }
}