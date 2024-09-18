import LightningDataTable from "lightning/datatable";
import customPicklistTypeTemplate from "./customPicklistType.html";
import customPicklistEditTemplate from "./customPicklistEdit.html";

export default class CustomDataType extends LightningDataTable {

    static customTypes = {
        customPicklist: {
            template: customPicklistTypeTemplate,
            editTemplate: customPicklistEditTemplate,
            standardCellLayout:true,
            typeAttributes: ['options','value','context']
        }
    }
}