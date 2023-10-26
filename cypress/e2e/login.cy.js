describe("Login Page Test Cases", ()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3000/");
    });

    it("Visit Login Page", ()=>{
        cy.title().should("eq", "React Gallery");
        cy.contains("Hello Again!");
    });

    it("Contains Email and Password Input, and Login Button", ()=>{
        //check email
        const email = cy.get("input[name='email']");
        email.should("be.visible");
        email.should("have.attr", "type", "email");
        email.should("have.attr", "placeholder", "Email Address");

        //check password
        const password = cy.get("input[name='password']");
        password.should("be.visible");
        password.should("have.attr", "type", "password");
        password.should("have.attr", "placeholder", "Password");

        //check login button
        const loginBtn = cy.get("button");
        loginBtn.should("be.visible");
        loginBtn.contains("Login");
        loginBtn.should("have.css", "background-color", "rgb(79, 70, 229)");
        loginBtn.should("have.css", "color", "rgb(255, 255, 255)");
    });

    it("Do Login with Null Values",()=>{
        const button = cy.get('button');
        button.click();
        cy.on("window:alert", (text) =>{
            expect(text).to.contains("login failed");
        })
    });

    it("Do login with wrong Values", ()=>{
        const email = cy.get("input[name='email']");
        email.type("wrong@react.test");


        const password = cy.get("input[name='password']");
        password.type("password");

        const button = cy.get('button');
        button.click();
        cy.on("window:alert", (text) =>{
            expect(text).to.contains("login failed");
        });
    });

    it("Do login with correct Values", ()=>{
        const email = cy.get("input[name='email']");
        email.type("user@react.test");


        const password = cy.get("input[name='password']");
        password.type("password");

        const button = cy.get('button');
        button.click();
        cy.on("window:alert", (text) =>{
            expect(text).to.contains("welcome");
        });

        cy.url().should('eq','http://localhost:3000/dashboard')
    });
});