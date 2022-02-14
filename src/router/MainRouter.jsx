import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductsPage from "../pages/products-page";

const MainRouter = ({}) => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={ProductsPage} />
        </Switch>
      </Router>
    </>
  );
};
export default MainRouter;
