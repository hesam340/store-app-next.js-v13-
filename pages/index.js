import HomePage from "@/templates/HomePage";
import api from "@/configs/api";
import { toast } from "react-toastify";

export default function Home({ data }) {
  return <HomePage data={data} />;
}

export async function getServerSideProps({ query }) {
  let response;
  try {
    response = await api.get(
      `http://localhost:3001/products?${
        query.limit && `limit=${query.limit}`
      }&${query.page && `page=${query.page}`}&${
        query.name && `name=${query.name}`
      }&${query.minPrice && `minPrice=${query.minPrice}`}&${
        query.maxPrice && `maxPrice=${query.maxPrice}`
      }`
    );
  } catch (error) {
    response = { data: [], message: "هیچ نتیجه ای یافت نشد" };
  }

  return {
    props: { data: response },
  };
}
