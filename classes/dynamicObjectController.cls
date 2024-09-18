public with sharing class dynamicObjectController {
    @AuraEnabled(cacheable=true)
    public static SObject dynamicfieldvalues(string objectName,String recordId){
        Schema.SObjectType sObjectType = Schema.getGlobalDescribe().get(objectName);
        Schema.DescribeSObjectResult describeResult = sObjectType.getDescribe();

        // List to hold field names
        List<String> fieldNames = new List<String>();

        // Loop through each field in the object and collect field names
        for (Schema.SObjectField field : describeResult.fields.getMap().values()) {
            Schema.DescribeFieldResult fieldDescribe = field.getDescribe();
            if(fieldDescribe.isCreateable()){
                fieldNames.add(fieldDescribe.getName());
                System.debug(fieldDescribe.getName());
            }
        }

        // Serialize the list of field names to JSON format
        String fieldSet = String.join(fieldNames, ', ');
        String query = 'SELECT ' + fieldSet + ' FROM ' + objectName + ' WHERE Id = :recordId';
        System.debug('Constructed Query: ' + query);

        SObject objList= Database.query(query);
        return objList;
    }
} 