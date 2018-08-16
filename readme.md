# mobx-react-util [![Build Status](https://travis-ci.org/tjoskar/mobx-react-util.svg?branch=master)](https://travis-ci.org/tjoskar/mobx-react-util) [![codecov](https://codecov.io/gh/tjoskar/mobx-react-util/branch/master/graph/badge.svg)](https://codecov.io/gh/tjoskar/mobx-react-util)

> Utility functions for react with mobx


## Install

```
$ npm install @tjoskar/mobx-react-util
```


## Usage

### Branch

```ts
import { branch } from '@tjoskar/mobx-react-util'

const isListEmpty = props => props.myList.length === 0
const EmptyListComponent = () => 'The list is empty'
const ListComponent = props => props.list.map(item => item.name)

const MyComponent = branch(isListEmpty, EmptyListComponent)(ListComponent)
```

### Component Catch

```ts
import { componentCatch } from '@tjoskar/mobx-react-util'

const errorCalback = (rawError, info) => console.log(rawError, info)
const NormalComponent = () => {
  throw new Error('There is blood everywhere');
};
const CatchComponent = () => createElement('h1', null, 'Something went wrong!');
const MyComponent = componentCatch(CatchComponent, errorCalback)(NormalComponent);
```

### Lifecycle

```ts
import { lifecycle } from '@tjoskar/mobx-react-util'

const componentDidMount = props => setInterval(props.autosave, 1000)
const componentWillUnmount = (props, lifeScope) => clearInterval(lifeScope)
const MyComponent = lifecycle<Props, number>({
  componentDidMount,
  componentWillUnmount
})(() => 'I will auto save for you!');
```

### Map props

```ts
import { mapProps } from '@tjoskar/mobx-react-util'

const mapper = props => ({
  myNumber: props.myNumber + 1,
  newProp: 'Walter White'
});

const StringAndNumberComponent = props => props.newProp + ' and a ' + props.myNumber
const MyComponent = mapProps(mapper)(Component);
```

### Render nothing

```ts
import { renderNothing } from '@tjoskar/mobx-react-util'

renderNothing() // null
```

### To steram

```ts
import { observable, runInAction } from 'mobx';
import { toStream } from '@tjoskar/mobx-react-util'

const user = observable({
  name: 'Walter White',
  age: 52
});

const subscription = toStream(
  () => user.name + ' is ' + user.age + ' years old'
).subscribe(next => console.log(next));

user.name = 'Jesse Pinkman'
user.age = 28

runInAction(() => {
  user.name = 'Gustavo Fring';
  user.age = 58;
});

subscription.unsubscribe();

// Will print:
// Walter White is 52 years old
// Jesse Pinkman is 52 years old
// Jesse Pinkman is 28 years old
// Gustavo Fring is 58 years old
```

### Compose

```ts
import { branch, componentCatch, compose, mapProps, lifecycle, renderNothing } from '@tjoskar/mobx-react-util'

const MyComponent = compose(
  componentCatch(CatchComponent),
  lifecycle({
    componentDidMount,
    componentWillUnmount
  }),
  mapProps(mapper),
  branch(isLoading, Spinner),
  branch(isListUndefined, renderNothing),
  branch(isEmptyList, EmptyListComponent)
)(ListComponent)
```

## License

MIT
