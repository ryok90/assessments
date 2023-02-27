# Typeahead API

## Description

Typeahead or autocomplete is a common feature that people come across on websites. For example, when you are searching on Google, you will notice a word populates before you finish typing.

For this task, you'll implement the backend of a simple typeahead system. You will be provided with a list of names of people and their popularities, and the system will be capable of returning the most popular names that start with a prefix specified in the request. In addition, the system needs to allow incrementing the popularity of a specified name that is already known by the system.

For example, if the initial data is `{ "John": 21, "James": 43, "Joanna": 53, "Jazmin": 3 }` and the system receives a request with the `jo` prefix, it will return the names *Joanna* and *John*, in that order.

## Specific Requirements

### 1. Initial data

> **You must not alter the initial data given, as automated tests will assume this exact data when testing requests to your application**

The application must consider the file `names.json` in this repository as its initial data. The format of this file is `{ [name1]: [popularityOfName1], [name2]: [popularityOfName2], ... }` **without any particular order**. Note that this data is not intended to be a complete set of names that would be used in a real scenario, since that list would be huge; it's just a small enough set so you can use it efficiently during development (i.e. don't assume this file is the entire dataset).

Consider that names don't have strict rules for characters and casing. While most common names start with an uppercase letter followed by just lowercase letters (Matilda), you can also find names containing e.g. additional uppercase letters (LeBron), hyphens (Billy-Joe), or spaces in the middle of it (Mary Kate). It's best to not assume much about the nature of the names the application has to handle.

### 2. Environment

The application must consider the following environment variables when starting up:

- `PORT`: the port the application must listen on.
- `SUGGESTION_NUMBER`: the max amount of results the application should return.
- `HOST`: the host to where the application will be deployed to. This means requests to the application won't be made to `http://localhost:{PORT}` but to `http://{HOST}:{PORT}`. Some frameworks have, by default, a list of allowed hosts so that any request made to an unlisted host gets blocked. If that's the case, you need to either add the value in the HOST environment variable to your framework's allowed hosts configuration or entirely disable the allowed hosts' list so your application can listen to every host.

### 3. Persistency

The application must start with the initial data given in the JSON file, but there is an endpoint that modifies data. The persistency requirement is to just keep the updated information in memory so, as long as the application keeps running, it considers all the changes made so far; but if the application is stopped, it's ok if it starts with the original data again, as cross-restarts persistency is not a requirement.

**Example**: The initial data contains the name *Jazmin* with a popularity of 951, so if this name is included in an answer, it will consider 951 as its popularity. If the application then receives a request to increase the popularity of *Jazmin*, it will change to 952, so that's the new popularity that should be used for *Jazmin* as long as the application keeps running. If the application is restarted, though, it will again consider 951 as the popularity of *Jazmin*.

### 4. Endpoints

The application must be a **REST API** that will use JSON as the content type for both, requests and responses. It must support the following two endpoints:

#### `GET /typeahead/{prefix}`

It optionally receives a prefix in the path and returns an array of objects each one having the `name` and `times` (popularity) properties. The result contains all the names that start with the given `prefix` up to a maximum of `SUGGESTION_NUMBER` names, sorted by highest popularity (`times`) and name in ascending order if they have equal popularity, always leaving the exact match (a name that is exactly the received `prefix`) at the beginning if there is one.

If the `prefix` segment of the path is not given or it's empty (`/typeahead` or `/typeahead/`), it returns the `SUGGESTION_NUMBER` names with the highest popularity and name ascending in case of equal popularity.

This endpoint must consider the `prefix` in a case insensitive way (so you get the same results for `JA`, `Ja`, `jA` or `ja`) but the responses must always return the names in the original casing (as they appear in the initial data).

##### Examples

```bash
$ curl -X GET http://{HOST}:{PORT}/typeahead/ja

[{"name":"Janetta","times":973},{"name":"Janel","times":955},{"name":"Jazmin","times":951},{"name":"Janette","times":947},{"name":"Janet","times":936},{"name":"Janeva","times":929},{"name":"Janella","times":916},{"name":"Janeczka","times":915},{"name":"Jaquelin","times":889},{"name":"Janaya","times":878}]
```

```bash
$ curl -X GET http://{HOST}:{PORT}/typeahead/jan

[{"name":"Jan","times":296},{"name":"Janetta","times":973},{"name":"Janel","times":955},{"name":"Janette","times":947},{"name":"Janet","times":936},{"name":"Janeva","times":929},{"name":"Janella","times":916},{"name":"Janeczka","times":915},{"name":"Janaya","times":878},{"name":"Janine","times":858}]
```

#### `POST /typeahead`

It receives a JSON object with a name as the request body (example: `{ "name": "Joanna" }`), increases the popularity for that name in 1, and returns a `201` status code with an object with `name` and `times` properties considering the new state.

If the given name does not exist in the initial data (`names.json`) then this endpoint should return a 400 HTTP error (no new names will be added, it will only increase the popularity of existing names).

This endpoint must be case insensitive, so request for `{ "name": "JOANNA" }`, `{ "name": "Joanna" }` and `{ "name": "JoAnNa" }` should all work to increase the popularity value for *Joanna*, but the returned name in this request should always be in the original casing.

##### Example

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"name": "Joanna"}' http://{HOST}:{PORT}/typeahead

{"name":"Joanna","times":441}
```

### 5. Performance

Performance is very important in systems like this application. The application should respond to requests in a fast way while being able to support a high amount of concurrent requests. While there are many different ways in which we can implement a typeahead system, not all of them will have the same performance. There is a particular data structure that provides very fast responses without requiring a lot of memory: the **prefix tree** (also known as Trie).

So, with performance in mind, another requirement is to build this system by **implementing a Prefix Tree (or similar structure) adapted to this context**. Note that this also means there will be **no database system in this project**, as the data needed for this system will be stored in this in-memory data structure. A reasonably good implementation of a prefix tree in this context can be more performant than an SQL query in a relational database.

Although there are no more explicit performance related requirements, we encourage you to be mindful of performance when making design and implementation decisions in this task.

## How to work on the task

### Before you start

1. Choose a stack to work on this task. Our advice is to consider both, the positions you are aiming for after this evaluation and the familiarity with the stack. If you are interested in Node.js positions, then it would be great to choose a Node.js framework. But it's also important that you feel comfortable enough with this framework so you don't have to spend much time learning about it. Properly using and taking advantage of the framework you choose is also important in the evaluation.
2. Make the `Dockerfile` able to create a container that can run your application. We'll need this to properly test your application. The `Dockerfile` that comes with the project can run a common Node.js application that starts with an `index.js` file, but Docker is not what we want to evaluate. So if you are using a different stack, take a look [here](https://github.com/matilda-applicants/common-tasks-instructions/wiki/Docker-on-your-task) where we have published other `Dockerfile`s for other common stacks, or ask us for help if your stack is not there and you are not able to get the container running. In any case, familiarizing yourself with Docker is still a very good investment of time no matter what specific engineering role you have.
3. Don't forget to change the `.gitignore` file in this repository to the one you use for your stack. The initial one on this repository should cover all the common ignores for Node.js stacks, so adapt it to the one you chose. This is important so you avoid uploading to your repository all your dependencies, logs, and such.

### Automated tests

Whenever you push commits to the `master` branch, you will trigger our automated tests. See [here](https://github.com/matilda-applicants/common-tasks-instructions/wiki/Automatic-task-validation) for details on how to check the automated tests results and, in case of a failure, see useful logs that will help you debug your code.

The `master` branch is thus special. These automated tests are not meant to do TDD; you can do TDD if you want, but with your tests :). You should treat pushes to `master` as you would treat production deployments. If the automated tests fail, it means the current code is not complying with the requirements, so it's like a production bug, and the logs covered in red are your users' complaints. You don't want that, do you? Feel free to use any other branch on this repository, as well as the pull requests and issues if you need to. Just be mindful about what you push to `master`.

### Submitting your task

Before you submit your task, you need to make sure the tests on your `master` branch's latest commit (HEAD) are successful. The code you will submit will be just that: the latest commit on `master`.

We also ask you to send us a short screencast (~3-5 mins is perfectly fine) explaining your solution, highlighting the challenges you had, how you solved them, interesting features of your solution, and so on. So, when you are ready, just **let us know** at engineers@matildaexp.com with a link to see the screencast, and we'll proceed with the human revision.

**Tip**: You can record and share your screencast in any way you prefer, as long as you end up with a link you can send us to see the video. But in case you don't have a tool for this, a very simple one is [Loom](https://www.loom.com/), which is free for less than 5-min videos.

## Evaluation

The automated tests cover a large number of cases, so if your application is green, it will likely be a correct solution (returns a correct response for any given input). We will only continue with manually evaluating your submission if the application has a green status.

Although this is a fictitious and reasonably short task, we expect you to implement it as you would in a real job. The goal is to get an idea of how you would contribute to an engineering team. For this evaluation, we will focus on the following indicators:

- **design**: decisions you made in terms of architecture, interfaces, data management, algorithms, directories structure, etc.
- **code**: the code is readable and maintainable, it uses good practices and principles, consistent style, etc.
- **performance**: we don't expect the most performant solution possible, nor early optimizations, but we do expect you to be mindful of performance when writing code.
- **tries**: how many automated tests runs did you need to get to a green status; automated tests are a reflection of these requirements, so reaching a green status means you were able to properly understand them and implement them in a bug-free way.

If you have any questions about this assessment, feel free to write to us at [engineers@matildaexp.com](mailto:engineers@matildaexp.com)

Have fun!
