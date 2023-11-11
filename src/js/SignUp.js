import React, { Component } from "react";
import { Timestamp } from "firebase/firestore";
import FormUserAge from "./FormUserAge";
import FormUserName from "./FormUserName";
import FormUserGender from "./FormUserGender";
import FormUserImages from "./FormUserImages";
import FormUserGoogle from "./FormUserGoogle";
import FormUserLocation from "./FormUserLocation";
import FormUploadUser from "./FormUploadUser";

export class SignUp extends Component {
  state = {
    step: 1,
    user: {},
    name: "",
    dob: Timestamp.fromDate(new Date()),
    gender: "",
    images: [],
    livesIn: "",
    livesInLoc: [],
  };
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
    console.log(this.state.step);
  };
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleChangeGoogle = (e) => {
    //   e.preventDefault();
    this.setState({ user: e });
  };
  handleChange = (input, e) => {
    this.setState({ [input]: e });
  };
  render() {
    const { step } = this.state;
    const { user, name, dob, gender, images, livesIn, livesInLoc } = this.state;
    const values = { user, name, dob, gender, images, livesIn, livesInLoc };
    switch (step) {
      case 1:
        return (
          <FormUserGoogle
            nextStep={this.nextStep}
            handleChange={this.handleChangeGoogle}
            values={values}
            step={step}
          />
        );
      case 2:
        return (
          <FormUserName
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            step={step}
          />
        );
      case 3:
        return (
          <FormUserAge
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            step={step}
          />
        );
      case 4:
        return (
          <FormUserGender
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            step={step}
          />
        );
      case 5:
        return (
          <FormUserImages
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            step={step}
          />
        );
      case 6:
        return (
          <FormUserLocation
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            step={step}
          />
        );
      case 7:
        return <FormUploadUser values={values} />;
      default:
        console.log("This is a multi-step form built with React.");
    }
  }
}

export default SignUp;
