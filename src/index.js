import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { applyMiddleware, createStore } from "redux";
import productsReducer from "./reducers";
import { Provider } from "react-redux";
import "./styles/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./components/App";
import { SHOW_NOTIFICATION } from "./actions";
// creating thunk middleware so that if a action is of type function it will the action with dispatch as argument
const thunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      action(dispatch);
      return;
    }
    next(action);
  };
// creating notification middleware to show notifications
const notification =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === SHOW_NOTIFICATION) {
      if (action.notification.success) {
        toast.success(`${action.notification.message}`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(`${action.notification.message}`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    }
    next(action);
  };
// creating store with productsReducer as reducer and thunk,notification middlewares
const store = createStore(
  productsReducer,
  applyMiddleware(thunk, notification)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
export const StoreContext = createContext();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        // giving class to toast container to change position of notifiaction bar
        className="toast-position"
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </Provider>
  </React.StrictMode>
);
