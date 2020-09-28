/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { mount, shallow } from 'enzyme';

function Fixture() {
  return (
    <div>
      <input id="checked" defaultChecked />
      <input id="not" defaultChecked={false} />
      <input id="tertiary" defaultChecked checked={false} />
    </div>
  );
}

describe('<Fixture />', () => {
  it('assert checked', () => {
    const wrapper = mount(<Fixture />); // mount/render/shallow when applicable
    expect(wrapper.find('#checked')).toBeChecked();
    expect(wrapper.find('#not')).not.toBeChecked();
  });
});
