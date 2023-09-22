import * as yup from "yup";

const wildfireSchema = yup.object({
  query: yup.object({
    month: yup
      .string()
      .length(3, "Month must be 3 characters long!")
      .required("Month is required!"),
    year: yup
      .number()
      .test("is-year", "Year must be exactly 4 digits long", (value) => {
        if (typeof value === "number" && Number.isInteger(value)) {
          return value.toString().length === 4;
        }
        return false;
      })
      .required("Year is required!"),
  }),
});
export default wildfireSchema;
