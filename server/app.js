const express = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const searchRouter = require('./routes/search');
const authRouter = require('./routes/auth');

const app = express();
const ssl = '443';
const port = '80';
try {
  const option = {
    ca: fs.readFileSync('/etc/letsencrypt/live/codeflights.xyz/fullchain.pem'),
    key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/codeflights.xyz/privkey.pem'), 'utf8').toString(),
    cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/codeflights.xyz/cert.pem'), 'utf8').toString(),
  };

  HTTPS.createServer(option, app).listen(ssl);
} catch (error) {
  console.error('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
  console.warn(error);
}

app.use(session({
  secret: 'codeflightsLTD@',
  resave: false,
  saveUninitialized: true,

  cookie: {
    sameSite: 'none',
    secure: true,
  },
}));

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.get('/', (req, res) => {
  res.send('hi');
});

app.use('/user', usersRouter);
app.use('/post', postRouter);
app.use('/search', searchRouter);
app.use('/auth', authRouter);
app.listen(port);
