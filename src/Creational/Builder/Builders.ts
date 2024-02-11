/* eslint-disable @typescript-eslint/no-unused-vars */
interface Builder {
  setPartA(): void;
  setPartB(): void;
  setPartC(): void;
}

class StringProduct {
  private parts: string[] = [];

  public addPart(part: string): void {
    this.parts.push(part);
  }

  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(", ")}\n`);
  }
}

class BuilderMechanism implements Builder {
  private productToBuild!: StringProduct;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.productToBuild = new StringProduct();
  }

  public setPartA(): void {
    this.productToBuild.addPart("PartA1");
  }

  public setPartB(): void {
    this.productToBuild.addPart("PartB1");
  }

  public setPartC(): void {
    this.productToBuild.addPart("PartC1");
  }

  public getProduct(): StringProduct {
    const result = this.productToBuild;
    this.reset();
    return result;
  }
}

class Director {
  private builder!: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimalViableProduct(): void {
    this.builder.setPartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.setPartA();
    this.builder.setPartB();
    this.builder.setPartC();
  }
}
