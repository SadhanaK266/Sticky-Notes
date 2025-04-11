const box = document.querySelector('.box');
const btnAdd = document.querySelector('.btnAdd');

if (!localStorage.getItem("data")) {
    const data = [];
    localStorage.setItem("data", JSON.stringify(data));
}

getLocalData().forEach(element => {
    const newText = createTextArea(element.id, element.content);
    box.insertBefore(newText, btnAdd);
});

function getLocalData() {
    return JSON.parse(localStorage.getItem('data') || "[]");
}

function createTextArea(id, content) {
    const newText = document.createElement('textarea');
    newText.classList.add('note');
    newText.value = content;
    newText.placeholder = "Enter the notes";
    newText.addEventListener('change', () => {
        updateData(id, newText.value);
    });

    newText.addEventListener('dblclick',()=>{
        const check=confirm("Do you want to delete?");
        if(check){
            deleteData(id,newText);
        }
    })

    return newText;
}

function deleteData(id,newText){
    const temp=getLocalData().filter((i)=>i.id!=id);
    saveNote(temp);
    box.removeChild(newText);
}

function addNote() {
    const temp = getLocalData();
    const tempdata = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };
    const newText = createTextArea(tempdata.id, tempdata.content);
    box.insertBefore(newText, btnAdd);
    temp.push(tempdata);
    saveNote(temp);
}

function updateData(id, value) {
    const temp = getLocalData();
    const element = temp.find(i => i.id == id);
    if (element) {
        element.content = value;
        saveNote(temp);
    }
}

function saveNote(temp) {
    localStorage.setItem("data", JSON.stringify(temp));
}

btnAdd.addEventListener('click', () => addNote());
