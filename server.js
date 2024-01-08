const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let users = [];
let recentPosts = [];

app.post('/save-username', (req, res) => {
  const { username } = req.body;

  if (username) {
    users.push({ username });
    console.log('Имя пользователя сохранено успешно:', username);
    res.status(200).json({ message: 'Имя пользователя сохранено успешно.' });
  } else {
    console.log('Ошибка: Имя пользователя не было предоставлено.');
    res.status(400).json({ message: 'Ошибка: Имя пользователя не было предоставлено.' });
  }
});

app.post('/save-post', (req, res) => {
  const { author, postText, timestamp } = req.body;

  if (author && postText && timestamp) {
    recentPosts.push({ author, postText, timestamp });
    console.log('Пост успешно сохранен:', { author, postText, timestamp });
    res.status(200).json({ message: 'Пост успешно сохранен.' });
  } else {
    console.log('Ошибка: Не все данные о посте были предоставлены.');
    res.status(400).json({ message: 'Ошибка: Не все данные о посте были предоставлены.' });
  }
});

app.get('/get-recent-posts', (req, res) => {
  res.status(200).json({ posts: recentPosts });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/me.html', (req, res) => {
  res.sendFile(__dirname + '/me.html');
});
