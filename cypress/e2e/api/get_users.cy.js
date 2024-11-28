describe("GET Requests - Reqres API", () => {
    it("GET - List Users", () => {
      cy.request("GET", "/users?page=2").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("data");
      });
    });
  
    it("GET - Single User", () => {
      cy.request("GET", "/users/2").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property("id", 2);
      });
    });
  
    it("GET - Single User Not Found", () => {
      cy.request({
        method: "GET",
        url: "/users/23",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
  