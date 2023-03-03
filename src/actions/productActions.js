import api from "../api/apiAdapter";

export const fetchProducts = () => async (dispatch) => {
  const res = await api.get("/product");
  dispatch({ type: "FETCH_PRODUCTS", payload: res.data });
};
