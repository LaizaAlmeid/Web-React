import "./Logo.css";
import React from "react";
import logo from '../../assets/images/prancheta.png';


export default (props) => 
  <aside className="logo">
    <a href="/" className="logo row">
      <img className="col-xs-3 col-md-2" src={logo} alt="logo" />
      <h1 className="col-xs-12 col-md-5">LISTA DE ESTOQUE</h1>
    </a>
    
  </aside>

