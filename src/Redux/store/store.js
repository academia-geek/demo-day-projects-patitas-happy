import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { formReducers } from "../reducers/formReducer";
import { loginReducers } from "../reducers/loginReducers";
import { userReducers } from "../reducers/userReducers";
import { mascotasReducers } from "../reducers/mascotaReducers";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  loginStore: loginReducers,
  regisUserStore: userReducers,
  mascotasStore: mascotasReducers,
  formStore: formReducers,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
