import React from 'react';
import { observer } from 'mobx-react';
import { Component } from './types/component';

type PredicateType<P> = (props: P) => boolean;

export const branch = <P>(
  predicate: PredicateType<P>,
  TrueComponent: Component<P>
) => (FalseComponent: Component<P>) =>
  observer(
    (props: P) =>
      predicate(props)
        ? React.createElement(TrueComponent, props)
        : React.createElement(FalseComponent, props)
  );
