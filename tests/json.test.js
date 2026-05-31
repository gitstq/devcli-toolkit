const jsonCmd = require('../src/commands/json');

describe('JSON Command', () => {
  test('should be defined', () => {
    expect(jsonCmd).toBeDefined();
  });

  test('should have correct name', () => {
    expect(jsonCmd.name()).toBe('json');
  });
});
