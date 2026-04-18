const http = require('http');
const data = JSON.stringify({ name: 'Test User', email: 'testuser1@example.com', password: 'Test1234' });
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', chunk => { body += chunk; });
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    console.log(body);
  });
});

req.on('error', e => console.error('REQ ERR', e));
req.write(data);
req.end();
