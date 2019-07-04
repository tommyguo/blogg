const express = require('express');
const app = express();
const jsonParser = require('body-parser').json();
const multer = require('multer');
const { OAuth2Client } = require('google-auth-library');

const models = require('../db/models/index.js')();

const Post = models.Post;
const Image = models.Image;

const upload = multer();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const VALID_EMAILS = ['tommyguo97@gmail.com'];

async function verifyEmail(googleIdToken) {
  const ticket = await googleClient.verifyIdToken({
    idToken: googleIdToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const payload = ticket.getPayload();
  const email = payload.email;

  if (VALID_EMAILS.includes(email)) {
    return Promise.resolve();
  } else {
    return Promise.reject();
  }
}

app.get('/api/posts', (req, res) => {
  Post.findAll({
    order: [
      ['id', 'DESC']
    ]
  })
    .then(posts => {
      res.send(posts);
    })
    .catch(() => res.sendStatus(400));
});

app.get('/api/post/:postSlug', (req, res) => {
  Post.findOne({
    where: {
      slug: req.params.postSlug
    }
  })
    .then(post => {
      res.send(post);
    })
    .catch(() => res.sendStatus(400));
});

app.post('/api/post', jsonParser, (req, res) => {
  verifyEmail(req.body.googleIdToken)
    .then(() => {
      return Post.create({
        title: req.body.title,
        description: req.body.description,
        banner: req.body.banner,
        content: req.body.content,
        slug: req.body.slug,
      });
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.get('/api/image/:imageName', (req, res) => {
  Image.findOne({
    where: {
      name: req.params.imageName
    }
  })
    .then(image => {
      res.contentType('image/jpeg');
      res.send(image.data);
    })
    .catch(() => res.sendStatus(400));
});

app.post('/api/image', upload.single('image'), (req, res) => {
  const imageName = req.body.imageName;
  const imageData = req.file.buffer;

  verifyEmail(req.body.googleIdToken)
    .then(() => {
      return Image.create({
        name: imageName,
        data: imageData,
      });
    })
    .then(() => {
      res.redirect(`/api/image/${imageName}`);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// set up http stuff
const port = 8081;
const http = require('http');
const httpServer = http.createServer(app);
httpServer.listen(port);
console.log('api server listening to port', port);