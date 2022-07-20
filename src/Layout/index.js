import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
