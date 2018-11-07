// @flow

import {Component} from 'react-simplified';
import {NavLink} from 'react-router-dom';
import * as React from 'react';
import css from './header.css';


export class NavBar extends Component {
    render() {
        return (

            <nav className="header navbar navbar-expand-lg navbar-inverse headerColor">
                <div className="container-fluid">

                    <a id="logo" className="navbar-brand text-light" href="#">SøndrePosten</a>

                    <div className="navbar-header">
                        <img id="hamburgerIcon" src="hamburger.png" className="navbar-toggle" data-toggle="collapse"
                             data-target="#myNavbar"/>
                        <a href="#"><i className="fa fa-trash"></i></a>
                    </div>

                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="navbar-nav">
                            <li>
                                <NavLink activeStyle={{fontWeight: 'bold'}} to="/kat/sport">
                                    <a className="navbar" href="#">Sport</a>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink activeStyle={{fontWeight: 'bold'}} to="/kat/økonomi">
                                    <a className="navbar" href="#">Økonomi</a>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink activeStyle={{fontWeight: 'bold'}} to="/kat/samfunn">
                                    <a className="navbar" href="#">Samfunn</a>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink activeStyle={{fontWeight: 'bold'}} to="/kat/it">
                                    <a className="navbar" href="#">Teknologi</a>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink activeStyle={{fontWeight: 'bold'}} to="/kat/annet">
                                    <a className="navbar" href="#">Annet</a>
                                </NavLink>
                            </li>

                        </ul>
                                <NavLink activeStyle={{fontWeight: 'bold'}} to="/reg">
                                    <a href="#">Registrer ny sak</a>
                                </NavLink>
                    </div>
                </div>
            </nav>
        );
    }
}
