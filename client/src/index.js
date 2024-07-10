import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/Context";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { StreamContextProvider } from "./context/StreamContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppContextProvider>
    <BrowserRouter>
      <StreamContextProvider>
        <App />
      </StreamContextProvider>
    </BrowserRouter>
  </AppContextProvider>
);
