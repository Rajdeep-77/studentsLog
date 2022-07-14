import { OrderAscDescPipe } from './order-asc-desc.pipe';

describe('OrderAscDescPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderAscDescPipe();
    expect(pipe).toBeTruthy();
  });
});
