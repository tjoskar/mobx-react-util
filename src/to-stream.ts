import { reaction } from 'mobx';
import { Observable, Observer } from 'rxjs';

export const toStream = <T>(
  expression: () => T,
  fireImmediately = true
): Observable<T> => {
  return Observable.create((observer: Observer<T>) => {
    return reaction(expression, value => observer.next(value), {
      fireImmediately
    });
  });
};
