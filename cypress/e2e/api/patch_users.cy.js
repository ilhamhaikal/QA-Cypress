describe("PATCH Requests - Reqres API", () => {
    it("PATCH - Update User", () => {
      cy.request("PATCH", "/users/2", {
        name: "morpheus",
        job: "new leader",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("job", "new leader");
      });
    });
  });
  