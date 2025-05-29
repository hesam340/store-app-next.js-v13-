import { toast } from "react-toastify";

import { useNeeds } from "@/context/NeedsContext";
import { useUser } from "@/context/UserContext";
import DeleteModal from "@/module/DeleteModal";
import PriceInputs from "@/module/PriceInputs";
import { e2p } from "@/utils/replaceNumber";
import AddModal from "@/module/AddModal";

import styles from "@/module/Actions.module.css";

function Actions({ allProducts }) {
  const { user } = useUser();
  const { needs, setNeeds } = useNeeds();

  const groupDeleteHandler = () => {
    if (user.token) {
      setNeeds((needs) => ({ ...needs, checkBox: true }));
    } else {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
    }
  };

  const addHandler = () => {
    if (user.token) {
      setNeeds((needs) => ({ ...needs, addModal: true }));
    } else {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
    }
  };

  const quitHandler = () => {
    setNeeds((needs) => ({
      ...needs,
      checkBox: false,
      groupDelete: [],
    }));
  };

  return (
    <div className={styles.actions}>
      <div className={styles.titleRight}>
        <img src="./setting-3.svg" alt="مدیریت کالا" />
        <p>مدیریت کالا</p>
      </div>
      <div className={styles.titleLeft}>
        <PriceInputs allProducts={allProducts} />
        {!needs.groupDelete.length ? (
          <button className={styles.deleteButton} onClick={groupDeleteHandler}>
            حذف گروهی
          </button>
        ) : (
          <button
            className={styles.deleteCounter}
            onClick={() =>
              setNeeds((needs) => ({ ...needs, deleteModal: true }))
            }
          >
            حذف ({e2p(needs.groupDelete.length)})
          </button>
        )}
        {needs.checkBox && (
          <button className={styles.quit} onClick={quitHandler}>
            انصراف
          </button>
        )}
        <button className={styles.addButton} onClick={addHandler}>
          افزودن محصول
        </button>
      </div>
      {needs.deleteModal && <DeleteModal />}
      {needs.addModal && <AddModal />}
    </div>
  );
}

export default Actions;
