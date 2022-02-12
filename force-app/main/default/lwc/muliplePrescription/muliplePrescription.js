import { LightningElement, track } from 'lwc';
import savemulprescrition from  '@salesforce/apex/prescriptionClass.savemuliplePresciption';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class MuliplePrescription extends LightningElement {

    @track keyIndex=0;
    @track message='';
    @track error;
    @track presRecordList =[{
        Name:'',
        Type:'',
        Detail:''

    }];


    ChangHandler(event)
    {

        if(event.target.name==='preName')
        {
            this.presRecordList[event.target.accessKey].Name=event.target.value;

        }

        if(event.target.name==='preType')
        {
            this.presRecordList[event.target.accessKey].Type=event.target.value;

        }


        if(event.target.name==='preDetail')
        {
            this.presRecordList[event.target.accessKey].Detail=event.target.value;

        }


    }


    addRow()
    {
        this.keyIndex+1;
        this.presRecordList.push({
            Name:'',
            Type:'',
            Detail:''

        });

    }

    saveMultplePresciprtion()
    {
        savemulprescrition({perscriptionList: this.presRecordList})
        .then(result=>{
            this.message=result;
            this.error= undefined;

            this.presRecordList.forEach(function(item)
            {
                item.Name='';
                item.Type='';
                item.Detail='';

            });


            if(this.message!==undefined)
            {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title:'Success',
                        message: 'Account Created!',
                        variant:'success',
                    }),
                );
            }

            console.log(JSON.stringify(result));
            console.log("result",this.message);
            

        })
        .catch(error=>{
            this.message=undefined;
            this.error=error;
            this.dispatchEvent(
                new ShowToastEvent({

                    title:'Error creating Records',
                    message: error.body.message,
                    varint:'error',
                })
            );
            console.log("error",JSON.stringify(this.error));

        });


    }

    removeRow(event)
    {
        if(this.presRecordList.length>=1)
        {
            this.presRecordList.splice(event.target.accessKey,1);
            this.keyIndex-1;

        }

    }

}