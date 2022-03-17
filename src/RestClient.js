const ERROR_MESSAGES = {
  getError: "Ошибка в запросе GET",
  postError: "Ошибка в запросе POST",
  pathError: "Ошибка в запросе PATCH",
  deleteError: "Ошибка в запросе DELETE",
};

class RestClient {
  letGET(baseUrl) {
    return axios
      .get(baseUrl)
      .then((res) => res.data)
      .catch((err) => new Error(ERROR_MESSAGES.getError));
  }

  letPOST(baseUrl, obj) {
    return axios
      .post(baseUrl, obj)
      .then((res) => console.log(res.data))
      .catch((err) => new Error(ERROR_MESSAGES.postError));
  }

  letPATCH(baseUrl, obj, id) {
    return axios
      .patch(`${baseUrl}` + `/` + `${id}`, obj)
      .then((res) => console.log(res))
      .catch((err) => new Error(ERROR_MESSAGES.pathError));
  }

  letDELETE(baseUrl, id) {
    return axios
      .delete(`${baseUrl}` + `/` + `${id}`)
      .then((res) => console.log(res))
      .catch((err) => new Error(ERROR_MESSAGES.deleteError));
  }
}
