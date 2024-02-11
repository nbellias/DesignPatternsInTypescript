interface IUserDetails {
  name: string;
  age: number;
  email: string;
}

interface IPrototype {
  clone(): IPrototype;
  getUserDetails(): IUserDetails;
}

export class UserDetailsPrototype implements IPrototype {
  constructor(private user: IUserDetails) {}

  clone(): IPrototype {
    const clone = Object.create(this);
    clone.user = { ...this.user };
    return clone;
  }

  public getUserDetails(): IUserDetails {
    return this.user;
  }
}

// Another example

interface IShapeProperties {
  color: string;
  xCoordinate: number;
  yCoordinate: number;
}

abstract class Shape {
  constructor(protected properties: IShapeProperties) {}

  public abstract clone(): Shape;

  public abstract getShape(): IShapeProperties;
}

export class Circle extends Shape {
  constructor(
    properties: IShapeProperties,
    public radius: number,
  ) {
    super(properties);
  }

  public clone(): Circle {
    return new Circle(this.properties, this.radius);
  }

  public getShape(): IShapeProperties {
    return this.properties;
  }
}

export class Square extends Shape {
  constructor(
    properties: IShapeProperties,
    public side: number,
  ) {
    super(properties);
  }

  public clone(): Square {
    return new Square(this.properties, this.side);
  }

  public getShape(): IShapeProperties {
    return this.properties;
  }
}

export class Rectangle extends Shape {
  constructor(
    properties: IShapeProperties,
    public width: number,
    public height: number,
  ) {
    super(properties);
  }

  public clone(): Rectangle {
    return new Rectangle(this.properties, this.width, this.height);
  }

  public getShape(): IShapeProperties {
    return this.properties;
  }
}
