import styles from "@/module/ProductInput.module.css";

function ProductInput({ name, title, register, errors }) {
  return (
    <div className={styles.addInputs}>
      <label htmlFor={name}>{title}</label>
      <input
        type={name === "name" ? "text" : "number"}
        id={name}
        placeholder={title}
        {...register(name)}
      />
      <span>{errors[name]?.message}</span>
    </div>
  );
}

export default ProductInput;
