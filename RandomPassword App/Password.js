const passwordBox=document.getElementById("password");
const lenght=16;
const uppercase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase="abcdefghijklmnopqrstuvwxyz";
const number="0123456789";
const symble="@#$%^&*()_+~|}{[]></-=";

const allaChars=uppercase+lowercase+number+symble;

function createPassword(){
    let password="";
    // password+=uppercase[Math.floor(Math.random()*uppercase.length)];
    // password+=lowercase[Math.floor(Math.random()*lowercase.length)];
    // password+=number[Math.floor(Math.random()*number.length)];
    // password+=symble[Math.floor(Math.random()*symble.length)];

    while(lenght>password.length){
        password+=allaChars[Math.floor(Math.random()*allaChars.length)];
    }

    passwordBox.value=password;
}

function COPYpassword(){
    passwordBox.select();
    document.execCommand("copy");
}