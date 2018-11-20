// @flow

import { Component } from 'react-simplified';
import * as React from 'react';
import './footer.css';

export class Footer extends Component<> {
  render() {
    return (
      <footer className="page-footer font-small special-color-dark pt-4 contact">
        <div className="container cotact">
          <ul className="list-unstyled list-inline text-center">
            <li className="list-inline-item">
              <a className="btn-floating btn-fb mx-1" href="#">
                <i className="fab fa-facebook-f fa-2x" />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-tw mx-1" href="#">
                <i className="fab fa-instagram fa-2x" />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-tw mx-1" href="#">
                <i className="fab fa-twitter fa-2x" />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-li mx-1" href="#">
                <i className="fab fa-linkedin-in fa-2x" />
              </a>
            </li>
            <li className="list-inline-item">
              <a className="btn-floating btn-dribbble mx-1" href="#">
                <i className="fab fa-pinterest fa-2x " />
              </a>
            </li>
          </ul>
        </div>

        <div className="copyright text-center py-3">© 2018 Copyright: Ådne Nystuen</div>
      </footer>
    );
  }
}
