describe("POST Requests - Reqres API", () => {
    it("POST - Create User", () => {
      cy.request("POST", "/users", {
        name: "morpheus",
        job: "leader",
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("name", "morpheus");
        expect(response.body).to.have.property("job", "leader");
      });
    });
  
    it("POST - Register Successful", () => {
      cy.request("POST", "/register", {
        email: "eve.holt@reqres.in",
        password: "pistol",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("token");
      });
    });
  
    it("POST - Register Unsuccessful", () => {
      cy.request({
        method: "POST",
        url: "/register",
        body: {
          email: "sydney@fife",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error", "Missing password");
      });
    });
  
    it("POST - Login Successful", () => {
      cy.request("POST", "/login", {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
      });
    });
  
    it("POST - Login Unsuccessful", () => {
      cy.request({
        method: "POST",
        url: "/login",
        body: {
          email: "peter@klaven",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error", "Missing password");
      });
    });
  });
  