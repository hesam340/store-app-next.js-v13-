import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useNeeds } from "@/context/NeedsContext";
import { useUser } from "@/context/UserContext";
import DeleteModal from "@/module/DeleteModal";
import titles from "@/constants/tableTitles";
import { sp } from "@/utils/replaceNumber";
import productId from "@/utils/productId";
import AddModal from "@/module/AddModal";

import styles from "@/module/TableProducts.module.css";

function TableProducts({ data }) {
  const { data: products } = data;
  const { needs } = useNeeds();
  const [selectedProduct, setSelectedProduct] = useState({});

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            {needs.checkBox && <th></th>}
            {titles.map((i) => (
              <th key={i.id}>{i.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.message ? (
            <tr>
              <td
                colSpan={4}
                style={{ textAlign: "center", paddingTop: "20px" }}
              >
                {data.message}
              </td>
            </tr>
          ) : (
            products?.map((product) => (
              <TableRow
                key={product.id}
                product={product}
                setSelectedProduct={setSelectedProduct}
              />
            ))
          )}
        </tbody>
      </table>
      {needs.editModal && <AddModal product={selectedProduct} />}
      {needs.deleteModal && <DeleteModal id={selectedProduct.id} />}
    </>
  );
}

export default TableProducts;

function TableRow({ product, setSelectedProduct }) {
  const { name, quantity, price, id } = product;
  const [checked, setChecked] = useState(false);
  const { needs, setNeeds } = useNeeds();
  const { user } = useUser();

  useEffect(() => {
    setNeeds((prev) => {
      const prevGroupDelete = prev.groupDelete;

      const newGroupDelete = checked
        ? [...prevGroupDelete, product]
        : prevGroupDelete.filter((data) => data.id !== id);

      return {
        ...prev,
        groupDelete: newGroupDelete,
      };
    });
  }, [checked]);

  useEffect(() => {
    if (!needs.checkBox) {
      setChecked(false);
    }
  }, [needs.checkBox]);

  const editHandler = (product) => {
    if (user.token) {
      setNeeds((needs) => ({ ...needs, editModal: true }));
      setSelectedProduct(product);
    } else {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
    }
  };

  const deleteHandler = (product) => {
    if (user.token) {
      setNeeds((needs) => ({ ...needs, deleteModal: true }));
      setSelectedProduct(product);
    } else {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
    }
  };

  return (
    <tr className={styles.row}>
      {needs.checkBox && (
        <td>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked((checked) => !checked)}
          />
        </td>
      )}
      <td>{name}</td>
      <td>{sp(quantity)}</td>
      <td>{sp(price)}</td>
      <td>{productId(id)}</td>
      <td>
        <div>
          <button onClick={() => editHandler(product)}>
            <img src="./edit.svg" alt="edit" />
          </button>
          <button onClick={() => deleteHandler(product)}>
            <img src="./trash.svg" alt="trash" />
          </button>
        </div>
      </td>
    </tr>
  );
}
