import { LightningElement,wire,track } from 'lwc';
import getpresciption from '@salesforce/apex/prescriptionClass.getpresciption';
import delSelPreciption from '@salesforce/apex/prescriptionClass.delSelPreciption';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class MassdeletePresctiption extends LightningElement {
    @wire(getpresciption) prescriptions;
    @track seletedpresciptionList= [];

    @track columns=[
        {label:'Presciption Name',fieldName:'Name',type:'text' },
        {label:'Presciption Type',fieldName:'P_Type__c',type:'text' },
        {label:'Presciption Type',fieldName:'PDetail__c',type:'text' },

    ];

    delSelRecords()
    {
        delSelPreciption({selPresIDList: this.seletedpresciptionList})
        .then(result=>
            {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message : 'Selected Contacts are detelete',
                        variant : 'success',

                    }),
                );
                this.template.querySelector('lightning-datatable').selectedRows = [];
                return refreshApex(this.prescriptions);
            })
            .catch(error=>{
                this.message= undefined;
                this.error=error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating records',
                        message: error.body.pageErrors[0].message,
                        variant:'error'
                    }),
                )
            });

            

    }

    prepareSelectedRows(event)
    {

        const selectedRows=event.detail.selectedRows;
        this.seletedpresciptionList=[];
        for(let i=0;i<selectedRows.length;i++)
        {
            this.seletedpresciptionList.push(selectedRows[i].Id);
        }
        console.log(this.seletedpresciptionList);

    }
}