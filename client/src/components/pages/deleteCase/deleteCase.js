import {Component} from "react-simplified";
import {NavLink} from "react-router-dom";
import * as React from 'react';
import {TextHeader} from '../../textHeader/textHeader';


export class DeleteCase extends Component {

    render() {
        return (
            <div className="container feed">
                <TextHeader text="Slett en sak"/>

                <div className="input-group input-group-mb mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Overskrift</span>
                    </div>
                    <input type="text" className="form-control" placeholder="" aria-label="Overskrift"
                           aria-describedby="basic-addon1" name="overskriftInput"/>
                </div>

                <div className="input-group input-group-mb mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Tidspunkt</span>
                    </div>
                    <input type="text" className="form-control" placeholder="" aria-label="Tispunkt"
                           aria-describedby="basic-addon1" name="tidspunktInput"/>
                </div>


                <button className="btn btn-primary">Slett</button>
            </div>
        );
    }

    static submit(k) {
        console.log('fetch call her:', k);
    }
}