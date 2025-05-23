import { number, object, string } from "yup";

const persianRegex = /^[\u0600-\u06FF\s]+$/;

export const productSchema = object({
  name: string()
    .required("لطفا این فیلد را خالی نگذارید")
    .min(3, "تعداد کاراکترها باید بیش از 3 باشد")
    .max(35, "تعداد کاراکتر ها نباید بیش از 35 باشد")
    .matches(persianRegex, "فقط حروف فارسی تایپ شود")
    .trim(),
  quantity: number()
    .typeError("لطفا فقط عدد وارد کنید")
    .integer("لطفا فقط اعداد صحیح(بدون اعشار) وارد کنید")
    .positive("مقدار را به درستی وارد کنید")
    .required(),
  price: number()
    .required()
    .integer("لطفا فقط اعداد صحیح(بدون اعشار) وارد کنید")
    .typeError("لطفا فقط عدد وارد کنید")
    .positive("مقدار را به درستی وارد کنید"),
});

export default productSchema;
