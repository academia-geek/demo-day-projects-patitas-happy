import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { formReducers } from "../reducers/formReducer";
import { loginReducers } from "../reducers/loginReducers";
import { mascotasReducers } from "../reducers/mascotaReducers";
import { solicitudesReducers } from "../reducers/solicitudesReducer";
import { apadrinarReducers } from "../reducers/apadrinarReducers";
import { requestReducer } from "../reducers/requestReducer";


const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  UserStore: loginReducers, 
  mascotasStore: mascotasReducers,
  solicitudesStore: requestReducer,
  formStore: formReducers,
  solicitudAdopStore: solicitudesReducers,
  apadrinarStore: apadrinarReducers
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
