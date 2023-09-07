// ** Auth Endpoints
export default {
  loginEndpoint: 'users/login/',
  // registerEndpoint: '/jwt/register',
  refreshEndpoint: 'users/token/refresh/',
  logoutEndpoint: 'users/logout/',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}

// export default {
//   loginEndpoint: '/jwt/login',
//   registerEndpoint: '/jwt/register',
//   refreshEndpoint: '/jwt/refresh-token',
//   logoutEndpoint: '/jwt/logout',

//   // ** This will be prefixed in authorization header with token
//   // ? e.g. Authorization: Bearer <token>
//   tokenType: 'Bearer',

//   // ** Value of this property will be used as key to store JWT token in storage
//   storageTokenKeyName: 'accessToken',
//   storageRefreshTokenKeyName: 'refreshToken'
// }