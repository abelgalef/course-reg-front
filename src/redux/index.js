import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import auth from "./auth";
import nav, { openModal } from "./nav";
import role from "./role";
import dept from "./department";
import history from "./history";
import { addHistory } from "./history";

const modalListenerMiddleware = createListenerMiddleware();

modalListenerMiddleware.startListening({
  actionCreator: openModal,
  effect: async (action, listenerApi) => {
    console.log(action.payload);
    if (action.payload.ID === "ROLE_DETAIL") {
      listenerApi.dispatch(
        addHistory({
          tag: "ROLE",
          header: "Viewed a role",
          rep: false,
          detail: "You viewed a role",
          date: new Date().toISOString(),
        })
      );
    } else if (action.payload.ID === "DEPT_DETAIL") {
      listenerApi.dispatch(
        addHistory({
          tag: "DEPT",
          header: "Viewed a department",
          rep: false,
          detail: "You viewed a department",
          date: new Date().toISOString(),
        })
      );
    } else if (action.payload.ID === "GENERIC_UPDATE") {
      listenerApi.dispatch(
        addHistory({
          tag: action.payload.props.url.substring(1).toUpperCase(),
          header: "Updated a " + action.payload.props.url.substring(1),
          rep: false,
          detail: "You updated a " + action.payload.props.url.substring(1),
          date: new Date().toISOString(),
        })
      );
    } else if (action.payload.ID === "PERM_CHOOSER") {
      listenerApi.dispatch(
        addHistory({
          tag: "PERM_CHOOSER",
          header: "Gave Permission",
          rep: false,
          detail: "You gave a permission to a role",
          date: new Date().toISOString(),
        })
      );
    } else if (action.payload.ID === "GENERIC_CREATE") {
      listenerApi.dispatch(
        addHistory({
          tag: action.payload.props.url.substring(1).toUpperCase(),
          header: "Created a " + action.payload.props.url.substring(1),
          rep: false,
          detail: "You created a new " + action.payload.props.url.substring(1),
          date: new Date().toISOString(),
        })
      );
    } else if (action.payload.ID === "ROLE_USER_CHOOSER") {
      listenerApi.dispatch(
        addHistory({
          tag: "ROLE",
          header: "Add a User",
          rep: false,
          detail: "You added a user to a role group",
          date: new Date().toISOString(),
        })
      );
    } else if (action.payload.ID === "GENERIC_DELETE") {
      listenerApi.dispatch(
        addHistory({
          tag: action.payload.props.url.substring(1).toUpperCase(),
          header: "Deleted a " + action.payload.props.url.substring(1),
          rep: false,
          detail: "You deleted a new " + action.payload.props.url.substring(1),
          date: new Date().toISOString(),
        })
      );
    }
    setTimeout(
      () =>
        localStorage.setItem(
          "history",
          JSON.stringify(listenerApi.getState().history)
        ),
      500
    );
  },
});

export default configureStore({
  reducer: {
    auth,
    nav,
    role,
    dept,
    history,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(modalListenerMiddleware.middleware),
});
