// @flow
import * as React from 'react';
import { Component } from 'react-simplified';

import {Alert} from '../../widgets';
import {caseService} from '../../services';
import {Category} from '../types/types';


export class CategoriesList extends Component {
  categories: Category[] = [];

  componentDidMount() {
    caseService
      .getCategories()
      // $FlowFixMe
      .then(categories => (this.categories= categories.data))
      .then(console.log(this.categories))
      .catch((error: Error) => Alert.danger(error.message));
  }

  render() {
    return (
      <select className="form-control" id="kat" name="kat">
        {this.categories.map(s => (
          <option> {s.kategori} </option>
        ))}

      </select>
    );
  }
}
