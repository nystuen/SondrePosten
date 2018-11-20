// @flow
import * as React from 'react';
import { Component } from 'react-simplified';

import { Alert } from '../alerts/alerts';
import { caseService } from '../../services';
import { Category } from '../types/types';

export class CategoriesList extends Component<{ currentCat?: string }> {
  categories: Category[] = [];

  componentDidMount() {
    caseService
      .getCategories()
      // $FlowFixMe
      .then(categories => (this.categories = categories.data))
      .then(console.log(this.props.currentCat))
      .catch((error: Error) => Alert.danger(error.message));
  }

  render() {
    return (
      <div>
        <select alt="Kategoriliste" className="form-control" id="kat">
          {this.categories.map(s =>
            this.props.currentCat == s.kategori ? (
              <option alt="Kategorivalg" selected="selected"> {s.kategori} </option>
            ) : (
              <option alt="Kategorivalg"> {s.kategori}</option>
            )
          )}
        </select>
      </div>
    );
  }
}
