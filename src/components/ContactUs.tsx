import * as React from "react";

import { required, minLength, Form, ISubmitResult, IValues } from "./Form";

interface IProps {
  onSubmit: (values: IValues) => Promise<ISubmitResult>;
}

const ContactUs: React.SFC<IProps> = (props) => {
  const handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
    const result = await props.onSubmit(values);
    return result;
  };

  return (
    <Form
      defaultValues={{ name: "", email: "", reason: "", notes: "" }}
      validationRules={{
        email: { validator: required },
        name: [{ validator: required }, { validator: minLength, arg: 2 }],
      }}
      onSubmit={handleSubmit}
    >
      <Form.Field name="name" label="Your name" type="Text" />
      <Form.Field name="email" label="Your email address" type="Email" />
      <Form.Field
        name="reason"
        label="Reason you need to contact us"
        type="Select"
        options={["Marketing", "Support", "Feedback", "Jobs", "Other"]}
      />
      <Form.Field name="notes" label="Additional notes" type="TextArea" />
    </Form>
  );
};

export default ContactUs;

// old component without composite components

// import ProductsPage from './ProductsPage';

// interface IProps {
//     name: string;
//     email: string;
//     reason: string;
//     notes: string;
//     onNameChange: (name: string) => void;
//     onEmailChange: (email: string) => void;
//     onReasonChange: (reason: string) => void;
//     onNotesChange: (notes: string) => void;
// }

// const ContactUs: React.SFC<IProps> = props => {

//     const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         props.onNameChange(e.currentTarget.value);
//     };

//     const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         props.onEmailChange(e.currentTarget.value);
//     };

//     const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         props.onReasonChange(e.currentTarget.value);
//     };

//     const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         props.onNotesChange(e.currentTarget.value);
//     };

//     return (
//         <form className="form" noValidate={true}>
//             <div className="form-group">
//                 <label htmlFor="name">Your name</label>
//                 <input type="text" id="name" value={props.name} onChange={handleNameChange} />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="email">Your email</label>
//                 <input type="email" id="email" value={props.email} onChange={handleEmailChange} />
//             </div>
//             <div className="form-group">
//                 <label htmlFor="reason">Reason you need to contact us</label>
//                 <select id="reason" value={props.reason} onChange={handleReasonChange} >
//                     <option value="Marketing">Marketing</option>
//                     <option value="Support">Support</option>
//                     <option value="Feedback">Feedback</option>
//                     <option value="Jobs">Jobs</option>
//                     <option value="Other">Other</option>
//                 </select>
//             </div>
//             <div className="form-group">
//                 <label htmlFor="notes">Additional notes</label>
//                 <textarea id="notes" value={props.notes} onChange={handleNotesChange} />
//             </div>
//         </form>
//     );
// };

// export default ContactUs;
