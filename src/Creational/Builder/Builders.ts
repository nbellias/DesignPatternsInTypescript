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

export class StringProductBuilderMechanism implements Builder {
  private stringProductToBuild!: StringProduct;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.stringProductToBuild = new StringProduct();
  }

  public setPartA(): void {
    this.stringProductToBuild.addPart("PartA1");
  }

  public setPartB(): void {
    this.stringProductToBuild.addPart("PartB1");
  }

  public setPartC(): void {
    this.stringProductToBuild.addPart("PartC1");
  }

  public getProduct(): StringProduct {
    const result = this.stringProductToBuild;
    this.reset();
    return result;
  }
}

export class Director {
  private builder!: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimalViableStringProduct(): void {
    this.builder.setPartA();
  }

  public buildFullFeaturedStringProduct(): void {
    this.builder.setPartA();
    this.builder.setPartB();
    this.builder.setPartC();
  }
}
