import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/userReducer";
import jwtReducer from "./reducers/jwtReducer";

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  auth: jwtReducer
});

// export default rootReducer;
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
