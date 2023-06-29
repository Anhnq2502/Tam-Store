import { combineReducers, createStore } from "redux";
import apiReducer from "./Redux/Reduce";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  api: apiReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

// Lấy dữ liệu từ localStorage
const getStoredData = () => {
  const storedData = localStorage.getItem("cart");
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
};

export { store, persistor, getStoredData };
