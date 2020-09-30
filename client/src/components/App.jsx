/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DishEntry from './DishEntry.jsx';

const Wrapper = styled.section`
  display: block;
  font-family: Halvetica, sans-serif;
  background-color: #fff;
  width: 678px;
  height: 220px
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: #2d333f;
  margin: 0px 0px 16px;
  padding: 0px 0px 16px;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  border-bottom: 1px solid #d8d9db;
`;

const Dishes = styled.div`
  display: flex;
  padding-top: .5rem;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: { dishes: {}, users: {} },
    };
    this.getAllDishes = this.getAllDishes.bind(this);
  }

  componentDidMount() {
    const restaurant = Math.floor(Math.random() * 100);
    this.getAllDishes(restaurant);
  }

  getAllDishes(restrId) {
    axios.get(`/api/dishes/restaurant/${restrId}`)
      .then((result) => {
        this.setState({
          info: result.data,
        });
      });
  }

  render() {
    const { dishes } = this.state.info;
    return (
      <div>
        <Wrapper>
          <Title>Popular dishes</Title>
          <Dishes>
            {Object.values(dishes).slice(0, 3).map((dish) => {
              return (<DishEntry key={dish.id} dish={dish} />);
            })}
          </Dishes>
        </Wrapper>
      </div>
    );
  }
}

export default App;
