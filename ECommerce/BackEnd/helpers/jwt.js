const { expressjwt: jwtMiddleware } = require('express-jwt');

const secret = process.env.secret;
const api = process.env.API_URL;

// async function isRevoked(req, payload, done) {
//   if (!payload.isAdmin) {
//     done(null, true);
//   }
//   done();
// }

async function isRevoked(req, payload) {
  // console.log(payload.payload.isAdmin);

  if (!payload.payload.isAdmin) {
    return true; // token is revoked
  }
  return false; // token is not revoked
}

const authJwt = jwtMiddleware({
  secret: secret,
  algorithms: ['HS256'],
  isRevoked: isRevoked,
}).unless({
  path: [
    { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
    { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
    { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
    `${api}/users/login`,
    `${api}/users/register`,
  ],
});

module.exports = authJwt;
