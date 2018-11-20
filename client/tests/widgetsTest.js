// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../src/widgets.js';
import { shallow, mount } from 'enzyme';
//import chai, { expect } from 'chai';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import { Button } from '../src/components/button/button';
import { NewCase } from '../src/components/pages/newCase/newCase';
import { CardPreview } from '../src/components/card/cardPreview';
import Card from '../src/components/card/card';
import { CaseFeed } from '../src/components/caseFeed/caseFeed';
import { caseService } from '../src/services';
import { CaseObject } from '../src/components/types/types';

//chai.use(sinonChai);

describe('Testing card', () => {
  let wrapper, aCase;

  beforeEach(() => {

    let aCase = new CaseObject('overskrift', 'bildeadresse.jpg', 'bildetekst', 'innhold', 'sport', 1);

    /*aCase = {
      'kategori': 'annet',
      'viktighet': 1,
      'overskrift': 'Karpe til Festningen-festival',
      'bildetekst': 'Rakk du ikke kjøpe billett til Karpe på Samfundet? Nå får du mulighet til å oppleve dem på Festningen.',
      'bilde': 'https://trd.by/incoming/article17867290.ece/v8nlrb/ALTERNATES/w980-default/406cebca-5412-4a9a-8164-099bd9069b8f',
      'innhold': 'Karpe solgte ut konsertene på Studentersamfundet, som finner sted i mars, på halvannet minutt.\n\nNå avslører Festningen-festivalen at rap-duoen også kommer til dem i slutten av august. Festivalen på Kristiansten Festning arrangeres for andre gang i 2019.\n\n- Perfekt booking til målgruppa\nMarked- og kommunikasjonsansvarlig i Festningen, Rachel Nordtømme, er fornøyd med å presentere den populære rap-duoen til de som var for seint ute sist.\n\n- Vi er vanvittig glade for å få Karpe til Festningen. Det blir helt fantastisk å oppleve dem på festivalen. Det er en perfekt booking til vår målgruppe. Jeg tror det blir rift om billettene.\n\nFor en drøy uke siden var pågangen etter å få tak i billetter til Karpe på Samfundet så stor at nettsiden kollapset. Den norske duoen er første artist som slippes til neste års Festningen-festival.\n\n- Nå gir vi veldig mange muligheten til å se Karpe i Trondheim, både de som sikret seg billett til Samfundet, og ikke minst de som ikke fikk tak i. Det blir en magisk opplevelse med Karpe på det som blir den feteste festivalen i Trondheim sommeren 2019, mener Nordtømme.',
    };*/

    wrapper = shallow(<CardPreview case={aCase}/>);
  });

  it('Testing if the cardpreview contains overskrift', () => {
    expect(wrapper.find('card-title').text()).toEqual('Karpe til Festningen-festival');

  });

  it('Testing if the cardpreview contains an image', () => {
    expect(wrapper.find('card-img-top').text()).toEqual('bildeadresse.jpg');
  });

  it('Testing if the cardpreview', () => {
    expect(wrapper.find('card-img-top').text()).toEqual('bildeadresse.jpg');
  });

  it('Testing if CardPreview\'s case prop is equal to the case passed in.', () => {
    expect(wrapper.prop('case')).toEqual();

  });

});

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
    wrapper.find('#button').simulate('click');
    expect(buttonSpy.called);
  });


});


describe('Alert tests', () => {
  const wrapper = shallow(<Alert/>);

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