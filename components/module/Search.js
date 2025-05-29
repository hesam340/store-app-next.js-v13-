import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useNeeds } from "@/context/NeedsContext";
import fileToBase64 from "@/utils/convertImage";
import { useUser } from "@/context/UserContext";
import DeleteModal from "@/module/DeleteModal";

import styles from "@/module/Search.module.css";

function Search() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { needs, setNeeds } = useNeeds();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (router.query.name) {
      setSearchText(router.query.name);
    }
  }, []);

  const imageHandler = async (e) => {
    const file = e.target.files[0];
    if (file.size > 30000)
      return toast.error("سایز عکس نباید بیش از 30 کیلو بایت باشد");

    if (file) {
      const base64 = await fileToBase64(file);
      setUser((user) => ({ ...user, avatar: base64 }));
    }
  };

  const enterHandler = (e) => {
    if (e.key === "Enter" || e.target.tagName === "IMG") {
      const query = { ...router.query };

      query.page = 1;

      if (searchText.trim()) {
        query.name = searchText.trim();
      } else {
        delete query.name;
      }

      router.push({
        pathname: "/",
        query,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <img src="./search.svg" alt="search" onClick={enterHandler} />
        <input
          type="text"
          placeholder="جستجو در نام کالا"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={enterHandler}
        />
      </div>
      <div className={styles.profile}>
        {user.token ? (
          <div className={styles.exitProfile}>
            <div>
              <img src={user.avatar || "./profile.svg"} alt="avatar" />
              <label htmlFor="avatar">+</label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={imageHandler}
              />
            </div>
            <p>{user.username}</p>
            <button
              onClick={() =>
                setNeeds((needs) => ({ ...needs, exitModal: true }))
              }
            >
              خروج از حساب کاربری
            </button>
          </div>
        ) : (
          <button
            className={styles.enterProfile}
            onClick={() => router.push("/signin")}
          >
            ورود به حساب کاربری
          </button>
        )}
      </div>
      {needs.exitModal && <DeleteModal />}
    </div>
  );
}

export default Search;
