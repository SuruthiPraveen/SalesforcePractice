public with sharing class ContactController {
    @AuraEnabled
    public static List<Contact> getContactDetails(List<Id>accountIds) {
        return [SELECT Id, LastName,Phone,Account.Name FROM Contact Where AccountId IN :accountIds];
    }
}