import express from 'express'
import dotenv from 'dotenv'
import {createProxyMiddleware} from 'http-proxy-middleware'

const server = express()
dotenv.config()

const port = process.env.REACT_APP_EXPRESS_PORT

console.log(`Starting proxy server on port ${port}...`)

const originUrl = `http://localhost:${port}/`
const targetUrl = process.env.REACT_APP_BACKEND_API_ENDPOINT!;

const pathAppendCode = (path: string) => {
    if(path.includes("?")){
        return path + `&code=${process.env.REACT_APP_BACKEND_API_KEY}`
    }
    else {
        return path + `?code=${process.env.REACT_APP_BACKEND_API_KEY}`
    }
}

// Set up the proxy middleware to replace only the base URL
server.use(
    '/',
    createProxyMiddleware({
        target: targetUrl,
        changeOrigin: true,
        logger: console,
        pathRewrite: (path) => pathAppendCode(path)
    })
);

console.log(`Proxy for URL ${targetUrl} created from origin ${originUrl}...`)

server.listen(port)