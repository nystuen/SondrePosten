import {Component} from "react-simplified";
import * as React from 'react';
import './footer.css';

export class Footer extends Component<>{
    render(){
        return(
            <footer className="page-footer font-small blue bg-light footer">
                <div className="footer-copyright text-center py-3">© 2018 Copyright:
                    <p>Ådne Nystuen</p>
                </div>
            </footer>
        );
    }
}

