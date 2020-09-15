import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MJP31271 from "./layout/MJP31271";
import MJP45721 from "./layout/MJP45721";
import MJP48801 from "./layout/MJP48801";
import CouponLayoutMJP34066 from "./layout/CouponLayout-MJP-34046";
import Background from "./layout/Background";

const Container = styled.div`
  border: 4px solid #efefef;
  width: 600px;
  height: 100px;
  overflow: hidden;
`;
const GlobalStyle = createGlobalStyle`
 * {
   box-sizing: border-box;
 }
`;

export default () => (
  <>
    <Container>
      <Router>
        <Switch>
          <Route path="/banners/MJP48801">
            <MJP48801 />
          </Route>
          <Route path="/banners/MJP45721">
            <MJP45721 />
          </Route>
          <Route path="/banners/MJP31271">
            <MJP31271 />
          </Route>
          <Route path="/banners/MJP34046">
            <CouponLayoutMJP34066 />
          </Route>
          <Route path="/banners/Background">
            <Background />
          </Route>
        </Switch>
      </Router>
      <GlobalStyle />
    </Container>
  </>
);
