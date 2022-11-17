## JWT

* Access Token: Sent as JSON
  * Client stores in memery
  * Do NOT store in local storage or cookie
  * Issued at Authorization
  * Client uses for API Access until expires
  * Verified with Middleware
  * New token issued at Refresh request

* Refresh Token: Sent as httpOnly cookie
  * Not accessible via JavaScript
  * Must have expiry at some point
  * Issued at Authorization
  * Client uses to request new Access Token
  * verified with endpoint & database
  * Must be allowed to expire or logout