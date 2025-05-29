import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("data")) || {
        username: "",
        token: "",
        avatar: "",
      }
    );
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => {
  const { user, setUser } = useContext(UserContext);
  return { user, setUser };
};

export default UserProvider;
export { useUser };
