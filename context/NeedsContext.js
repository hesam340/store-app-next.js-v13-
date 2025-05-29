import { createContext, useContext, useState } from "react";

const NeedsContext = createContext();

function NeedsProvider({ children }) {
  const [needs, setNeeds] = useState({
    checkBox: false,
    groupDelete: [],
    deleteModal: false,
    editModal: false,
    addModal: false,
    exitModal: false,
  });

  return (
    <NeedsContext.Provider value={{ needs, setNeeds }}>
      {children}
    </NeedsContext.Provider>
  );
}

const useNeeds = () => {
  const { needs, setNeeds } = useContext(NeedsContext);
  return { needs, setNeeds };
};

export default NeedsProvider;
export { useNeeds };
