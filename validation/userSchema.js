import { date, object, string, ref } from "yup";

const englishRegex = /^[a-zA-Z0-9?><;,{}[\]\-_+=!@#$%\^&*|']*$/;
const passRegex = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,15})$/;

export const userSchema = object({
  username: string()
    .required("لطفا این فیلد را خالی نگذارید")
    .min(5, "تعداد کاراکترها نباید کمتر از 5 باشد")
    .max(25, "تعداد کاراکترها نباید بیش از 25 باشد")
    .matches(englishRegex, "فقط حروف انگلیسی تایپ شود")
    .trim(),
  password: string()
    .required("لطفا این فیلد را خالی نگذارید")
    .matches(passRegex, "باید بین 8 تا 15 کاراکتر و شامل حداقل 1 حرف بزرگ باشد")
    .trim(),
  rePassword: string().oneOf(
    [ref("password"), null],
    "رمز عبور با تکرار آن برابر نیست"
  ),
  createdOn: date().default(() => new Date()),
});
