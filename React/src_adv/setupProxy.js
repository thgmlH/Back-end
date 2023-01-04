const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api', {  //도메인 api로 호출
      target: process.env.REACT_APP_HOST, //통신할 서버의 도메인주소
      changeOrigin: true,
    })
  )
}
//
//http://localhost:8000/