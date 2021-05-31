
class RestClient {
   // Внутри мы прописываем наши запросы (get, post, puth, put)

   letGET(baseUrl) {
      return axios.get(baseUrl)
      .then(res => res.data)
      .catch(err => new Error('Ошибка в запросе GET'));
   }

   letPOST(baseUrl, obj) {
      return axios.post(baseUrl, obj)
      .then(res => console.log(res)) // Результат ответа от сервера)
      .catch(err => new Error('Ошибка в запросе POST'));
   }

   letPATCH(baseUrl, obj, id) {
      return axios.patch(`${baseUrl}` + `/` + `${id}` , obj)
      .then(res => console.log(res)) // Результат ответа от сервера
      .catch(err => new Error('Ошибка в запросе PATCH'));
   }  
   
   letDELETE(baseUrl, id) {
      return axios.delete(`${baseUrl}` + `/` + `${id}`)
      .then(res => console.log(res))
      .catch(err => new Error('Ошибка в запросе DELETE'))
   }
}

// export default RestClient;

const LetGET = (baseUrl) => {
   return axios.get(baseUrl)
   .then(res => console.log(res.data.title))
   .catch(err => new Error('Ошибка в запросе GET'));
}
let myURL = 'https://jsonplaceholder.typicode.com/todos/1'

LetGET(myURL)
