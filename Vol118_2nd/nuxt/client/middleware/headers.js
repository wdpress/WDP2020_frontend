const headerMiddleware = (req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'")
  next()
}

export default headerMiddleware
