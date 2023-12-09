const addButton = document.querySelector('#add');

const updateLSData=()=>{

    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    })
    console.log(notes);

    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNodes = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="operation">
    <button class="edit"> <i class="fa-solid fa-pen-to-square"></i> </button>
    <button class="delete"> <i class="fa-solid fa-trash"></i> </button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`;

    note.insertAdjacentHTML('afterbegin', htmlData);

    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.addEventListener('change',(event)=>{
        const value = event.target.value;
        mainDiv.innerHTML=value;
        textArea.value = value;
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');

        updateLSData();
    })

    //toggle using edit button
    mainDiv.innerHTML = text;
    textArea.value = text;

    editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    //deleting the node
    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    })


    
    document.body.appendChild(note);


}

// getting data from local Storage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach((note)=>{
        addNewNodes(note);
    })
}


addButton.addEventListener('click', () => addNewNodes())

