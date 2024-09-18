import { LightningElement } from 'lwc';

export default class PaginatorComponent extends LightningElement {

    handlePrevious(event) {
        this.dispatchEvent(
            new CustomEvent('previous')
        );
    }

    handleNext(event) {
        this.dispatchEvent(
            new CustomEvent('next')
        );
    }
}