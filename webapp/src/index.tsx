import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import InformationPage from './components/pages/InformationPage';
import InformationPageGalleryBottom from './components/pages/InformationPageGalleryBottom';
import NotFoundPage from './components/pages/NotFoundPage';
import MaintenancePage from './components/pages/MaintenancePage';
import ErrorCollector from './ErrorCollector';
import HomePage from './components/pages/HomePage';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if(ErrorCollector.getLatestError() !== undefined) {
  root.render (
    <MaintenancePage errorMessage={ErrorCollector.getLatestError()}/>
  )
}
else {
  root.render (
    <div>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/> 
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap" rel="stylesheet"/>
      </head>
      <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFoundPage/>}></Route>
        <Route path='/' element={<App pageToShow={<HomePage/>}/>}></Route>
        <Route path='/achievements' element={<App pageToShow={<InformationPage pageName={'Постижения'}/>}/>}></Route>
        <Route path='/summerclasses' element={<App pageToShow={<InformationPageGalleryBottom pageName={'Летни Уроци'}/>}/>}></Route>
        <Route path='/maintenance' element={<MaintenancePage errorMessage={'test'}/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
