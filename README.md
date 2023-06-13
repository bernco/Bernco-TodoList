# Todo-it 📜

Todo-it is a simple web application that allows users to manage their to-do lists.

## Features

- Create regular todo list and custom todo list with unique URLs to share with others.
- Add and delete tasks
- Save all tasks to database
- Check completed tasks


<img width="425" alt="image" src="https://user-images.githubusercontent.com/34935967/235780018-7acc4830-2e13-4c47-8f92-fe0d6317bd9f.png">


## Tech Stack

### Front-end

The front-end of Todo-it is built using HTML, CSS, JavaScript, and the EJS templating engine. EJS allows for dynamic rendering of content and enables the application to communicate with the server using HTTP requests.

### Back-end

The back-end of Todo-it is built using Node.js and the Express framework. Node.js provides a fast and efficient runtime for server-side JavaScript, while Express makes it easy to create web applications with a minimal amount of boilerplate code. 

### Database

The database is powered by MongoDB, a popular NoSQL database system. MongoDB's flexible document-oriented data model allows for easy storage and retrieval of structured data, making it a good choice for applications like Todo-it.

<img width="427" alt="image" src="https://user-images.githubusercontent.com/34935967/235779656-02baada8-6004-48c0-802b-5730f2e5fc75.png">

## Installation

To run Todo-it on your local machine, follow these steps:

1. Clone the repository from GitHub
2. Install Node.js and npm (if you haven't already)
3. Install the required dependencies by running `npm install` in the project directory
4. Start the server by running `npm start`
5. Visit `http://localhost:3000` in your web browser to view the app

## Usage

To create a new task, simply enter a task description in the "New Task" input field and click the "➕" button. To mark a task as complete, click the checkbox next to the task description and delete. 

To create a custom to-do list, append `/q/{listname}` to the endpoint, where `{listname}` is a name of your choosing (e.g. `/q/work`). This will create a new to-do list with a unique URL that can be shared with others. 

## Contributing

We welcome contributions from the community! If you notice a bug or have an idea for a new feature, please submit an issue or pull request on GitHub. 

## License

Todo-it is licensed under the MIT license. See the LICENSE file for details.
