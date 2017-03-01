import { Container } from 'aurelia-dependency-injection';
import { Hello } from '../../src/hello';

describe('the compoenent', () => {
  it('hello world', () => {
    expect('1').toBe('1');
  });

  it('shoud have a message', () =>{
    let container = new Container();
    let vm = <Hello>container.get(Hello);
    
    expect(vm.message.length).not.toEqual(0);
  });
});
