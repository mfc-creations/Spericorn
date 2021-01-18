import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import routes from "./routes";

const RenderRoute = (route) => {
  document.title = route.title || "Spericorn";
  return (
    <Route
      path={route.path}
      exact
      render={(props) => <route.component {...props} />}
    ></Route>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RenderRoute {...route} key={index} />
          ))}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
