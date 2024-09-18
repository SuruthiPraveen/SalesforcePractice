public with sharing class QuoteController {

    @AuraEnabled(cacheable=true)
    public static List<Quote> quoteDetails(List<Id> accId){
        return [SELECT Name, QuoteNumber, QuoteToAddress, BillingAddress, BillingName, 
                                AccountId, OpportunityId, TotalPrice, Discount, GrandTotal
                                 FROM Quote WHERE AccountId IN :accId];
    }

   @AuraEnabled
    public static String sendquotePDF(List<Id>quoteList) {
        List<QuoteDocument> quoteDocList = [SELECT ContentVersionDocumentId,QuoteId FROM QuoteDocument Where QuoteId=:quoteList];
        List<Id> contentVersionDocumentIds = new List<Id>();
        List<String> pdfDoc = new List<String>();
        system.debug(quoteDocList); 
        
        if (!quoteDocList.isEmpty()){
            for(QuoteDocument qd:quoteDocList){
                contentVersionDocumentIds.add(qd.ContentVersionDocumentId);
            }
            }
            // Query ContentVersion for the PDF data
            List<ContentVersion> contentVersion = [SELECT VersionData,Title 
                                             FROM ContentVersion 
                                             WHERE Id = :contentVersionDocumentIds 
                                             AND IsLatest = TRUE];
          system.debug(contentVersion);                                  
           List<Messaging.SingleEmailMessage>emailMessages=new List<Messaging.SingleEmailMessage>();
            if (!contentVersion.isEmpty()){
                system.debug(contentVersion);
            
            // Return base64-encoded PDF data
            List<Messaging.EmailFileAttachment> attachments = new List<Messaging.EmailFileAttachment>();
            for(ContentVersion con:contentVersion){
            Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
            attachment.setFileName(con.Title);
            attachment.setBody(con.VersionData);
            attachments.add(attachment);
            }
            
            Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
            message.setToAddresses(new String[] {'sruthi.darsh06@gmail.com'}); // Replace with actual recipient
            message.setSubject('Quote PDFs');
            message.setPlainTextBody('Please find the attached quote PDFs.');
            message.setFileAttachments(attachments);
            emailMessages.add(message);
        
        }
            Messaging.SendEmailResult[] result=Messaging.SendEmail(emailMessages);
            if(result[0].Success){
                System.debug('Email Sent');
                return 'success';
            }
            else{
                System.debug('Error in sending mail');
                return 'error';
            }
        
            
        }  
}