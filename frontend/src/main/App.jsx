import './App.css'

import Footer from "../components/template/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

const props = () => (
  <BrowserRouter>

    <div className="app">
      <Routes />

     
    </div>
    <Footer />
  </BrowserRouter>

)
export default props
