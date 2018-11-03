import {Component} from "react-simplified";
import {NavLink} from "react-router-dom";
import * as React from 'react';
import './newCase.css';
import TextHeader from '../../textHeader/textHeader';


class NewCase extends Component {

    render() {
        return (
            <div className="container feed" >
                <TextHeader text="Registrer en ny sak"/>

                    <div className="input-group input-group-mb mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Overskrift</span>
                        </div>
                        <input type="text" className="form-control" placeholder="" aria-label="Overskrift"
                               aria-describedby="basic-addon1" name="overskriftInput"/>
                    </div>

                    <div className="input-group input-group-mb mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Bildeadresse</span>
                        </div>
                        <input type="text" className="form-control" placeholder="" aria-label="Bildeadresse"
                               aria-describedby="basic-addon1"name="bildeInput"/>
                    </div>

                    <div className="input-group input-group-mb mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Innhold</span>
                        </div>
                        <textarea type="text" className="form-control" placeholder="" aria-label="innhold"
                                  aria-describedby="basic-addon1"  name="innholdInput"/>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="sel1">Kategorier</label>
                            <select className="form-control" id="kat">
                                <option>Sport</option>
                                <option>Økonomi</option>
                                <option>Skole</option>
                            </select>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="sel1">Viktighet</label>
                            <select className="form-control" id="viktighet">
                                <option>1</option>
                                <option>2</option>
                            </select>

                        </div>

                    </div>
                    <button className="btn btn-primary">Registrer</button>
            </div>
        );
    }

    static submit(k) {
        console.log('fetch call her:', k);
    }



}

export default NewCase;