public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getaccountDetails() {
        return [SELECT Id, Name,Rating FROM Account ORDER BY Name ASC LIMIT 10 ];
    }

     @AuraEnabled(cacheable=true)
    public static List<Account> getaccountDetailsWithContact(List<Id>accountIds) {
        return [SELECT Id, Name,Rating,(SELECT Id, LastName,Phone FROM Contacts) FROM Account Where Id IN :accountIds ];
    }
}