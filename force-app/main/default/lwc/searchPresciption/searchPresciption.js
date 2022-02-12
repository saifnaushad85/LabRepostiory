import { LightningElement,wire,track } from 'lwc';
import searchPrescition from '@salesforce/apex/prescriptionClass.searchPrescition';

const DELAY=500;

export default class SearchPresciption extends LightningElement {

    strPrescription='';
    @track presciList=[];
    @wire(searchPrescition,{strpres:'$strPrescription'})
    searchPrescitionAll({data,error})
    {
        if(data)
        {
            this.presciList=data;
        }
        else if(error)
        {

        }
    }

    handlekeyChange(event)
    {
        
       // this.strPrescription=event.target.value;
       const searhString=event.target.value;
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout=setTimeout(()=>{
            this.strPrescription=searhString;
        },DELAY );
    }

}