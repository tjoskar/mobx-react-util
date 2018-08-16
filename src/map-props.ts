import { createElement } from 'react';
import { observer } from 'mobx-react';
import { Component } from './types/component';

export function mapProps<P, R>(map: (props: P) => R) {
  return (Component: Component<R>) =>
    observer((props: P) => createElement(Component, map(props)));
}
