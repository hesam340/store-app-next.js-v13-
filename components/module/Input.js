import styles from "@/module/Input.module.css";

function Input({ name, register, errors, placeholder}) {
  return (
    <div
      className={
        name === "minPrice" || name === "maxPrice"
          ? styles.priceInput
          : styles.input
      }
    >
      <input
        type={
          name === "username"
            ? "text"
            : name === "minPrice" || name === "maxPrice"
            ? "number"
            : "password"
        }
        {...register(name)}
        placeholder={placeholder}
      />
      <span>{errors[name]?.message}</span>
    </div>
  );
}

export default Input;
