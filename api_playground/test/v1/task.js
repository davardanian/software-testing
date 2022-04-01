let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../index");
let request = require("supertest");


//Assertion Style / BDD
chai.should();

chai.use(chaiHttp);



describe('Tasks API', () => {
    // request.agent(server);

    // before(done => {
    //     server.on("appStarted", function(){
    //         done();
    //     });
    // });

    /**
     * Test the GET route
     */
    describe("GET /api/v1/tasks", () => {
        it("It should GET all the tasks", (done) => {
            chai.request(server)
                .get("/api/v1/tasks")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(3);
                done();
                });
        });

        it("It should NOT GET all the tasks", (done) => {
            chai.request(server)
                .get("/api/v1/task")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });


    /**
     * Test the GET (by id) route
     */
    describe("GET /api/v1/tasks/:id", () => {
        it("It should GET a task by ID", (done) => {
            const taskId = 1;
            chai.request(server)                
                .get("/api/v1/tasks/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('name');
                    response.body.should.have.property('completed');
                    response.body.should.have.property('id').eq(1);
                done();
                });
        });

        it("It should NOT GET a task by ID", (done) => {
            const taskId = 123;
            chai.request(server)                
                .get("/api/v1/tasks/" + taskId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The task with the provided ID does not exist.");
                done();
                });
        });

    });
    

    /**
     * Test the POST route
     */
    describe("POST /api/v1/tasks", () => {
        it("It should POST a new task", (done) => {
            const task = {
                name: "Task 4",
                completed: false
            };
            chai.request(server)                
                .post("/api/v1/tasks")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(4);
                    response.body.should.have.property('name').eq("Task 4");
                    response.body.should.have.property('completed').eq(false);
                done();
                });
        });

        it("It should NOT POST a new task without the name property", (done) => {
            const task = {
                completed: false
            };
            chai.request(server)                
                .post("/api/v1/tasks")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });

    });


    /**
     * Test the PUT route
     */
    describe("PUT /api/v1/tasks/:id", () => {
        it("It should PUT an existing task", (done) => {
            const taskId = 1;
            const task = {
                name: "Task 1 changed",
                completed: true
            };
            chai.request(server)                
                .put("/api/v1/tasks/" + taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(1);
                    response.body.should.have.property('name').eq("Task 1 changed");
                    response.body.should.have.property('completed').eq(true);
                done();
                });
        });

        it("It should NOT PUT an existing task with a name with less than 3 characters", (done) => {
            const taskId = 1;
            const task = {
                name: "Ta",
                completed: true
            };
            chai.request(server)                
                .put("/api/v1/tasks/" + taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });        
    });
    

    /**
     * Test the PATCH route
     */

    describe("PATCH /api/v1/tasks/:id", () => {
        it("It should PATCH an existing task", (done) => {
            const taskId = 1;
            const task = {
                name: "Task 1 patch"
            };
            chai.request(server)                
                .patch("/api/v1/tasks/" + taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(1);
                    response.body.should.have.property('name').eq("Task 1 patch");
                    response.body.should.have.property('completed').eq(true);
                done();
                });
        });

        it("It should NOT PATCH an existing task with a name with less than 3 characters", (done) => {
            const taskId = 1;
            const task = {
                name: "Ta"
            };
            chai.request(server)                
                .patch("/api/v1/tasks/" + taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });        
    });
    

    /**
     * Test the DELETE route
     */
    describe("DELETE /api/v1/tasks/:id", () => {
        it("It should DELETE an existing task", (done) => {
            const taskId = 1;
            chai.request(server)                
                .delete("/api/v1/tasks/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a task that is not in the database", (done) => {
            const taskId = 145;
            chai.request(server)                
                .delete("/api/v1/tasks/" + taskId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The task with the provided ID does not exist.");
                done();
                });
        });

    });




});


