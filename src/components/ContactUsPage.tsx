import * as React from "react";

import ContactUs from "./ContactUs";
import { ISubmitResult, IValues } from "./Form";

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

class ContactUsPage extends React.Component<{}, {}> {
  private handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
    await wait(1000);
    return {
      //   errors: {
      //     email: ["Some is wrong with us"],
      //   },
      success: true,
    };
  };

  public render() {
    return (
      <div className="page-container">
        <h1>Contact Us</h1>
        <p>
          If you enter your details we'll get back to you as soon as we can.
        </p>
        <ContactUs onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default ContactUsPage;

//old component no longer requires state as it's managed within Form
// import * as React from 'react';

// import ContactUs from './ContactUs';

// interface IState {
//     name: string;
//     email: string;
//     reason: string;
//     notes: string;
// }

// class ContactUsPage extends React.Component<{},IState> {

//     public constructor(props: {}){
//         super(props);

//         this.state = {
//             email: "",
//             name: "",
//             notes: "",
//             reason: ""
//         };
//     }

//     private handleNameChange = (name: string) => {
//         this.setState({ name });
//     }

//     private handleEmailChange = (email: string) => {
//         this.setState({ email });
//     }

//     private handleReasonChange = (reason: string) => {
//         this.setState({ reason });
//     }

//     private handleNotesChange = (notes: string) => {
//         this.setState({ notes });
//     }

//     public render() {
//         return (
//             <div className='page-container'>
//                 <h1>Contact Us</h1>
//                 <p>
//                     If you enter your details we'll get back to you as soon as we can.
//                 </p>
//                 <ContactUs  name={this.state.name}
//                             onNameChange={this.handleNameChange}
//                             email={this.state.email}
//                             onEmailChange={this.handleEmailChange}
//                             reason={this.state.reason}
//                             onReasonChange={this.handleReasonChange}
//                             notes={this.state.notes}
//                             onNotesChange={this.handleNotesChange}
//                              />
//             </div>
//         );
//     }
// }

// export default ContactUsPage;
