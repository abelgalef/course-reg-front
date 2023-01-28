import store from "../redux"
import { openError } from "../redux/nav";

export default function handelError(err) {
if (err.response) {
  console.log("err", err.response.data.error);
  store.dispatch(
    openError({
      type: "error",
      header: "Something Went Wrong",
      desc: err.response.data.error,
    })
  );
} else if (err.request) {
  store.dispatch(
    openError({
      type: "error",
      header: "Something Went Wrong",
      desc: "The request was made but no response was received. Make sure the back-end is reachable.",
    })
  );
} else {
  store.dispatch(
    openError({
      type: "error",
      header: "Something Went Wrong",
      desc: err.message,
    })
  );
}

console.log({ err: err, "err data": err.data, "err req": err.request });
}