import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import priceSchema from "@/validation/priceSchema";
import { e2p } from "@/utils/replaceNumber";
import Input from "@/module/Input";

import styles from "@/module/PriceInputs.module.css";

function PriceInputs({ allProducts }) {
  const [price, setPrice] = useState({ minPrice: 0, maxPrice: 1 });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(priceSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (router.query.maxPrice || router.query.minPrice) {
      reset({
        minPrice: router.query.minPrice,
        maxPrice: router.query.maxPrice,
      });
    }
  }, []);

  useEffect(() => {
    if (allProducts) {
      const allPrice = allProducts.map((i) => i.price);
      setPrice((price) => ({
        ...price,
        minPrice: Math.min(...allPrice),
        maxPrice: Math.max(...allPrice),
      }));
    }
  }, [allProducts]);

  const confirmHandler = (data) => {
    const query = { ...router.query };

    query.page = 1;

    if (data.minPrice !== null && data.minPrice !== "") {
      query.minPrice = data.minPrice;
    } else {
      delete query.minPrice;
    }

    if (data.maxPrice !== null && data.maxPrice !== "") {
      query.maxPrice = data.maxPrice;
    } else {
      delete query.maxPrice;
    }

    router.push({ pathname: "/", query });
  };

  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
        <Input
          name="minPrice"
          placeholder={`از - ${e2p(+price.minPrice)}`}
          register={register}
          errors={errors}
        />
        <Input
          name="maxPrice"
          placeholder={`تا - ${e2p(+price.maxPrice)}`}
          register={register}
          errors={errors}
        />
      </div>
      <button onClick={handleSubmit(confirmHandler)}>اعمال</button>
    </form>
  );
}

export default PriceInputs;
