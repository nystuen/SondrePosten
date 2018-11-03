// @flow

import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import * as React from 'react';
import css from './header.css';


export class NavBar extends Component {

  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <nav className="navbar navbar-expand-lg headerColor">
        <a id="logo" className="navbar-brand text-light" href="#">SøndrePosten</a>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li>
              <NavLink activeStyle={{ fontWeight: 'bold' }} to="/cat/sports">
                <a className="navbar" href="#">Sport</a>
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={{ fontWeight: 'bold' }} to="/cat/economy">
                <a className="navbar" href="#">Økonomi</a>
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={{ fontWeight: 'bold' }} to="/cat/school">
                <a className="navbar" href="#">Skole</a>
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={{ fontWeight: 'bold' }} to="/cat/it">
                <a className="navbar" href="#">IT</a>
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={{ fontWeight: 'bold' }} to="/cat/other">
                <a className="navbar" href="#">Annet</a>
              </NavLink>
            </li>
          </ul>

        </div>

        <div className="dropdown">
          <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Administrer saker
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <NavLink activeStyle={{ fontWeight: 'bold', color: 'black' }} to="/delete">
              <a className="dropdown-item dropdownMenuItem" href="#">Slett en sak</a>
            </NavLink>
            <NavLink activeStyle={{ fontWeight: 'bold' }} to="/reg">
              <a className=" dropdownMenuItem dropdown-item" href="#">Registrer ny sak</a>
            </NavLink>
          </div>
        </div>

      </nav>

    );
  }


}
