/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Rating = styled.div`
  position: relative;
  width: 6.1rem;
`;

const Star = styled.svg`
  margin: 0 4px 0 0;
`;

const EmptyStar = styled.div`
  position: absolute;
  width: 7rem;
`;

const FullStar = styled.div`
  position: absolute;
  overflow: hidden;
`;

const FullStarInner = styled.div`
  overflow: hidden;
  width: 7rem;
`;

const Stars = ({ rating }) => {
  const emptyStars = [];
  const fullStar = [];
  const svgStar = (color, idx) => (
    <Star key={idx} width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
      <title>Star</title>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="star-empty" fillRule="nonzero" fill={color}>
          <path d="M3.213,15.984 C3.15,15.984 3.109,15.974 3.088,15.953 C2.984,15.89 2.952,15.817 2.994,15.734 L3.87,10.218 L0.083,6.331 C-5.27355937e-16,6.247 -0.021,6.164 0.021,6.08 C0.042,6.017 0.104,5.965 0.209,5.923 L5.465,5.14 L7.781,0.125 C7.864,0.042 7.937,0 8,0 C8.104,0 8.177,0.042 8.219,0.125 L10.566,5.14 L15.792,5.924 C15.875,5.945 15.938,5.997 15.98,6.081 C16.021,6.164 16,6.247 15.917,6.331 L12.131,10.217 L13.038,15.733 C13.038,15.817 13.007,15.89 12.944,15.952 C12.84,16.015 12.756,16.015 12.694,15.952 L8,13.383 L3.338,15.953 C3.317,15.974 3.275,15.984 3.213,15.984 L3.213,15.984 Z" id="Star" />
        </g>
      </g>
    </Star>
  );
  for (let i = 0; i < 5; i += 1) {
    let klass = '#E1E1E1';
    emptyStars.push(svgStar(klass, i));
    klass = '#DA3743';
    fullStar.push(svgStar(klass, i));
  }
  return (
    <Rating className="rating">
      <EmptyStar className="empty-stars">{emptyStars}</EmptyStar>
      <FullStar className="full-stars" style={{ width: `${rating * 20}%` }}>
        <FullStarInner className="full-stars-inner">{fullStar}</FullStarInner>
      </FullStar>
    </Rating>
  );
};

export default Stars;
