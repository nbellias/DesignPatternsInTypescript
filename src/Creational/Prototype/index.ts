import { Circle, UserDetailsPrototype } from "./Prototypes";

export default function prototypesf(): void {
  const originalUserDetails = new UserDetailsPrototype({
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
  });
  console.log(originalUserDetails.getUserDetails());

  const clonedUserDetails = originalUserDetails.clone();
  console.log(clonedUserDetails.getUserDetails());

  console.log(originalUserDetails === clonedUserDetails);

  // Example with shapes
  const circle = new Circle(
    {
      color: "red",
      xCoordinate: 10,
      yCoordinate: 20,
    },
    10,
  );
  console.log(circle.getShape());

  const clonedCircle = circle.clone();
  console.log(clonedCircle.getShape());
  console.log(circle === clonedCircle);

}
