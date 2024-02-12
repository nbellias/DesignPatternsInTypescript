import { StringProductBuilderMechanism, Director } from './Builders';

describe('StringProductBuilderMechanism', () => {
  let builder: StringProductBuilderMechanism;

  beforeEach(() => {
    builder = new StringProductBuilderMechanism();
  });

  test('should create an instance of StringProductBuilderMechanism', () => {
    expect(builder).toBeInstanceOf(StringProductBuilderMechanism);
  });

  test('should build a product with parts A, B, and C', () => {
    builder.setPartA();
    builder.setPartB();
    builder.setPartC();
    const product = builder.getProduct();
    console.log = jest.fn();
    product.listParts();
    expect(console.log).toHaveBeenCalledWith('Product parts: PartA1, PartB1, PartC1\n');
  });
});

describe('Director', () => {
  let director: Director;
  let builder: StringProductBuilderMechanism;

  beforeEach(() => {
    director = new Director();
    builder = new StringProductBuilderMechanism();
    director.setBuilder(builder);
  });

  test('should create an instance of Director', () => {
    expect(director).toBeInstanceOf(Director);
  });

  test('should build a minimal viable product', () => {
    director.buildMinimalViableStringProduct();
    const product = builder.getProduct();
    console.log = jest.fn();
    product.listParts();
    expect(console.log).toHaveBeenCalledWith('Product parts: PartA1\n');
  });

  test('should build a full featured product', () => {
    director.buildFullFeaturedStringProduct();
    const product = builder.getProduct();
    console.log = jest.fn();
    product.listParts();
    expect(console.log).toHaveBeenCalledWith('Product parts: PartA1, PartB1, PartC1\n');
  });
});