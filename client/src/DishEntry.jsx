/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 15rem;
  margin: 0;
  width: 13.3rem;
  border-radius: 4px;
  border: 1px solid #d8d9db;
  background-color: #fff;
  padding: 12px;
  display: flex;
  flex-direction: column;
  white-space: normal;
  box-sizing: border-box;
  justify-content: space-between;
  margin-right: 6px;
  cursor: pointer;
`;

const Photo = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const DishName = styled.h1`
  width: 168px;
  height: 30px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
`;

const DishIngredients = styled.p`
  width: 168px;
  // margin: 0;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
`;

const Reviews = styled.p`
  width: 168px
  display: block;
  font-size: 14px;
`;

const DishEntry = (props) => {
  const { dish } = props;
  return (
    <div>
      <Wrapper>
        <Photo>
          <Image src={dish.picture} alt={dish.name} />
        </Photo>
        <DishName>{dish.name}</DishName>
        <DishIngredients>{dish.ingredients}</DishIngredients>
        <Reviews>{`${Math.floor(Math.random() * (50 - 15) + 15)} reviews`}</Reviews>
      </Wrapper>
    </div>
  );
};

export default DishEntry;
