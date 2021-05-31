imperorUrl = 'http://localhost:3000/users';
// import RestClient from './RestClient'
// import { ReviewsClient } from './ReviewsClient'

class Client {
   constructor() {
      this.baseUrl = imperorUrl;
      this.rest = new RestClient(this.baseUrl);
      this.reviews = new ReviewsClient(this.rest);
   }
};
// export default Client