// @flow

import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import * as React from 'react';
import css from './header.css';


export class NavBar extends Component {
  render() {
    return (

      <nav className="header navbar navbar-expand-lg navbar-inverse headerColor">
        <div className="container-fluid">

          <a id="logo" className="navbar-brand text-light" href="#">SøndrePosten</a>

          <img id="hamburgerIcon" src="hamburger.png" className="navbar-toggle" data-toggle="collapse"
               data-target="#myNavbar"/>

          <div className="collapse navbar-collapse" id="myNavbar" data-target="#myNavbar">

            <ul className="navbar-nav">
              <li>
                <NavLink className="navbar" activeStyle={{ fontWeight: 'bold' }} to="/kat/sport">Sport</NavLink>
              </li>
              <li>
                <NavLink className="navbar" activeStyle={{ fontWeight: 'bold' }} to="/kat/økonomi">Økonomi</NavLink>
              </li>
              <li>
                <NavLink className="navbar" activeStyle={{ fontWeight: 'bold' }} to="/kat/samfunn">Samfunn</NavLink>
              </li>
              <li>
                <NavLink className="navbar" activeStyle={{ fontWeight: 'bold' }} to="/kat/it">Teknologi</NavLink>
              </li>
              <li>
                <NavLink className="navbar" activeStyle={{ fontWeight: 'bold' }} to="/kat/annet">Annet</NavLink>
              </li>
            </ul>

            <NavLink className="navbar" activeStyle={{ fontWeight: 'bold' }} to="/reg">Registrer ny sak</NavLink>
            
          </div>
        </div>
      </nav>
    );
  }
}
