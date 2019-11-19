import "./style/style.css";
import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Router } from "react-router-dom";
import history from "./history";

import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import App from "./components/App";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <App Wrapped={SongList} />;
            }}
          />
          <Route
            path="/songs/new"
            render={() => {
              return <App Wrapped={SongCreate} />;
            }}
          />
          <Route
            path="/songs/:id"
            render={routeProps => {
              return <App Wrapped={SongDetail} routeProps={routeProps} />;
            }}
          />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
