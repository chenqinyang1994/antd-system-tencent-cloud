import React, { Component } from "react";
import { DatePicker } from "antd";
import "./index.less";

class AiQa extends Component {
  state = {
    val: "",
  };

  sett = null;

  componentDidMount() {
    this.sett = setTimeout(() => {
      this.setState({ val: "77777999" });
    }, 2500);
  }

  componentWillUnmount() {
    clearTimeout(this.sett);
  }

  render() {
    return (
      <div className="login-cc">
        <DatePicker />
        <p>login123123</p>
        {this.state.val && <span>{this.state.val}</span>}
      </div>
    );
  }
}

export default AiQa;
