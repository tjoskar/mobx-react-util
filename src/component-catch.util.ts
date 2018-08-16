import React from 'react';
import { Component } from './types/component';

type State = { hasError: boolean };

export const componentCatch = <P = any>(
  ErrorComponent: Component<P>,
  errorCalback?: (rawError: Error, info?: any) => void
) => (Component: Component<P>): Component<P> => {
  return class IfErrorComponent extends React.Component<P, State> {
    state = {
      hasError: false
    };

    componentDidCatch(rawError: Error, info: any) {
      this.setState({
        hasError: true
      });
      if (errorCalback) {
        errorCalback(rawError, info);
      }
    }

    render() {
      if (this.state.hasError) {
        return React.createElement(ErrorComponent, this.props);
      }
      return React.createElement(Component, this.props);
    }
  };
};
