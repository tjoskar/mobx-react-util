import { createElement } from 'react';
import renderer from 'react-test-renderer';
import { spy } from 'simple-spy';
import { componentCatch } from '../component-catch.util';

// React will print some error messages when a component throws
console.error = () => null;

test('Render normal component', () => {
  const errorCalback = undefined;
  const NormalComponent = () => createElement('h1', null, 'Wii!');
  const CatchComponent = () => createElement('h1', null, 'Error!');
  const Comp = componentCatch(CatchComponent, errorCalback)(NormalComponent);

  const tree = renderer.create(createElement(Comp));

  expect(tree.toJSON()).toEqual({ type: 'h1', props: {}, children: ['Wii!'] });
});

test('Render cach component', () => {
  const errorCalback = undefined;
  const NormalComponent = () => {
    throw new Error('Fel!');
  };
  const CatchComponent = () => createElement('h1', null, 'Error!');
  const Comp = componentCatch(CatchComponent, errorCalback)(NormalComponent);

  const tree = renderer.create(createElement(Comp));

  expect(tree.toJSON()).toEqual({
    type: 'h1',
    props: {},
    children: ['Error!']
  });
});

test('Pass props to the component', () => {
  const errorCalback = undefined;
  const props = { loading: true, text: 'World' };
  const NormalComponent = (p: any) =>
    createElement('h1', null, 'Hello ' + p.text);
  const CatchComponent = () => null;
  const Comp = componentCatch(CatchComponent, errorCalback)(NormalComponent);

  const tree = renderer.create(createElement(Comp, props));

  expect(tree.toJSON()).toEqual({
    type: 'h1',
    props: {},
    children: ['Hello World']
  });
});

test('Log error when catching error', () => {
  const errorCalback = spy();
  const NormalComponent = () => {
    throw new Error('Fel!');
  };
  const CatchComponent = () => createElement('h1', null, 'Error!');
  const Comp = componentCatch(CatchComponent, errorCalback as any)(
    NormalComponent
  );

  renderer.create(createElement(Comp));

  expect(errorCalback.callCount).toBe(1);
  expect(errorCalback.args[0][0].message).toBe('Fel!');
  expect(errorCalback.args[0][1].componentStack).toBeDefined();
});
