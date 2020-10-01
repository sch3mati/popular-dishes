/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import App from '../client/src/components/App.jsx';
import DishEntry from '../client/src/components/DishEntry.jsx';
import Popup from '../client/src/components/Popup.jsx';
import Review from '../client/src/components/Review.jsx';

const testDish = {
  id: 262,
  restr_id: 69,
  name: 'Mandarine and clementine  salad',
  ingredients: 'lettuce, tomato, white cabbage, mandarine, clementine',
  picture: 'https://dishestkout.s3-us-west-1.amazonaws.com/45.jpeg',
  reviews: {
    1324: {
      id: 1324,
      dish_id: 262,
      user_id: 49,
      review: 'Aliquam nesciunt et. Occaecati dolores occaecati magni dolor labore. Qui dicta quia aspernatur eos aut vel sit ratione. Ullam recusandae quis.',
      dined_on: '2019-12-24T08:00:00.000Z',
      stars: 4.5,
      user_status: 1,
    },
  },
};

const testUser = {
  "id": 49,
  "name": "Winston Durgan",
  "avatar": "https://avatarstkout.s3-us-west-1.amazonaws.com/48.jpg"
}

describe('<App />', () => {
  const wrapper = mount(<App />);
  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('has state info', () => {
    expect(wrapper).toHaveState('info');
  });
  it('has h2 header element', () => {
    expect(wrapper.find('h2')).toExist();
  });
});

describe('<DishEntry />', () => {
  const wrapper = mount(<DishEntry dish={testDish} />);
  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('has h1 header element', () => {
    expect(wrapper.find('h1')).toExist();
  });
  it('renders image correctly', () => {
    expect(wrapper.find('img')).toExist();
  });
});

describe('<Popup />', () => {
  const wrapper = mount(<Popup
    info={{ dishes: { 262: testDish }, users: { 49: testUser } }}
    closePopup={() => { }}
    dishToRender={262}
    onContentChange={() => { }}
  />);
  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('has h2 header element', () => {
    expect(wrapper.find('h2')).toExist();
  });
  // it('should render Review component', () => {
  //   expect(wrapper.children(Review).length).toEqual(1);
  // });
});

describe('<Review />', () => {
  const wrapper = mount(<Review
    review={testDish.reviews['1324']}
    user={testUser}
  />);
  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('has img thumbnail element', () => {
    expect(wrapper.find('img')).toExist();
  });
});
