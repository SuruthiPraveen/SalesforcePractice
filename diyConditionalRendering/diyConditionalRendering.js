import { LightningElement } from 'lwc';

export default class DiyConditionalRendering extends LightningElement {
    isMemberLogin=false;
    isNewMemberSignIn=false;
    userName;
    passWord;
    loginCheck=false;
    handleLoginChange(event){
    this.isMemberLogin=event.target.checked;
    this.template.querySelector(".signin").checked=false;
}

handleSignInChange(event){
    this.isNewMemberSignIn=event.target.checked;
    this.template.querySelector(".login").checked=false;
}
handleUsernameChange(event){
    this.userName=event.target.value;

}
handlePasswordChange(event){
    this.passWord=event.target.value;
}
handleLogin(event){
if(this.userName=='abc' && this.passWord=='123'){
    alert('Login Successfull');
}
else{
    this.loginCheck=true;
}
}
handleRegister(event){
    alert('Registration Successfull');
    this.template.querySelector(".remove").remove();
}

}