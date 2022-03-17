imperorUrl = "http://localhost:3000/users";

class Client {
  constructor() {
    this.baseUrl = imperorUrl;
    this.rest = new RestClient(this.baseUrl);
    this.reviews = new ReviewsClient(this.rest);
  }
}
