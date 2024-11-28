describe("DELETE Requests - Reqres API", () => {
    it("DELETE - Delete User", () => {
      cy.request("DELETE", "/users/2").then((response) => {
        expect(response.status).to.eq(204);
      });
    });
  });
  