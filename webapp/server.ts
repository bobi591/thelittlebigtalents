import { VercelRequest, VercelResponse } from "@vercel/node";

const port = process.env.REACT_APP_EXPRESS_PORT;

console.log(`Starting proxy server on port ${port}...`);

const originUrl = `http://localhost:${port}/`;
const targetUrl = process.env.REACT_APP_BACKEND_API_ENDPOINT!;

const pathAppendCode = (path: string) => {
  if (path.includes("?")) {
    return path + `&code=${process.env.REACT_APP_BACKEND_API_KEY}`;
  } else {
    return path + `?code=${process.env.REACT_APP_BACKEND_API_KEY}`;
  }
};

// Set up the proxy middleware to replace only the base URL
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const destUrl = targetUrl + pathAppendCode(req.url!);
  console.log(`Request from ${req.url} transofrmed to ${destUrl}`)
  const proxyResponse = await fetch(destUrl, {
    method: req.method,
    body: req.method !== "GET" ? req.body : undefined,
  });

  res.status(proxyResponse.status);
  proxyResponse.headers.forEach((value, name) => res.setHeader(name, value));

  const data = await proxyResponse.text();
  res.send(data);
}

console.log(`Proxy for URL ${targetUrl} created from origin ${originUrl}...`);
