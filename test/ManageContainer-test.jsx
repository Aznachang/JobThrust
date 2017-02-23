'use strict';
require("babel-core").transform("code", {
  presets: ["react"]
});
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import ManageComponent from '../public/client/component/ManageComponent.jsx'

describe(' Testing ManageComponent', function() {
  it("renders an h1", function () {
      var scatterplot = TestUtils.renderIntoDocument(
          <ManageComponent />
      );

      var h1 = TestUtils.findRenderedDOMComponentWithTag(
          scatterplot, 'h1'
      );

      expect(h1.getDOMNode().textContent).toEqual("This is a random scatterplot");
  });
})