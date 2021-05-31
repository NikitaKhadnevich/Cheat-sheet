
window.onload = function() {

let container = document.querySelector('.container');
let wrapper = document.querySelector('.wrapper');
let formContainer = document.querySelector('.formContainer')

let baseURL = 'http://localhost:3000/users'

function createValueAccum(obj, name) {
    var formData = new FormData(document.forms.person);
    formData.forEach(function(value, key){
        obj[key] = value;
    });
}
send.addEventListener('click', createNewUser);

async function createNewUser(e, myForm) {
    myForm = {}
    e.preventDefault();
    createValueAccum(myForm);
    letPOST(baseURL, myForm);
    await getUsers(baseURL);
    renderUser()
}

function letPOST(URL, obj) {
    return axios.post(URL, obj)
    .then(res => {
    console.log(res); // Результат ответа от сервера
    })
    .catch(err => new Error('Ошибка в запросе POST'));
}
//________________________________________//

function createPatchUserForm(e) {
    e.preventDefault();
    if(e.target.id === 'putBut') {
        function createCoord(e) {
            return dataY = `${e.pageY-65}px`
        }
        addWrapper()
        let correctForm = `
        <form name="person" id="persons">
        <input id="names" name="name" placeholder="Название заметки">
        <input id="age" name="age" placeholder="Содержимое">
        <input id="status" name="status" placeholder="Дополнительная пометка">
        <input type="submit" id='saveChanges' data-numb="${e.target.dataset.numb}" value='Сохранить изменения'>
        <button id='skipChanges' data-numb="${e.target.dataset.numb}">X</button>
        </form>
        `
        formContainer.innerHTML = correctForm;
        let divFormStyle = formContainer.style
        divFormStyle.opacity = '1'   
        divFormStyle.position = 'absolute'
        divFormStyle.left = '81px'
        divFormStyle.top = createCoord(e)
        divFormStyle.zIndex = '2'
        divFormStyle.opacity = '1'
        divFormStyle.transition = '0.4s'
    }
}
container.addEventListener('click', createPatchUserForm)

function letPATCH(URL, obj, id) {
    return axios.patch(`${URL}` + `/` + `${id}` , obj)
    .then(res => {
    console.log(res); // Результат ответа от сервера
    })
    .catch(err => new Error('Ошибка в запросе PATCH'));
}

function createValueAccums(obj) {
    var formData = new FormData(document.forms.persons);
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
    wrapper.style.background = 'rgb(2,0,36)'
    wrapper.style.background = 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(115,114,95,1) 100%)'
    wrapper.style.opacity = '0.7'
    wrapper.style.transition = '0.2s'
    wrapper.style.filter = 'blur(1px)'
}

function skipWrapper() {
    wrapper.style.background = 'none'
    wrapper.style.opacity = '1'
    wrapper.style.filter = 'none'
}

async function saveChanges(e, correctForm) {
    e.preventDefault();
    let myDataSet = e.target.dataset.numb
    if(e.target.id === 'saveChanges') {
        correctForm = {}
        createValueAccums(correctForm);
        checkForm(correctForm)
        await letPATCH(baseURL, correctForm, myDataSet);
        await getUsers(baseURL);
        renderUser()
        skipWrapper()
        formContainer.innerHTML = ''
    }
    if (e.target.id === 'skipChanges') {
        formContainer.innerHTML = ''
        skipWrapper()
    }
}
formContainer.addEventListener('click', saveChanges)

//________________________________________//

function letDELETE(URL, id) {
    return axios.delete(`${URL}` + `/` + `${id}`)
    .then(res => console.log(res))
    .catch(err => new Error('Ошибка в запросе DELETE'))
}

async function deleteUser(e) {
    e.preventDefault();
    if(e.target.id === 'delBut') {
        let event = e.target.dataset.numb
        letDELETE(baseURL, event);
        await getUsers(baseURL);
        renderUser()
    }
}
container.addEventListener('click', deleteUser)
//________________________________________//

async function getUsers(url) {
    try {
    let res = await fetch(url);
    return await res.json();
    }
    catch (error) {
    throw new Error(`Error status:`);
    }
}

async function renderUser() {
    let myUsers = await getUsers(baseURL)
    let html = ''
    for (let index = 0; index < myUsers.length; index++) {
        let elem =  myUsers[index];
        let segment = 
            `<div class="user${elem.id}" id="user${elem.id}" data-numb="${elem.id}">
                <h2>${elem.name}</h4>
                <h4>${elem.age}</h4>
                <h4>${elem.status}</h4>
                <button id="delBut" data-numb="${elem.id}">Удалить</button>
                <button id="putBut" data-numb="${elem.id}">Исправить</button>        
            </div>`
        html = html + segment
        }
    container.innerHTML = html;
}
renderUser()
}
