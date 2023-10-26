describe("Dashboard Page Test Cases", ()=>{
    it("Do login with correct Values", ()=>{
        cy.visit("http://localhost:3000/");
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

    it("Found No Post for the first time",()=>{
        cy.visit("http://localhost:3000/dashboard");
        cy.contains("Found 0 photos");
    });

    it("Contains image url and description input, and Publish button",()=>{
        cy.visit("http://localhost:3000/dashboard");

        //test image
        const imageInp = cy.get("input[name='image']");
        imageInp.should("be.visible");
        imageInp.should("have.attr", "type", "url");
        imageInp.should ("have.attr", "required", "required");
        imageInp.should("have.attr", "placeholder", "Image URL");

        //test desc
        const descInp = cy.get("input[name='desc']");
        descInp.should("be.visible");
        descInp.should("have.attr", "type", "text");
        descInp.should("have.attr", "required", "required");
        descInp.should("have.attr", "placeholder", "What's on your mind?");

        //test button
        const publishBtn = cy.get("button");
        publishBtn.should("be.visible");
        publishBtn.should("text", "Publish!");
        publishBtn.should("have.css", "background-color", "rgb(79, 70, 229)");
        publishBtn.should("have.css", "color", "rgb(255, 255, 255)");    
    });

    it("Upload some photos",()=>{
        cy.visit("http://localhost:3000/dashboard");
        const photos =[
            {
                imageValue: "https://images.unsplash.com/photo-1533321942807-08e4008b2025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
                decriptionValue : "lettuce",
            },
            {
                imageValue: "https://images.unsplash.com/photo-1595855759920-86582396756a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
                decriptionValue: "asparagus",
            }
        ];

        photos.forEach(({imageValue, decriptionValue})=>{
            const image = cy.get ("input[name='image']");
            image.type(imageValue);

            const desc = cy.get("input[name='desc']");
            desc.type(decriptionValue);

            const publishBtn = cy.get("button");
            publishBtn.click();

            //check uploaded photos
            cy.get("img").should("have.attr", "src", imageValue);
            cy.contains(decriptionValue);
        });
    });
})