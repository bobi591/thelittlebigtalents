import express from 'express'
import dotenv from 'dotenv'
import {createProxyMiddleware} from 'http-proxy-middleware'

const server = express()
dotenv.config()

const port = process.env.PORT ? Number(process.env.PORT) + 1 : 3001

console.log(`Starting proxy server on port ${port}...`)

const originUrl = `http://localhost:${port}/`
const targetUrl = process.env.REACT_APP_BACKEND_API_ENDPOINT!;

// Set up the proxy middleware to replace only the base URL
server.use(
    '/',
    createProxyMiddleware({
        target: targetUrl,
        changeOrigin: true,
        logger: console,
        pathRewrite: (path) => path = path + `?code=${process.env.REACT_APP_BACKEND_API_KEY}`
    })
);

console.log(`Proxy for URL ${targetUrl} created from origin ${originUrl}...`)

server.listen(port)