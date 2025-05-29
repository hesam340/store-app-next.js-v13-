import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { addProduct, editProduct } from "@/services/product";
import productSchema from "@/validation/productSchema";
import { useNeeds } from "@/context/NeedsContext";
import ProductInput from "@/module/ProductInput";

import styles from "@/module/AddModal.module.css";

function AddModal({ product }) {
  const router = useRouter();
  const { setNeeds } = useNeeds();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (product)
      reset({
        name: product?.name,
        price: product?.price,
        quantity: product?.quantity,
      });
  }, [product]);

  const confirmHandler = (data) => {
    if (product) {
      editProduct(data, product.id);
    } else {
      addProduct(data);
    }
    reset();
    if (product) {
      setNeeds((needs) => ({ ...needs, editModal: false }));
    } else {
      setNeeds((needs) => ({ ...needs, addModal: true }));
    }
    router.push(
      {
        pathname: "/",
        query: { limit: 10, page: router.query.page },
      },
      undefined,
      { scroll: false }
    );
  };

  const quitHandler = () => {
    if (product) {
      setNeeds((needs) => ({ ...needs, editModal: false }));
    } else {
      setNeeds((needs) => ({ ...needs, addModal: false }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <form className={styles.form}>
          {product ? <h1>ویرایش اطلاعات</h1> : <h1>ایجاد محصول جدید</h1>}
          <div className={styles.inputs}>
            <ProductInput
              title="نام کالا"
              name="name"
              register={register}
              errors={errors}
            />
            <ProductInput
              title="تعداد موجودی"
              name="quantity"
              register={register}
              errors={errors}
            />
            <ProductInput
              title="قیمت"
              name="price"
              register={register}
              errors={errors}
            />
          </div>
          <div className={styles.buttons}>
            {product ? (
              <button onClick={handleSubmit(confirmHandler)}>
                ثبت اطلاعات جدید
              </button>
            ) : (
              <button onClick={handleSubmit(confirmHandler)}>ایجاد</button>
            )}
            <button type="button" onClick={quitHandler}>
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddModal;
