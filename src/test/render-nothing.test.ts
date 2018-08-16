import { renderNothing } from '../render-nothing';

test('Return null', () => {
  // Act
  const result = renderNothing();

  // Assert
  expect(result).toBe(null);
});
