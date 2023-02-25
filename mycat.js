const fs = require("fs");
let inputArr = process.argv.slice(2);

let optionArr =[];
let fileArr = [];
let newfileArr = [];

// ============> Placed file path in fileArr and flags in optionArr  <===========  //
for(let i=0;i<inputArr.length;i++)
{
 let firstChar = inputArr[i].charAt(0);
 if(firstChar == '-'){
    optionArr.push(inputArr[i]);
 }
 else if(firstChar == '>'){
    let inn = inputArr[i].slice(1);
    createnewfile(inn)
 }
 else{
    fileArr.push(inputArr[i]);
 }
}

// Checked whether each file path is present if not then end the process //

for(let i=0;i<fileArr.length;i++){
    let DoesExist = fs.existsSync(fileArr[i])
    if(!DoesExist){
        console.log(`${fileArr[i]} does not exist `);
        return;
    }
}


// store content of each path in "content" //

let content ="";
for(let i=0;i<fileArr.length;i++)
{
 let filecontent = fs.readFileSync(fileArr[i]);
 content = content + filecontent + "\n" ;   
}

let contentArr = content.split(/\r?\n/);


let isSpresent = optionArr.includes("-s");
if(isSpresent){
    for(let i =1; i<contentArr.length;i++){
        if(contentArr[i] =="" && contentArr[i-1] == ""){
            contentArr[i] = null;
        }
        else if(contentArr[i]== "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }
    let tempArr = [];

for(let i=0; i<contentArr.length;i++)
{
    if(contentArr[i] != null)
    { tempArr.push(contentArr[i]); }
}

}

let indexofN = optionArr.indexOf("-n");
let indexofB = optionArr.indexOf("-b");
// if "-n" or "-b" is not found -1 is returned;
let finaloption = "";

// if both "-n" and "-b" is present
if(indexofB != -1 && indexofN != -1){
    if(indexofN < indexofB){
        finaloption = "-n";
    }
    else if (indexofN > indexofB){
        finaloption = "-b";
    }
}
// if either "-n" or "-b" is present
else{
    if(indexofN != -1){
        finaloption = "-n"
    }
    else if(indexofB != -1){
        finaloption = "-b"
    }
}
// calling of function by evaluvating final option
if(finaloption == "-n"){
    modifyContentByN();
}
else if(finaloption == "-b"){
    modifyContentByB();
}

function modifyContentByN(){
for(let i=0;i < contentArr.length; i++){
    contentArr[i] = (i+1) + ") " + contentArr[i];
}
}
function modifyContentByB(){
    let count = 1;
    for(let i=0;i < contentArr.length; i++){
        if(contentArr[i] != ""){
        contentArr[i] = count + ") " + contentArr[i];
        count ++;
    }
    }
}


let indexofE = optionArr.indexOf("-e");

if(indexofE != -1){
    for(let i =0; i< contentArr.length;i++){
        if(contentArr[i] == ""){
            contentArr[i]= "$";
        }
    }
}

// Create the given new file
function createnewfile(aa){
    fs.appendFileSync(`${aa}`,"");
}

//console.table(contentArr);
