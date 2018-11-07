// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import {Component} from 'react-simplified';
import {HashRouter, Route, NavLink} from 'react-router-dom';
import {Alert} from './widgets';
import {caseService, studentService} from './services';
import {CaseFeed} from './components/caseFeed/caseFeed';
import {Case} from "./components/case/case";
import {NavBar} from "./components/header/header";
import {LiveFeed} from "./components/header/liveFeed";
import {Footer} from "./components/footer/footer";
import {Category} from "./components/pages/category/category";
import {NewCase} from "./components/pages/newCase/newCase";
import {DeleteCase} from "./components/pages/deleteCase/deleteCase";

// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
    let script = document.createElement('script');
    script.src = '/reload/reload.js';
    if (document.body) document.body.appendChild(script);
}
import createHashHistory from 'history/createHashHistory';

export const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


class Menu extends Component {
    render() {
        return (
            <table>
                <tbody>
                <tr>
                    <td>
                        <NavLink activeStyle={{color: 'darkblue'}} exact to="/">
                            React example
                        </NavLink>
                    </td>
                    <td>
                        <NavLink activeStyle={{color: 'darkblue'}} to="/students">
                            Students
                        </NavLink>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

class Home extends Component {
    render() {
        return <div>React example with component state</div>;
    }
}

class StudentList extends Component {
    students = [];

    render() {
        return (
            <ul>
                {this.students.map(student => (
                    <li key={student.email}>
                        <NavLink activeStyle={{color: 'darkblue'}} exact to={'/students/' + student.id}>
                            {student.firstName} {student.lastName}
                        </NavLink>{' '}
                        <NavLink activeStyle={{color: 'darkblue'}} to={'/students/' + student.id + '/edit'}>
                            edit
                        </NavLink>
                    </li>
                ))}
            </ul>
        );
    }

    mounted() {
        studentService
            .getStudents()
            .then(students => (this.students = students))
            .catch((error: Error) => Alert.danger(error.message));
    }
}


const root = document.getElementById('root');
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>

                <Alert/>
                <NavBar/>
                <LiveFeed/>
                <Route exact path="/" component={CaseFeed}/>
                <Route path="/reg" component={NewCase}/>
                <Route path="/delete" component={DeleteCase}/>
                <Route exact path="/case/:id" component={Case}/>
                <Route exact path="/kat/:kat" component={Category}/>
                <Footer/>

            </div>
        </HashRouter>,
        root
    );
