public with sharing class OpportunityHandler {
    
    @AuraEnabled(cacheable=true)    
    public static List<Opportunity> getopportunityDetails() {
        return [SELECT Id, Name,StageName,Amount FROM Opportunity Where Amount!=NULL Limit 10 ];
    }
    @AuraEnabled(cacheable=true)    
    public static List<Opportunity> getAllOpportunityList() {
        return [SELECT Id,Name,StageName,Amount,CloseDate FROM Opportunity];
    }
    @AuraEnabled(cacheable=true)    
    public static List<Opportunity> sortOpportunityList(String sortedBy,String sortedDirection) {
        String query='SELECT Id, Name,StageName,Amount,CloseDate FROM Opportunity';
        query+=' ORDER BY '+sortedBy+' '+sortedDirection;
        return Database.query(query);
    }

    @AuraEnabled(cacheable=true)    
    public static List<Opportunity> searchOpportunity(String searchKey) {
        string searchTerm='%'+searchKey+'%';
        return [SELECT Id,Name,StageName,Amount,CloseDate FROM Opportunity WHERE Name Like :searchTerm or StageName Like :searchTerm];
    }
    @AuraEnabled    
    public static String updateOpportunity(List<Object> oppData) {
        List<Opportunity>oppList=(List<Opportunity>)JSON.deserialize(JSON.serialize(oppData),List<Opportunity>.class);
        
        try{
            update oppList;
            return 'success';
        }
        catch (Exception e){
            System.debug('Error-->'+e.getMessage());
            return e.getMessage();
        }
    }
}