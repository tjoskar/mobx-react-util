import { Component } from './types/component';

type Hoc<P> = (comp: Component<P>) => Component<P>;

export const compose = <P>(...hocs: Hoc<P>[]): Hoc<P> =>
  hocs.reduceRight((a: any, b: any) => (comp: Component<P>) => b(a(comp)));
