import React from 'react';
import renderer from 'react-test-renderer';
import { mapProps } from '../map-props';

type OuterProps = {
  myNumber: number;
};

type InnerProps = OuterProps & {
  newProp: string;
};

test('Map props', () => {
  // Arrange
  const mapper = (props: OuterProps): InnerProps => ({
    myNumber: props.myNumber + 1,
    newProp: 'Walter White'
  });

  const Component = (props: InnerProps) =>
    React.createElement('p', null, props.newProp + ' and a ' + props.myNumber);

  // Act
  const ResultComponent = mapProps(mapper)(Component);
  const tree = renderer.create(
    React.createElement(ResultComponent, { myNumber: 2 })
  );

  // Assert
  expect(tree!.toJSON()!.children![0]).toBe('Walter White and a 3');
});
