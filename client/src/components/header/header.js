// @flow

import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import * as React from 'react';
import css from './header.css';
import { Category } from '../types/types';
import { caseService } from '../../services';
import { Alert } from '../alerts/alerts';

export class NavBar extends Component {
  categories: Category[] = [];

  componentDidMount() {
    caseService
      .getCategories()
      // $FlowFixMe
      .then(categories => (this.categories = categories.data))
      .catch((error: Error) => Alert.danger(error.message));
  }

  render() {
    return (
      <nav className=" header navbar navbar-expand-lg navbar-inverse headerColor container-fluid">
        <div className="container-fluid">
          <a id="logo" className="navbar-brand text-light" href="#">
            SøndrePosten
          </a>

          <i
            className="fas fa-bars fa-2x whiteLogo navbar-toggle collapse"
            id="hamburgerIcon"
            data-toggle="collapse"
            data-target="#myNavbar"
          />

          <div className="navbar-collapse collapse.show " id="myNavbar" data-target="#myNavbar">
            <ul className="navbar-nav">
              {this.categories.map(s => (
                <li key={s.kategori + 'Item'}>
                  <NavLink
                    key={s.kategori}
                    className="navbar"
                    activeStyle={{ fontWeight: 'bold' }}
                    to={`/kat/${s.kategori.toLocaleLowerCase()}`}
                    replace
                  >
                    {s.kategori}
                  </NavLink>
                </li>
              ))}
            </ul>

            <NavLink className="" activeStyle={{ fontWeight: 'bold' }} to="/reg">
              Registrer ny sak
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}
