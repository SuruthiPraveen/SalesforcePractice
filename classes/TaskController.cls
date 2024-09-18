public with sharing class TaskController {
    
    public class TaskData {
        @AuraEnabled public String Subject { get; set; }
        @AuraEnabled public String Comments { get; set; }
        @AuraEnabled public String ObjectName { get; set; }
        @AuraEnabled public String RelatedTo { get; set; }
        @AuraEnabled public Boolean IsCompleted { get; set; }
    }
    @AuraEnabled
    public static Task getTaskDetails(TaskData createTask) {
        Task task=new task();
        task.Subject=createTask.Subject;
        task.Description=createTask.Comments;
        task.Status=(createTask.IsCompleted==true)?'Completed':'Not Started';
        if(createTask.ObjectName=='Account'){
            task.WhatId=createTask.RelatedTo;
        }
        else if(createTask.ObjectName=='Lead'){
            task.WhoId=createTask.RelatedTo;
        }
        insert task;
        return task;
    }
}