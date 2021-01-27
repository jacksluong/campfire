import React, { Component } from "react";
import { isTryStatement } from "typescript";
import { get, post } from "../../../utilities";

interface Props {
  name: string;
  userId: string;
  pfp: string;
  bio: string;
}

interface State {
  value: string;
  access: boolean;
  disabled: boolean;
}
class ProfileSection extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.bio,
      disabled: true,
      access: false,
    };
  }

  componentDidMount() {
    get("/api/verifyAccess", { userId: this.props.userId }).then((res) => {
      this.setState({
        access: res.verify,
        value: res.bio,
      });
      console.log("in cdm of profile section");
      console.log(res.verify);
    });
  }
  componentDidUpdate() {
    document.getElementById("avatar").style.backgroundImage = `url(${this.props.pfp})`;
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    post("/api/updateBio", { bio: this.state.value });
    this.setState({
      disabled: !this.state.disabled,
    });
  };
  render() {
    return (
      <div className="ProfileSection container">
        <div className="ProfilePicture container">
          <div className="ProfilePicture avatar" id="avatar" />
        </div>
        <div className="AboutMe container">
          <h1>{this.props.name}</h1>
        </div>
        <div className="AboutMeDescription container">
          {this.state.access ? (
            <div>
              {this.state.disabled ? (
                this.state.value
              ) : (
                <input
                  type="text"
                  maxLength={100}
                  placeholder="Edit Bio Here"
                  value={this.state.value}
                  onChange={this.handleChange}
                  className="BioInputField"
                  disabled={this.state.disabled}
                />
              )}
              <button className="BioButton" onClick={this.handleClick}>
                {this.state.disabled ? "Edit" : "Save"}
              </button>
            </div>
          ) : (
            <div className="Bio">{this.props.bio}</div>
          )}
        </div>
      </div>
    );
  }
}
export default ProfileSection;
