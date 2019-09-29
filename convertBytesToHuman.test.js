/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== 1,
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === 5
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-12)).toBe(undefined);
  expect(convertBytesToHuman(12.34)).toBe(undefined);
  expect(convertBytesToHuman("12")).toBe(undefined);
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(12)).toBe("12B");
  expect(convertBytesToHuman(1024)).toBe("1.00KB");
  expect(convertBytesToHuman(5000)).toBe("4.88KB");
  expect(convertBytesToHuman(5000000)).toBe("4.77MB");
});
