import React, { Component } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface Props {
  name: string;
}
class ProfileSection extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/aos@next/dist/aos.css";
    script.innerHTML = AOS.init({
      offset: 200,
      duration: 500,
    });
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return (
      <div className="ProfileSection container" data-aos="fade-right">
        <div className="ProfilePicture container">
          <div className="ProfilePicture avatar" />
        </div>
        <div className="AboutMe container">
          <h1>{this.props.name}</h1>
        </div>
        <div className="AboutMeDescription container">
          Are you oxygen? Cuz I can't live without u
        </div>
      </div>
    );
  }
}
export default ProfileSection;
