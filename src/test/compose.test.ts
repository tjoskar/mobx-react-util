import { compose } from '../compose';

test('Compose hocs', () => {
  const result = compose(
    ((i: number) => i + 1) as any,
    ((i: number) => i * 2) as any,
    ((i: number) => i / 3) as any
  )(6 as any);

  expect(result).toBe(5);
});
