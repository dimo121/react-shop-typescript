import * as React from "react";

// The following is required for input validation

export type Validator = (
  fieldName: string,
  values: IValues,
  args?: any
) => string;

export const required: Validator = (
  fieldName: string,
  values: IValues
): string =>
  values[fieldName] === undefined ||
  values[fieldName] === null ||
  values[fieldName] === ""
    ? "This field must be populated"
    : "";

export const minLength: Validator = (
  fieldName: string,
  values: IValues,
  length: number
): string =>
  values[fieldName] && values[fieldName].length < length
    ? `It must be at least ${length} characters`
    : "";

/*
    npm validator module not recognized by compiler
export const emailVerify: Validator = (
  fieldName: string,
  values: IValues
): string => (isEmail(values[fieldName]) ? "" : "Please enter a valid email address");
*/

// and to pass Validation fields in as a prop to Form component

interface IValidation {
  validator: Validator;
  arg?: any;
}

interface IValidationProp {
  [key: string]: IValidation | IValidation[];
}

//-------------------------------------------------------------

//interface for error state

interface IErrors {
  [key: string]: string[];
}

export interface IValues {
  [key: string]: any;
}

export interface ISubmitResult {
  success: boolean;
  errors?: IErrors;
}

interface IFormProps {
  defaultValues: IValues;
  validationRules: IValidationProp;
  onSubmit: (values: IValues) => Promise<ISubmitResult>;
}

interface IState {
  values: IValues;
  errors: IErrors;
  submitting: boolean;
  submitted: boolean;
}

interface IFieldProps {
  name: string;
  label: string;
  type?: "Text" | "Email" | "Select" | "TextArea";
  options?: string[];
}

interface IFormContext {
  errors: IErrors;
  values: IValues;
  setValue?: (fieldName: string, value: any) => void;
  validate?: (fieldName: string, value: any) => void;
}

const FormContext = React.createContext<IFormContext>({
  values: {},
  errors: {},
});

export class Form extends React.Component<IFormProps, IState> {
  constructor(props: IFormProps) {
    super(props);
    const errors: IErrors = {};
    Object.keys(props.defaultValues).forEach((fieldName) => {
      errors[fieldName] = [];
    });
    this.state = {
      values: props.defaultValues,
      errors,
      submitting: false,
      submitted: false,
    };
  }

  public static Field: React.SFC<IFieldProps> = (props) => {
    const { name, label, type, options } = props;

    const handleChange = (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
      context: IFormContext
    ) => {
      if (context.setValue) {
        context.setValue(props.name, e.currentTarget.value);
      }
    };

    const handleBLur = (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
      context: IFormContext
    ) => {
      if (context.validate) {
        context.validate(props.name, e.currentTarget.value);
      }
    };

    return (
      <FormContext.Consumer>
        {(context) => (
          <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {(type === "Text" || type === "Email") && (
              <input
                type={type.toLowerCase()}
                id={name}
                value={context.values[name]}
                onChange={(e) => handleChange(e, context)}
                onBlur={(e) => handleBLur(e, context)}
              />
            )}
            {type === "TextArea" && (
              <textarea
                id={name}
                value={context.values[name]}
                onChange={(e) => handleChange(e, context)}
                onBlur={(e) => handleBLur(e, context)}
              />
            )}
            {type === "Select" && (
              <select
                value={context.values[name]}
                onChange={(e) => handleChange(e, context)}
                onBlur={(e) => handleBLur(e, context)}
              >
                {options &&
                  options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            )}
            {context.errors[name] &&
              context.errors[name].length > 0 &&
              context.errors[name].map((error) => (
                <span key={error} className="form-error">
                  {error}
                </span>
              ))}
          </div>
        )}
      </FormContext.Consumer>
    );
  };

  private setValue = (fieldName: string, value: any) => {
    const newValues = { ...this.state.values, [fieldName]: value };
    this.setState({ values: newValues });
  };

  private validate = (fieldName: string, value: any): string[] => {
    const rules = this.props.validationRules[fieldName];
    const errors: string[] = [];

    if (Array.isArray(rules)) {
      rules.forEach((rule) => {
        const error = rule.validator(fieldName, this.state.values, rule.arg);

        if (error) {
          errors.push(error);
        }
      });
    } else {
      if (rules) {
        const error = rules.validator(fieldName, this.state.values, rules.arg);
        if (error) {
          errors.push(error);
        }
      }
    }

    const newErrors = { ...this.state.errors, [fieldName]: errors };
    this.setState({ errors: newErrors });

    return errors;
  };

  private validateForm(): boolean {
    const errors: IErrors = {};
    let haveError: boolean = false;
    Object.keys(this.props.defaultValues).map((fieldName) => {
      errors[fieldName] = this.validate(
        fieldName,
        this.state.values[fieldName]
      );

      if (errors[fieldName].length > 0) {
        haveError = true;
      }
    });
    this.setState({ errors });
    return !haveError;
  }

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.validateForm()) {
      this.setState({ submitting: true });
      const result = await this.props.onSubmit(this.state.values);
      this.setState({
        errors: result.errors || {},
        submitted: result.success,
        submitting: false,
      });
    }
  };

  public render() {
    const context: IFormContext = {
      validate: this.validate,
      setValue: this.setValue,
      values: this.state.values,
      errors: this.state.errors,
    };

    return (
      <FormContext.Provider value={context}>
        <form className="form" noValidate={true} onSubmit={this.handleSubmit}>
          {this.props.children}
          <div className="form-group">
            <button
              type="submit"
              disabled={this.state.submitted || this.state.submitting}
            >
              Submit
            </button>
          </div>
        </form>
      </FormContext.Provider>
    );
  }
}
