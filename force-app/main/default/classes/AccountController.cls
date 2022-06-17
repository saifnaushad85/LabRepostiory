public with sharing class AccountController {
    public string accountID{get;set;}
    public Account actObj{get;set;}

    public AccountController() {

        actObj=new Account();

    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts()
    {
        return [select Id,name,type, industry from Account limit 10];
        
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(string AccName)
    {
        return [select Id,name,type, industry from Account limit 10];
        
    }
    @AuraEnabled
    public static List<Account> getAccountlist(){

        return [select Id,name,type, industry from Account limit 10];
    }

    public pagereference reterieveAccountDetail()
    {
        if(accountID!=null)
        {
            actObj=[select id,name,type,industry from Account where id=:accountID];
        }
        return null;
        
    }
}