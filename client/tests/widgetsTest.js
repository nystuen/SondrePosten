// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../src/widgets.js';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import { Button } from '../src/components/button/button';
import { NewCase } from '../src/components/pages/newCase/newCase';
import { CardPreview } from '../src/components/card/cardPreview';
import Card from '../src/components/card/card';
import { CaseFeed } from '../src/components/caseFeed/caseFeed';
import { caseService } from '../src/services';
chai.use(sinonChai);


describe('Test for Button component', () => {
  let wrapper, buttonType, buttonSpy, children;
// type = danger,, onClick = functin, children
  beforeEach(() => {
    buttonType = 'danger';
    buttonSpy = spy();
    children = 'clickMe';
    wrapper = shallow(<Button id="button" type={buttonType} onClick={() => buttonSpy}>children</Button>);
  });

  it('Testing clicking button', () => {
    wrapper.find("#button").simulate('click');
    expect(buttonSpy.called);
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