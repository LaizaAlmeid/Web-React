import "./Header.css";
import "./Logo.css";
import logo from '../../assets/images/prancheta.png';
import { Link } from "react-router-dom";

import React from "react";

const props = ()=>(
  <header className="header d-none d-sm-flex flex-column">
    <aside className="logo">
      <Link to="/" className="logo row">
        <img className="col-xs-3 col-md-2" src={logo} alt="logo" />
        <h1 className="col-xs-12 col-md-7">LISTA DE ESTOQUE</h1>
      </Link>
      <div class="container">    
      <ul class="nav nav-tabs justify-content-center">
        <li class="nav-item">
          <a class="nav-link active" href="/">Sobre</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="/produtos">Cadastro</a>
        </li>      
      </ul>
      </div>
    </aside>
  </header>
)
export default props