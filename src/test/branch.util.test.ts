import { createElement } from 'react';
import renderer from 'react-test-renderer';
import { branch } from '../branch.util';

test('Render truthy component', () => {
  const props = { loading: true };
  const TruthyComponent = () => createElement('h1', null, 'Jepp');
  const Falsycomponent = () => createElement('h1', null, 'Nepp');
  const predicat = (p: any) => p.loading;
  const Comp = branch(predicat, TruthyComponent)(Falsycomponent);

  const tree = renderer.create(createElement(Comp, props));

  expect(tree.toJSON()).toEqual({ type: 'h1', props: {}, children: ['Jepp'] });
});

test('Render falsy component', () => {
  const props = { loading: false };
  const TruthyComponent = () => createElement('h1', null, 'Jepp');
  const Falsycomponent = () => createElement('h1', null, 'Nepp');
  const predicat = (p: any) => p.loading;
  const Comp = branch(predicat, TruthyComponent)(Falsycomponent);

  const tree = renderer.create(createElement(Comp, props));

  expect(tree.toJSON()).toEqual({ type: 'h1', props: {}, children: ['Nepp'] });
});

test('Pass props to the component', () => {
  const props = { loading: true, text: 'World' };
  const TruthyComponent = (p: any) =>
    createElement('h1', null, 'Hello ' + p.text);
  const Falsycomponent = () => null;
  const predicat = (p: any) => p.loading;
  const Comp = branch(predicat, TruthyComponent)(Falsycomponent);

  const tree = renderer.create(createElement(Comp, props));

  expect(tree.toJSON()).toEqual({
    type: 'h1',
    props: {},
    children: ['Hello World']
  });
});
