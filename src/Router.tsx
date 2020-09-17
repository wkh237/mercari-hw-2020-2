import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BackgroundDecoration from './components/BackgroundDecoration';
import Randomize from './layout/Randomize';
import nikumaru from './fonts/nikumaru.otf';
import lightnovalpop from './fonts/lightnovalpop.otf';
import roboto from './fonts/NotoSansCJKjp-Regular.otf';
import robotobold from './fonts/NotoSansCJKjp-Bold.otf';
import cpfont from './fonts/cp-font.otf';

const GlobalStyle = createGlobalStyle`
 * {
   box-sizing: border-box;
 }
 body {
   background-color: #f3f3f3;
 }
 @font-face {
    font-family: 'Nikumaru';
    src: url(${nikumaru});
  }

  @font-face {
    font-family: 'LightNovalPop';
    src: url(${lightnovalpop});
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${roboto});
  }
  @font-face {
    font-family: 'Roboto Bold';
    src: url(${robotobold});
  }
  @font-face {
    font-family: 'CPFont';
    src: url(${cpfont});
  }
`;

export default () => (
  <>
    <Router>
      <Switch>
        <Route path="/banners/RandomImage">
          <BackgroundDecoration color="blue" />
        </Route>
        <Route path="/">
          <Randomize />
        </Route>
        {/* <Route path="/banners/MJP48801">
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
          </Route> */}
      </Switch>
    </Router>
    <GlobalStyle />
  </>
);
