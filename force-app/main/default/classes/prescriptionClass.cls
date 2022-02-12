public with sharing class prescriptionClass {
    public prescriptionClass() {


    }

    @AuraEnabled
    public static P_Persciption__c createPrescription(P_Persciption__c PeDestail){
        try {
            insert PeDestail;
            return PeDestail;
            
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }


    @AuraEnabled
    public static List<P_Persciption__c> savemuliplePresciption(List<P_Persciption__c> perscriptionList){
        try {
            insert perscriptionList;
            return perscriptionList;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<P_Persciption__c> getpresciption(){
        
        return [select Id,Name,	P_Type__c,PDetail__c from P_Persciption__c];

    }

    @AuraEnabled
    public static void  delSelPreciption(List<Id> selPresIDList ){
        List<P_Persciption__c> preList =new List<P_Persciption__c>();
        preList=[select id from P_Persciption__c scription__c where id in: selPresIDList];
        if(preList!=null && preList.size()>0)
        {
            delete preList;
        }

        
    }

    @AuraEnabled(cacheable=true)
    public static List<P_Persciption__c> searchPrescition(String strpres)
    {
        String keyString= '%'+strpres+'%';

        return [select Id,Name,	P_Type__c,PDetail__c from P_Persciption__c where  name like:keyString ];
       
    }
}