import { InputErrorPipe } from './input-error.pipe';

describe('InputErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new InputErrorPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return a required message', () => {
    const pipe = new InputErrorPipe();
    expect(pipe.transform({ required: true })).toBe('This field is required.');
  });

  it('should return a min length error', () => {
    const pipe = new InputErrorPipe();
    expect(pipe.transform({ min: 'Expected something' })).toBe('Field must be greater than 0.');
  });

  it('should return an empty string', () => {
    const pipe = new InputErrorPipe();
    expect(pipe.transform(undefined)).toBe('');
  })
});
