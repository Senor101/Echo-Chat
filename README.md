# ECHO CHAT

Echo chat is a simple messaging app that lists users loggedin to a site and start a conversation with any of the listed members.

This is a minimal messaging app built with react on top of a node-express server and socket.io.The app implements a local authentication system as well as google authentication. The user data and sessions are stored in a mongodb database hosted on mongo atlas.

To run this app , in the root setup .env file with google client id client secret and mongodb uri, then run

```
npm run install
npm run watch
```

Or you can build the react app and serve it with express server running on the same port with the following command

```
npm run deploy
```

### Frameworks and libraries

This app uses mulitple libraries here are libraries used for the server.

- Express
- passport
- bcrypt
- mongoose
- socket.io
- jest
