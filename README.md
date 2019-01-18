# Visual Survivor

> A visual snapshot of each castaway's status at the end of each episode of [Survivor](https://en.wikipedia.org/wiki/Survivor_(U.S._TV_series)).

![INSERT YOUR GRAPHIC HERE](https://i.imgur.com/R9g2zrj.gif)

---

## Installation
### Prerequisites
* Node Package Manager (npm)

### Clone

- Clone this repo to your local machine using `https://github.com/zlaughton/visual-survivor.git`

### Setup

1. For both frontend and backend, change to the respective directory, install the dependencies, then start with `npm start`
```shell
$ cd frontend
$ npm install
$ npm start
```
```shell
$ cd backend
$ npm install
$ npm start
```
2. Access the frontend at `localhost:3001`, and backend at `localhost:5000`

_Note: The frontend can be run locally, connecting to the hosted backend on the internet. The backend, however requires access to a database. Currently, there is not a public database of the Visual Survivor data available for local testing._

---

## Features
Select an episode of any season available on the database to see...
* Current castaways and their tribe
* Current advantages
* Former voted out castaways and jury members

## Usage
### Backend
Use the following URL endpoints to collect data in a JSON response:
* **`backend-url/seasons`** - Get available seasons in the database
* **`backend-url/?season=<season-number>`** - Get the episode data for the specified season


## Built with
* Frontend
  * [Create React App](https://github.com/facebook/create-react-app)
* Backend
  * [Node.js](https://nodejs.org/en/)
  * [Express](https://expressjs.com/)
  * [PostgreSQL](https://www.postgresql.org/)

---

## Contributing

Feel free to fork, clone, and submit pull requests! Check out the "issues" to see what I'm looking to add, or email me at me@zaklaughton.com if you have any cool ideas to pitch!

---

## Authors

| <a href="https://github.com/zlaughton" target="_blank">**Zak Laughton**</a> |
| :---: |
| [![Zak Laughton profile pic](https://avatars0.githubusercontent.com/u/3655666?s=200&v=4)](https://github.com/zlaughton)    |
| <a href="https://github.com/zlaughton" target="_blank">`https://github.com/zlaughton`</a>|