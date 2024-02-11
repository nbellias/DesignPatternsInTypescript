import { UserDetailsPrototype } from "./Prototypes";

describe("UserDetails", () => {
  let userDetails: UserDetailsPrototype;

  beforeEach(() => {
    userDetails = new UserDetailsPrototype({
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
    });
  });

  test("should create an instance of UserDetails", () => {
    expect(userDetails).toBeInstanceOf(UserDetailsPrototype);
  });

  test("should clone UserDetails correctly", () => {
    const clone = userDetails.clone();
    expect(clone).not.toBe(userDetails);
    expect(clone).toEqual(userDetails);
  });

  test("should display UserDetails correctly", () => {
    const userDetails = new UserDetailsPrototype({
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
    });
    expect(userDetails.getUserDetails()).toEqual({
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
    });
  });

  test("should display cloned UserDetails correctly", () => {
    const userDetails = new UserDetailsPrototype({
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
    });
    const clone = userDetails.clone();
    expect(clone.getUserDetails()).toEqual({
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
    });
  });

  test("should not be the same instance", () => {
    const userDetails = new UserDetailsPrototype({
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
    });
    const clone = userDetails.clone();
    expect(clone).not.toBe(userDetails);
  });
});

// The following tests are for the Shape and its subclasses
import { Circle, Square } from "./Prototypes";

describe("Shape", () => {
  test("should create a circle", () => {
    const circle = new Circle(
      {
        color: "red",
        xCoordinate: 10,
        yCoordinate: 20,
      },
      10,
    );
    expect(circle).toBeInstanceOf(Circle);
  });

  test("should create a square", () => {
    const square = new Square(
      {
        color: "blue",
        xCoordinate: 10,
        yCoordinate: 20,
      },
      25,
    );
    expect(square).toBeInstanceOf(Square);
  });

  test("should clone a circle", () => {
    const circle = new Circle(
      {
        color: "red",
        xCoordinate: 10,
        yCoordinate: 20,
      },
      10,
    );
    const clone = circle.clone();
    expect(clone).not.toBe(circle);
    expect(clone).toEqual(circle);
  });

  test("should clone a square", () => {
    const square = new Square(
      {
        color: "blue",
        xCoordinate: 10,
        yCoordinate: 20,
      },
      25,
    );
    const clone = square.clone();
    expect(clone).not.toBe(square);
    expect(clone).toEqual(square);
  });

  test("should display a circle correctly", () => {
    const circle = new Circle(
      {
        color: "red",
        xCoordinate: 10,
        yCoordinate: 20,
      },
      10,
    );
    expect(circle.getShape()).toEqual({
      color: "red",
      xCoordinate: 10,
      yCoordinate: 20,
    });
  });

  test("should display a square correctly", () => {
    const square = new Square(
      {
        color: "blue",
        xCoordinate: 10,
        yCoordinate: 20,
      },
      25,
    );
    expect(square.getShape()).toEqual({
      color: "blue",
      xCoordinate: 10,
      yCoordinate: 20,
    });
  });
});

// The following tests are for the Rectangle class
import { Rectangle } from "./Prototypes";

describe("Rectangle", () => {
  test("should create a rectangle", () => {
    const rectangle = new Rectangle(
      {
        color: "green",
        xCoordinate: 10,
        yCoordinate: 20,
      },
      30,
      40,
    );
    expect(rectangle).toBeInstanceOf(Rectangle);
  });

  test("should clone a rectangle", () => {
    const rectangle = new Rectangle(
      {
        color: "green",
        xCoordinate: 10,
        yCoordinate: 20,
      },
      30,
      40,
    );
    const clone = rectangle.clone();
    expect(clone).not.toBe(rectangle);
    expect(clone).toEqual(rectangle);
  });

  test("should display a rectangle correctly", () => {
    const rectangle = new Rectangle(
      {
        color: "green",
        xCoordinate: 10,
        yCoordinate: 20,
      },
      30,
      40,
    );
    expect(rectangle.getShape()).toEqual({
      color: "green",
      xCoordinate: 10,
      yCoordinate: 20,
    });
  });
});
