/* eslint-disable max-len */
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

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background-color: rgba(0,0,0,.56);
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: { dishes: {}, users: {} },
      popup: false,
    };
    this.getAllDishes = this.getAllDishes.bind(this);
    this.handleDishClick = this.handleDishClick.bind(this);
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

  handleDishClick(dishId) {
    this.setState({ popup: !this.state.popup });
  }

  render() {
    const { dishes } = this.state.info;
    const { popup } = this.state;
    return (
      <div>
        <div>{popup ? <Overlay><div>hello world</div></Overlay> : null}</div>
        <Wrapper>
          <Title>Popular dishes</Title>
          <Dishes>
            {Object.values(dishes).slice(0, 3).map((dish) => {
              return (<DishEntry key={dish.id} dish={dish} handleDishClick={this.handleDishClick} />);
            })}
          </Dishes>
        </Wrapper>
      </div>
    );
  }
}

export default App;
