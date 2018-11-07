import {Component} from "react-simplified";
import {NavLink} from "react-router-dom";
import * as React from 'react';
import './newCase.css';
import {TextHeader} from "../../textHeader/textHeader";
import {caseService} from "../../../services";


export class NewCase extends Component {

    case = null;

    handleSubmit = event => {

        let overskriftValue = document.getElementById("overskriftInput").value;
        let bildeValue = document.getElementById("bildeInput").value;
        let innholdValue = document.getElementById("innholdInput").value;
        let viktighetValue = document.getElementById("viktighet").value;
        let katValue = document.getElementById("kat").value;

        let newCase = {
            'overskriftInput': overskriftValue,
            'innholdInput': innholdValue,
            'bildeInput': bildeValue,
            'kategoriInput': katValue,
            'viktighetInput': viktighetValue
        };

        caseService.addCase(newCase)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.case = newCase;
            });
    };

    render() {
        return (
            <div className="container-large feed">
                <form onSubmit={this.handleSubmit}>
                    <TextHeader text="Registrer en ny sak"/>
                    <div className="input-group input-group-mb mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Overskrift</span>
                        </div>
                        <input type="text" className="form-control" placeholder="" aria-label="Overskrift"
                               aria-describedby="basic-addon1" id="overskriftInput" name="overskriftInput"/>
                    </div>

                    <div className="input-group input-group-mb mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Bildeadresse</span>
                        </div>
                        <input type="text" className="form-control" placeholder="" aria-label="Bildeadresse"
                               aria-describedby="basic-addon1" id="bildeInput" name="bildeInput"/>
                    </div>

                    <div className="input-group input-group-mb mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Innhold</span>
                        </div>
                        <textarea type="text" className="form-control" placeholder="" aria-label="innhold"
                                  aria-describedby="basic-addon1" id="innholdInput" name="innholdInput"/>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="sel1">Kategorier</label>
                            <select className="form-control" id="kat" name="kat">
                                <option>Sport</option>
                                <option>Økonomi</option>
                                <option>Samfunn</option>
                                <option>IT</option>
                                <option>Annet</option>
                            </select>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="sel2">Viktighet</label>
                            <select className="form-control" id="viktighet" name="viktighet">
                                <option>1</option>
                                <option>2</option>
                            </select>

                        </div>

                    </div>
                    <button type="submit" className="btn btn-primary">Registrer</button>
                </form>
            </div>
        );
    }
}