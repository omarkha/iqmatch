const store = createStore();

import { createStore } from "redux";
import { cartReducer } from "./reducers/cartReducer";

store = createStore(cartReducer);

export default store;
