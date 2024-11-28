describe("Reqres API Testing", () => {
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
  
    it("PUT - Update User", () => {
      cy.request("PUT", "/users/2", {
        name: "morpheus",
        job: "zion resident",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("job", "zion resident");
      });
    });
  
    it("PATCH - Update User", () => {
      cy.request("PATCH", "/users/2", {
        name: "morpheus",
        job: "new leader",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("job", "new leader");
      });
    });
  
    it("DELETE - Delete User", () => {
      cy.request("DELETE", "/users/2").then((response) => {
        expect(response.status).to.eq(204);
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
  