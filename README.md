A web app that processes twitter data, creates a histogram of countries mentioned in a group of tweets, creates a pie chart of that data and then samples tweets by the associated twitter handle at regular intervals, while updating in real time. The live updating version is in branch "liveupdating". App uses NodeJS, ReactJS, Express, socket.io and the Twitter api.
Start app by running:

```
gulp
```
then, in a separate terminal window run:

```
node app
```

then open the app at localhost:3000
