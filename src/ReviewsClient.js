class ReviewsClient {
   constructor(client) {
         this.client = client
   }
   getReview = (baseUrl) => this.client.letGET(baseUrl);
   postReview = (baseUrl, obj) => this.client.letPOST(baseUrl, obj);
   patchReview = (baseUrl, obj, id) => this.client.letPATCH(baseUrl, obj, id);
   deleteReview = (baseUrl, id) => this.client.letDELETE(baseUrl, id);
}