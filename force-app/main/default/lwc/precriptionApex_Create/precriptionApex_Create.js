import { LightningElement,track } from 'lwc';
import createPresciption from '@salesforce/apex/prescriptionClass.createPrescription';

import PER_Name from '@salesforce/schema/P_Persciption__c.Name';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class PrecriptionApex_Create extends LightningElement {

   @track persciptionRecord={
        Name : PER_Name
    }


    handleNameChange(event)
    {
        this.persciptionRecord.Name =event.target.value;
    }

    handleonClick()
    {

        createPresciption({PeDestail:this.persciptionRecord})
        .then(result=>{
            this.persciptionRecord={};
            this.perId=result.id;
            const toastevent= new ShowToastEvent({
                title:'Success',
                message: 'Perscription Record Created',
                variant : 'success'
            });
            this.dispatchEvent(toastevent);

        })
        .catch(error=>{
            this.error=error.message;
        });
    }
    
}