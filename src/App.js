// import icons
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'remixicon/fonts/remixicon.css'

// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// start
import './App.css';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import Header from './components/Header';
import Main from './components/Main';

import { setCategories } from './store/store'; // Path must be correct
import store from './store/store';
import Dashboard from './components/Dashboard.jsx';


function App() {
 

  return (
    <>
      <Header />
      <Main />
     <Dashboard />
  
    
 

    </>


  );
}

export default App;
