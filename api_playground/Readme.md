# API Playground (HW 3)

This is a collection of small APIs created with Node.JS + Express and using testing frameworks such as **mocha**, **chai**, **supertest**, and **c8** to implement unit tests. TDD was implemented, meaning functions were created based on the unit test specifications.

## How to run

Head to the **api_playground** folder and run.

```bash
npm install
```
You can explore all available scripts in **package.json** file, but for simply running all the tests, you can run.

```bash
npm test
```
## Test Coverage

You can get a full test coverage report by running *(currently at 97.68%)*

```bash
npm run test-with-coverage
```
## Endpoints
You can manipulate with the tasks via **GET,POST,PUT,PATCH,DELETE** methods and */api/v1/tasks* , */api/v1/tasks/:id* endpoints

## Contributing
Pull requests are welcomed :)
## License
[MIT](https://choosealicense.com/licenses/mit/)