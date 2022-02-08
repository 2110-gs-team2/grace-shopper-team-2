import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Cart } from './Cart'

const adapter = new Adapter()
enzyme.configure({adapter})

describe ('Cart', () => {
  describe('True Test', () => {
    
    it('true === true', () => {
      expect(true).to.equal(true);
    });
  });

});
