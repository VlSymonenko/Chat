# Chat
### Installation

Requirements : [Node.js](https://nodejs.org/) to run and [npm](https://www.npmjs.com/get-npm) installed.
Also we need : [express](https://expressjs.com/en/starter/installing.html) , socket.io , [body-parser](https://www.npmjs.com/package/body-parser) , [mongodb](https://github.com/mongodb/node-mongodb-native) and [nodemon](https://www.npmjs.com/package/nodemon) installed.


```bash
$ create-react-app chatroom && cd chatroom
$ npm init 
$ mkdir backend
```
Now you can replaice your files with my.

For production environments...

```bash
$ npm install --production
$ NODE_ENV=production node app
```
#### Launch
To start open command promt and type:
```bash
$  start && nodemon
Than AltTab to previous comand promt and type :
```
```bash
$ npm start
```
#### Testing
We have user interface on http://localhost:3000 and server on http://localhost:8080.

To see all data (in console ) that was saved you need to include findDocs function into server.js from db.js module and deleteAllData if you want to delete all data from your db. When we push Send button at UI we automatically create POST request to http://localhost:8080/user and if it have email and name that fits our validation rules it will be saved in your db and you will receive special message in your comand promt. If we want to receive a single message by special id we go to http://localhost:8080/api/messages/single/{yourSpecialId} and assign yourSpecialId. If we want to receive all messages with pagination by 10 we go to http://localhost:8080/api/messages/list/{paginationID} and assign paginationID. For example 2 will output messages from 20th to 30th.Also if you want to have only messages text just see comments in special method at db.js.

### Todos
 - Optimise Code
 - Write MORE Tests
 - Improve UI

License
----

MIT
