import { LightningElement, track } from 'lwc';

export default class ToDoList extends LightningElement {
    @track toDoList=[];
    task;
    newTask='';
    handleChange(event){
        this.newTask=event.target.value;
        
    }
    handleClick(){
        this.task={
            id:this.toDoList.length+1,
            name:this.newTask
        };
        this.toDoList=[...this.toDoList,this.task];
        console.log(this.toDoList);
        this.newTask='';
    }
    handleDeleteTask(event){
        this.toDoList=this.toDoList.filter(task=>task.id!=event.target.value);
        console.log(this.toDoList);
    }
    get displayToDos(){
        return this.toDoList.length>0;
    }
}