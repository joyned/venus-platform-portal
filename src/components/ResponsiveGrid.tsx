import { ReactElement } from 'react';
import styled from 'styled-components';

interface GridContainerProps {
  columns: number;
}

const GridContainer = styled.div <GridContainerProps> `
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: ${({ columns }) => `repeat(auto-fit, minmax(${1200 / columns}px, 1fr))`};
  }

  @media (max-width: 900px) {
    grid-template-columns: ${({ columns }) => `repeat(auto-fit, minmax(${900 / columns}px, 1fr))`};
  }

  @media (max-width: 600px) {
    grid-template-columns: ${({ columns }) => `repeat(auto-fit, minmax(${600 / columns}px, 1fr))`};
  }
`;

const GridItem = styled.div`
`;

const ResponsiveGrid = (props: { children: ReactElement[] | ReactElement, columns?: number, center?: boolean }) => {
  return (
    <GridContainer columns={props.columns ? props.columns : 1}
      style={{
        gridTemplateColumns: props.columns === 1 ? 'repeat(auto-fit, minmax(100%, 1fr))' : '',
        justifyItems: props.center ? 'center' : 'normal'
      }}>
      {props.children && !Array.isArray(props.children) && (
        props.children
      )}
      {props.children && Array.isArray(props.children) && props.children.map((item, index) => (
        <GridItem key={index}>{item}</GridItem>
      ))}
    </GridContainer>
  );
};

export default ResponsiveGrid;