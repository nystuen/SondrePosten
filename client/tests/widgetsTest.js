// @flow

import * as React from 'react';
import { Alert } from '../src/components/alerts/alerts.js';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import { CaseObject } from '../src/components/types/types';
import { Button } from '../src/components/button/button';
import { CardPreview } from '../src/components/card/cardPreview';

describe('Testing cardPreview', () => {
  let wrapper, aCase;

  beforeEach(() => {
    aCase = new CaseObject('overskrift', 'bildeadresse.jpg', 'bildetekst', 'innhold', 'sport', 1);
    aCase.setId(1);
    wrapper = shallow(<CardPreview case={aCase} />);
  });

  it('Testing if the cardpreview contains overskrift', () => {
    expect(wrapper.find('#overskrift').text()).toEqual('overskrift');
  });

  it('Testing if the cardpreview contains the correct image', () => {
    expect(wrapper.find('#bilde').prop('src')).toEqual('bildeadresse.jpg');
  });

  it('Testing if clicking the navlink sends me to the correct case', () => {
    expect(wrapper.find('#linkBtn').prop('to')).toEqual('/sak/1');
  });

  it("Testing if CardPreview's case prop is equal to the case passed in.", () => {
    expect(wrapper.instance().props.case).toEqual(aCase);
  });
});

describe('Test for Button component', () => {
  let wrapper, buttonType, buttonSpy, children;

  beforeEach(() => {
    buttonType = 'danger';
    buttonSpy = spy();
    children = 'clickMe';
    wrapper = shallow(<Button id="button" type={buttonType} onClick={() => buttonSpy} children={children} />);
  });

  it('Testing clicking button', () => {
    wrapper.find('#button').simulate('click');
    expect(buttonSpy.called);
  });

  it('Testing that button get correct classname', () => {
    expect(wrapper.find('button').prop('className')).toEqual('btn btn-danger');
  });
});

describe('Alert tests', () => {
  const wrapper = shallow(<Alert />);

  it('initially', () => {
    let instance: ?Alert = Alert.instance();
    expect(typeof instance).toEqual('object');
    if (instance) expect(instance.alerts).toEqual([]);

    expect(wrapper.find('button.close')).toHaveLength(0);
  });

  it('after danger', done => {
    Alert.danger('test');

    setTimeout(() => {
      let instance: ?Alert = Alert.instance();
      expect(typeof instance).toEqual('object');
      if (instance) expect(instance.alerts).toEqual([{ text: 'test', type: 'danger' }]);

      expect(wrapper.find('button.close')).toHaveLength(1);

      done();
    });
  });

  it('after clicking close button', () => {
    wrapper.find('button.close').simulate('click');

    let instance: ?Alert = Alert.instance();
    expect(typeof instance).toEqual('object');
    if (instance) expect(instance.alerts).toEqual([]);

    expect(wrapper.find('button.close')).toHaveLength(0);
  });
});
