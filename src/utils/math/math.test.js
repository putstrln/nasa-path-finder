import {plus} from './math';

describe('math - utils', () =>{
  it('should add two numbers', () => {
    expect(plus(1,1)).toEqual(2);
  });
});
