// import Client from './indexClient'

const client = new Client();
console.log(client)

let container = document.querySelector('.container');
let wrapper = document.querySelector('.wrapper');
let body = document.querySelector('body');

let mainContainer = document.createElement('div');
mainContainer.id = 'mainContainer';
body.appendChild(mainContainer)

function createPatchForm() {
    const formContainer = document.createElement('div');
    formContainer.id = 'formContainer';
    formContainer.classList = 'formContainer'
    mainContainer.appendChild(formContainer)
}

//________________________________________//

function createValueAccum(obj, name) {
    var formData = new FormData(document.forms.person);
    formData.forEach(function(value, key){
        obj[key] = value;
    });
}

async function createNewUser(e, myForm) {
    myForm = {}
    e.preventDefault();
    createValueAccum(myForm);
    client.reviews.postReview(client.baseUrl, myForm)
    await client.reviews.getReview(client.baseUrl)
    renderUser()
}
send.addEventListener('click', createNewUser);

//________________________________________//

function  renderPatch(e, taraget) {
    function createCoord(e) {
        return dataY = `${e.pageY-65}px`
    }
    addWrapper()
    createPatchForm()
    let correctForm = `
    <form name="person" id="persons">
    <input id="names" name="name" placeholder="Название заметки">
    <input id="age" name="age" placeholder="Содержимое">
    <input id="status" name="status" placeholder="Дополнительная пометка">
    <input type="submit" id='saveChanges' data-numb="${taraget}" value='Сохранить изменения'>
    <button id='skipChanges' data-numb="${taraget}  ">X</button>
    </form>
    `
    formContainer.innerHTML = correctForm
    let divFormStyle = mainContainer.style
    divFormStyle.opacity = '1'   
    divFormStyle.position = 'absolute'
    divFormStyle.left = '30%'
    divFormStyle.top = createCoord(e)
    divFormStyle.zIndex = '2'
    divFormStyle.opacity = '1'
    divFormStyle.transition = '0.3s'

    async function saveChanges(e, correctForm) {
        e.preventDefault();
        let myDataSet = e.target.dataset.numb
        if(e.target.id === 'saveChanges') {
            correctForm = {}
            createValueAccums(correctForm);
            checkForm(correctForm)
            await client.reviews.patchReview(client.baseUrl, correctForm, myDataSet)
            await client.reviews.getReview(client.baseUrl);
            renderUser()
            skipWrapper()
            mainContainer.innerHTML = ''
        }
        if (e.target.id === 'skipChanges') {
            mainContainer.innerHTML = ''
            skipWrapper()
        }
    }
    formContainer.addEventListener('click', saveChanges)
}

function callPatchForm(e) {
    let lengthCheck = mainContainer.getElementsByClassName('formContainer');
    e.preventDefault();
    if(e.target.id === 'putBut' && lengthCheck.length < 1) {
        renderPatch(e, e.target.dataset.numb)
    } 
    if (e.target.id === 'putBut' && lengthCheck.length < 2) { 
        mainContainer.innerHTML = '';
        renderPatch(e, e.target.dataset.numb)
    }
}
container.addEventListener('click', callPatchForm)

function createValueAccums(obj) {
    var formData = new FormData(document.forms.persons);
    console.log('formData', formData)
    formData.forEach(function(value, key){
        obj[key] = value;
    });
}

function checkForm(correctForm) {
    if (correctForm.name == '') {
        delete correctForm.name
    }
    if (correctForm.age == '') {
        delete correctForm.age
    }
    if (correctForm.status == '') {
        delete correctForm.status
    }
    return correctForm
}

function addWrapper() {
    wrapper.style.opacity = '0.7'
    wrapper.style.transition = '0.1s'
    wrapper.style.filter = 'blur(2px)'
}

function skipWrapper() {
    wrapper.style.background = 'none'
    wrapper.style.opacity = '1'
    wrapper.style.filter = 'none'
}

//________________________________________//

async function deleteUser(e) {
    e.preventDefault();
    if(e.target.id === 'delBut') {
        mainContainer.innerHTML = ''
        skipWrapper()
        let event = e.target.dataset.numb
        client.reviews.deleteReview(client.baseUrl, event);
        await client.reviews.getReview(client.baseUrl);
        renderUser()
    }
}
container.addEventListener('click', deleteUser)

//________________________________________//

async function renderUser() {
    var myUsers = await client.reviews.getReview(client.baseUrl);
    console.log(myUsers)
        const html = myUsers.reduce((accum, item, index) => {
            return (accum + 
                `<div class="user${item.id}" id="user${item.id}" data-numb="${item.id}">
                <h2>Название: ${item.name}</h4>
                <h4>Краткое содержание: ${item.age}</h4>
                <h4>Сложность:  ${item.status}</h4>
                <button id="delBut" data-numb="${item.id}">Удалить</button>
                <button id="putBut" data-numb="${item.id}">Исправить</button>        
            </div>`)
    }, '')
    container.innerHTML = html;
}
renderUser()

