import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";

import { userSchema } from "@/validation/userSchema";
import { signin, signup } from "@/services/auth";
import { useUser } from "@/context/UserContext";
import Input from "@/module/Input";

import styles from "@/templates/SignupPage.module.css";

function SignupPage({ page }) {
  const { setUser } = useUser();
  const isSigninPage = page === "signin";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: "onTouched",
  });

  const signupHandler = async (data) => {
    const result = await signup(data);
    if (result?.res?.message) {
      toast.success("اطلاعات کاربر با موفقیت ذخیره شد");
      router.push("/signin");
      reset();
    } else if (result?.error?.status === 400) {
      toast.error("کاربر با این اطلاعات قبلا ثبت نام کرده است");
    } else {
      toast.error("مشکلی پیش آمده لطفا بعدا تلاش کنید!");
    }
  };

  const signinHandler = async (data) => {
    const result = await signin(data);
    if (result?.res?.token) {
      toast.success(`${data.username} خوش آمدید`);
      document.cookie = `token=${result.res.token};`;
      setUser((user) => ({
        ...user,
        username: data.username,
        token: result.res.token,
      }));
      router.replace({ pathname: "/", query: { limit: 10, page: 1 } });
      reset();
    } else if (result?.error?.status === 400) {
      toast.error("نام کاربری یا رمز عبور اشتباه است");
    } else {
      toast.error("مشکلی پیش آمده لطفا بعدا تلاش کنید!");
    }
  };

  return (
    <div className={styles.container}>
      <h1>بوت کمپ بوتواستارت</h1>
      <form className={styles.form}>
        <img src={"./logo.png"} alt="logo" />
        {isSigninPage ? <h2>فرم ورود</h2> : <h2>فرم ثبت نام</h2>}
        <div className={styles.inputs}>
          <Input
            name="username"
            register={register}
            errors={errors}
            placeholder="نام کاربری"
          />
          <Input
            name="password"
            register={register}
            errors={errors}
            placeholder="رمز عبور"
          />
          {isSigninPage ? null : (
            <Input
              name="rePassword"
              register={register}
              errors={errors}
              placeholder="تکرار رمز عبور"
            />
          )}
        </div>
        {isSigninPage ? (
          <>
            <button onClick={handleSubmit(signinHandler)}>ورود</button>
            <p>
              حساب کاربری ندارید؟<Link href="/signup"> ثبت نام</Link>
            </p>
          </>
        ) : (
          <>
            <button onClick={handleSubmit(signupHandler)}>ثبت نام</button>
            <p>
              حساب کاربری دارید؟<Link href="/signin"> ورود</Link>
            </p>
          </>
        )}
      </form>
    </div>
  );
}

export default SignupPage;
