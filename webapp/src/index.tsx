import 'bootstrap/dist/css/bootstrap.min.css'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { hydrate, render } from 'react-dom'
import App from './App'
import './App.css'
import './index.css'
import reportWebVitals from './reportWebVitals'

TimeAgo.addDefaultLocale(en)

const root = document.getElementById('root') as HTMLElement

if (root.hasChildNodes()) {
    hydrate(<App />, root)
} else {
    render(<App />, root)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
