public with sharing class EmailController {
    public class emailData {
        @AuraEnabled public String subject { get; set; }
        @AuraEnabled public String body { get; set; }
        @AuraEnabled public String toAddress { get; set; }
    }
    @AuraEnabled
    public static String sendEmail(emailData emailDetails){
        List<Messaging.SingleEmailMessage>emailMessages=new List<Messaging.SingleEmailMessage>(); 

           Messaging.SingleEmailMessage message=new Messaging.SingleEmailMessage(); 
            message.toaddresses=new String[]{emailDetails.toAddress};
            message.Subject=emailDetails.subject;
            message.htmlbody=emailDetails.body;  
            emailMessages.add(message);
    
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