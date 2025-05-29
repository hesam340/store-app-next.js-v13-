import { useEffect, useState } from "react";

import { getAllPagesProducts } from "@/services/product";
import TableProducts from "@/module/TableProducts";
import { useUser } from "@/context/UserContext";
import Paginate from "@/module/Paginate";
import Actions from "@/module/Actions";
import Search from "@/module/Search";

import styles from "@/templates/HomePage.module.css";

function HomePage({ data }) {
  const { user, setUser } = useUser();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    if (data.message) return;
    const allProducts = async () => {
      const fetchProducts = await getAllPagesProducts(data.totalPages);
      return setAllProducts(fetchProducts);
    };
    allProducts();
  }, []);

  useEffect(() => {
    if (!user.token || !document.cookie) setUser({ username: "", token: "" });
  }, [user.token]);

  return (
    <div className={styles.container}>
      <Search />
      <div className={styles.actions}>
        <Actions allProducts={allProducts} />
        <div className={styles.table}>
          <TableProducts data={data} />
        </div>
      </div>
      <Paginate count={data.totalPages} />
    </div>
  );
}

export default HomePage;
