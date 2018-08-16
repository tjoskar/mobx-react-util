import React from 'react';
import { Component } from './types/component';

type Hooks<P, S> = {
  componentDidMount?: (props: P) => S;
  componentWillUnmount?: (props: P, lifeState: S) => void;
};

export function lifecycle<P, S = void>(hooks: Hooks<P, S>) {
  return (Component: Component<P>) => {
    return class LifecycleComponent extends React.Component<P> {
      lifeState: S;

      componentDidMount() {
        if (hooks.componentDidMount) {
          this.lifeState = hooks.componentDidMount(this.props);
        }
      }

      componentWillUnmount() {
        if (hooks.componentWillUnmount) {
          hooks.componentWillUnmount(this.props, this.lifeState);
        }
      }

      render() {
        return React.createElement(Component, this.props);
      }
    };
  };
}
