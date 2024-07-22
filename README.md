# JWT Website

_A Next.js app that provides routes to easily and quickly encode data to JWTs (Json Web Tokens), decode data and verify JWTs. This app uses the [jose](https://www.npmjs.com/package/jose) package under the hood_

## Encoding Algorithms

| **Supported Algorithms** |
| ------------------------ |
| HS256                    |
| HS384                    |
| HS512                    |
| PS256                    |
| PS384                    |
| PS512                    |
| RS256                    |
| RS384                    |
| RS512                    |
| ES256                    |
| ES384                    |
| ES512                    |
| EdDSA                    |

## Endpoints

**The api can be accessed at https://jwt.apis.lol/**

### 1. Encode JWT

**Route:** `/api/jwt/encode`

**Method:** `POST`

**Description:** This endpoint takes a data object and encodes it to a JWT with provided options in the request body

**Example Request Body:**

```json
{
  "secret": "3Flr20py70ruEpZPCwWAAx2BgDyh0Xc$i&aSIeEtqHB*8&mSw%AuTvrRLUOZ^K%3", // The JWT secret
  "expiry": 7200, // The time for the JWT to expire (seconds)
  "algorithm": "HS256", // The algorithm to encode the JWT with
  "data": {
    "id": 1,
    "username": "PeanutDumplings"
  }
}
```

**Example Successful Response:**

```json
{
  "success": true,
  "message": "Successfully encoded JWT",
  "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJQZWFudXREdW1wbGluZ3MiLCJpYXQiOjE3MjE2NDMyODcsImV4cCI6MTcyMTY1MDQ4N30.lq_BcbpXyfjtxhZ8OgDj15Y_QknFWsJEhaf9T8ZkQWQ"
}
```

### 2. Decode JWT

**Route:** `/api/jwt/decode`

**Method:** `POST`

**Description:** This endpoint decodes the data, given a jwt. No secret is required.

**Example Request Body:**

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJQZWFudXREdW1wbGluZ3MiLCJpYXQiOjE3MjE2NDMyODcsImV4cCI6MTcyMTY1MDQ4N30.lq_BcbpXyfjtxhZ8OgDj15Y_QknFWsJEhaf9T8ZkQWQ"
}
```

**Example Successful Response:**

```json
{
  "success": true,
  "message": "Successfully decoded JWT",
  "data": {
    "id": 1,
    "username": "PeanutDumplings",
    "iat": 1721643287,
    "exp": 1721650487
  }
}
```

### 3. Verify JWT

**Route:** `/api/jwt/verify`

**Method:** `POST`

**Description:** This endpoint takes a JWT and the secret in which the JWT was encoded with and verifies the signature of the JWT.

**Example Request Body:**

```json
{
  "secret": "test",
  "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJQZWFudXREdW1wbGluZ3MiLCJpYXQiOjE3MjE2NDMyODcsImV4cCI6MTcyMTY1MDQ4N30.lq_BcbpXyfjtxhZ8OgDj15Y_QknFWsJEhaf9T8ZkQWQ"
}
```

**Example Successful Response:**

```json
{
  "success": true,
  "message": "Successfully verified JWT"
}
```
