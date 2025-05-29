import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { deleteOneProduct, groupDeleteProducts } from "@/services/product";
import { useNeeds } from "@/context/NeedsContext";
import { useUser } from "@/context/UserContext";
import { e2p } from "@/utils/replaceNumber";

import styles from "@/module/DeleteModal.module.css";

function DeleteModal({ id }) {
  const router = useRouter();
  const { needs, setNeeds } = useNeeds();
  const { user, setUser } = useUser();

  const deleteHandler = () => {
    if (id) {
      deleteOneProduct(id);
      setNeeds((needs) => ({ ...needs, deleteModal: false }));
    } else {
      groupDeleteProducts(needs.groupDelete);
      setNeeds((needs) => ({
        ...needs,
        groupDelete: [],
        checkBox: false,
        deleteModal: false,
      }));
    }
    router.push(
      { pathname: "/", query: { limit: 10, page: router.query.page } },
      undefined,
      { scroll: false }
    );
  };

  const exitHandler = () => {
    setUser({ username: "", token: "" });
    document.cookie = `token="";max-age=0`;
    setNeeds((needs) => ({ ...needs, exitModal: false }));
    toast.success(`${user.username} از حساب کاربری خود خارج شدید`);
    router.push(
      { pathname: "/", query: { limit: 10, page: router.query.page } },
      undefined,
      { scroll: false }
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <img src="/Close.png" alt="delete logo" />
        {needs.exitModal ? (
          <p>شما در حال خروج از حساب کاربری خود هستید آیا اطمینان دارید؟</p>
        ) : (
          <p>
            شما در حال حذف {id ? "1" : e2p(needs.groupDelete.length)} کالا هستید
            ، آیا مطمئنید ؟
          </p>
        )}
        <div className={styles.buttons}>
          {needs.exitModal ? (
            <>
              <button onClick={exitHandler}>خروج</button>
              <button
                onClick={() =>
                  setNeeds((needs) => ({ ...needs, exitModal: false }))
                }
              >
                لغو
              </button>
            </>
          ) : (
            <>
              <button onClick={deleteHandler}>حذف</button>
              <button
                onClick={() =>
                  setNeeds((needs) => ({ ...needs, deleteModal: false }))
                }
              >
                لغو
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
