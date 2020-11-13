// import 'lib-flexible';
// import './views/login/index.less';

import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";

ReactDOM.render(
  <React.StrictMode>{Router}</React.StrictMode>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}

// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import "./assets/css/ssr.css";
// const React = require('react');
// const ReactDOM = require("react-dom");
// require('./assets/css/ssr.css');

// const foo = {
//     bar: 'This is a bar.', baz: { qux: 'This is a qux' }, difficult: 'to read', diffi: 'to read', difficul: 'to read',
// };

// class MyFirstSsr extends React.Component {
//   state = {
//       val: 123,
//   };

//   componentDidMount() {
//       this.setState({
//           val: 456,
//       });
//   }

//   render() {
//       return <div className="wrap">
//           {Array.isArray([1, 2]) ? <div>{this.state.val}</div> : <div><span>{this.state.val}</span><p>{this.state.val}</p></div>}
//       </div>;
//   }
// }

// module.exports = <MyFirstSsr />;
