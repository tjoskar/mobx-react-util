import { observable, runInAction } from 'mobx';
import { toStream } from '../to-stream';

test('Convert mobx observable to a rxjs stream', () => {
  // Arrange
  const user = observable({
    name: 'Walter White',
    age: 52
  });

  const values: string[] = [];

  const sub = toStream(
    () => user.name + ' is ' + user.age + ' years old'
  ).subscribe(v => values.push(v));

  // Act
  runInAction(() => (user.name = 'Jesse Pinkman'));
  runInAction(() => (user.age = 28));
  runInAction(() => {
    user.name = 'Gustavo Fring';
    user.age = 58;
  });
  sub.unsubscribe();

  // Assert
  expect(values).toEqual([
    'Walter White is 52 years old',
    'Jesse Pinkman is 52 years old',
    'Jesse Pinkman is 28 years old',
    'Gustavo Fring is 58 years old'
  ]);
});
