import { number, object } from "yup";

const priceSchema = object({
  minPrice: number()
    .nullable()
    .integer("لطفا فقط اعداد صحیح(بدون اعشار) وارد کنید")
    .min(0, "مقدار نمیتونه کمتر از صفر باشه")
    .transform((value, originalValue) => {
      return String(originalValue).trim() === "" || isNaN(originalValue)
        ? null
        : value;
    }),
  maxPrice: number()
    .nullable()
    .integer("لطفا فقط اعداد صحیح(بدون اعشار) وارد کنید")
    .min(0, "مقدار نمیتونه کمتر از صفر باشه")
    .transform((value, originalValue) => {
      return String(originalValue).trim() === "" || isNaN(originalValue)
        ? null
        : value;
    })
    .when("minPrice", (minPrice, schema) =>
      minPrice !== null
        ? schema.moreThan(minPrice, "حداکثر قیمت باید بیشتر از حداقل قیمت باشد")
        : schema
    ),
});

export default priceSchema;
