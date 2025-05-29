import { toast } from "react-toastify";
import axios from "axios";

import api from "@/configs/api";

const addProduct = (data) => {
  try {
    api.post(`/products`, data);
    toast.success("کالای جدید با موفقیت اضافه شد");
  } catch (error) {
    toast.error("مشکلی پیش آمده است");
  }
};

const editProduct = (data, id) => {
  try {
    api.put(`/products/${id}`, data);
    toast.success("اطلاعات کالای مورد نظر ویرایش شد");
  } catch (error) {
    toast.error("مشکلی پیش آمده است");
  }
};

const groupDeleteProducts = (data) => {
  try {
    const newData = { ids: [] };
    const result = data.map((i) => {
      return i.id;
    });
    newData.ids.push(...result);
    api.delete("/products", { data: newData });
    toast.success("کالاهای مذکور با موفقیت حذف شدند");
  } catch (error) {
    toast.error("مشکلی پیش آمده است");
  }
};

const deleteOneProduct = (id) => {
  try {
    api.delete(`/products/${id}`);
    toast.success("کالای مذکور حذف شد");
  } catch (error) {
    toast.error("مشکلی پیش آمده است");
  }
};

const getAllPagesProducts = (totalPages) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return axios
    .all(pages.map((i) => api.get(`/products?limit=10&page=${i}`)))
    .then(
      axios.spread((...res) => {
        return res.flatMap((res) => res.data);
      })
    );
};

export {
  addProduct,
  editProduct,
  groupDeleteProducts,
  deleteOneProduct,
  getAllPagesProducts,
};
