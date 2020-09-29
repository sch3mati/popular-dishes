import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: calc(((100% - (12px * 2)) / 3));
  height: 210px;
  margin: 0;
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
`;

const DishName = styled.h1`
  width: 168px;
  height: 30px;
  cursor: pointer;
  white-space: normal;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
`;

const DishIngredients = styled.p`
  width: 168px;
  height: 40px;
  cursor: pointer;
  white-space: normal;
  font-size: 14px;
  text-align: left;
`;

const Reviews = styled.p`
  width: 168px
  height: 20px;
  display: block;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  max-height: 20px;
`;

const DishEntry = (props) => (
    <Wrapper>

    </Wrapper>
);

export default DishEntry;
