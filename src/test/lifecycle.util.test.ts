import React from 'react';
import renderer from 'react-test-renderer';
import { spy } from 'simple-spy';
import { lifecycle } from '../lifecycle.util';

test('Run component did mount', () => {
  // Arrange
  const Comp = () => null;
  const componentDidMount = spy();

  // Act
  renderer.create(
    React.createElement(
      lifecycle({ componentDidMount: componentDidMount as any })(Comp)
    )
  );

  // Assert
  expect(componentDidMount.callCount).toBe(1);
});

test('Pass props to component did mount', () => {
  // Arrange
  const Comp = () => null;
  const props = { myKey: 'val' };
  const componentDidMount = spy();

  // Act
  renderer.create(
    React.createElement(
      lifecycle<any>({ componentDidMount: componentDidMount as any })(Comp),
      props
    )
  );

  // Assert
  expect(componentDidMount.args[0][0]).toEqual(props);
});

test('Get life scope on component will unmount', () => {
  // Arrange
  const Comp = () => null;
  const props = { myKey: 1 };
  type Props = typeof props;
  const componentDidMount = (props: Props) => props.myKey + 1;
  const componentWillUnmount = spy();

  // Act and assert
  const ComponentUnderTest = lifecycle<any>({
    componentDidMount: componentDidMount,
    componentWillUnmount: componentWillUnmount as any
  })(Comp);

  const componentUnderTest = new ComponentUnderTest(props);
  componentUnderTest.componentDidMount();
  componentUnderTest.componentWillUnmount();

  // Assert
  expect(componentWillUnmount.args[0][0]).toEqual(props);
  expect(componentWillUnmount.args[0][1]).toEqual(2);
});
