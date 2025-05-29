import { useRouter } from "next/router";

import { PaginationItem, Stack } from "@mui/material";
import { Pagination } from "@mui/material";

import { e2p } from "@/utils/replaceNumber";

function Paginate({ count }) {
  const router = useRouter();
  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={count}
        page={Number(router.query.page) || 1}
        onChange={(e, number) => {
          router.push({ pathname: "/", query: { limit: 10, page: number } });
        }}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            page={typeof item.page === "number" ? e2p(item.page) : item.page}
            sx={{
              fontFamily: "vazirmatn",
              fontSize: "1rem",
              "&.Mui-selected": {
                backgroundColor: item.selected ? "#4a92d6" : "#e6e6e6",
                border: item.selected
                  ? "2px solid #4a92d6"
                  : "2px solid #8D8D8D",
                color: item.selected ? "#fff" : "#8D8D8D",
              },
              "&.Mui-selected:hover": {
                backgroundColor: item.selected ? "#4a92d6" : "#e6e6e6",
                border: item.selected
                  ? "2px solid #4a92d6"
                  : "2px solid #8D8D8D",
                color: item.selected ? "#fff" : "#8D8D8D",
              },
            }}
          />
        )}
      />
    </Stack>
  );
}

export default Paginate;
