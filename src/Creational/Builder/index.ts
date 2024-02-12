import { Director, StringProductBuilderMechanism } from "./Builders";

export function builderf() {
  const director = new Director();

  const builder = new StringProductBuilderMechanism();

  director.setBuilder(builder);
  console.log("Standard basic product:");
  director.buildMinimalViableStringProduct();
  builder.getProduct().listParts();

  console.log("Standard full featured product:");
  director.buildFullFeaturedStringProduct();
  builder.getProduct().listParts();
}
