import Layout from "./hoc/Layout/Layout";
import BurguerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.token.tokenId);

  let routes = (
    <>
      <Route path="/" exact element={<BurguerBuilder />} />
      <Route path="/sign-in" exact element={<Auth />} />
    </>
  );
  if (token) {
    routes = (
      <>
        <Route path="/" exact element={<BurguerBuilder />} />
        <Route path="/checkout/*" exact element={<Checkout />} />
        <Route path="/orders" exact element={<Orders />} />
        <Route path="/logout" exact element={<Logout />} />
      </>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>{routes}</Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
