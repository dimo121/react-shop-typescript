import * as React from "react";

interface IState {
  activeName: string;
  activeContent: React.ReactNode;
}

interface ITabProps {
  name: string;
  initialActive?: boolean;
  heading: () => string | JSX.Element;
}

interface ITabsContext {
  activeName?: string;
  handleTabClick?: (name: string, content: React.ReactNode) => void;
}

const TabsContext = React.createContext<ITabsContext>({});

class Tabs extends React.Component<{}, IState> {
  public static Tab: React.SFC<ITabProps> = (props) => (
    <TabsContext.Consumer>
      {(context: ITabsContext) => {
        if (!context.activeName && props.initialActive) {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
            return null;
          }
        }

        const activeName = context.activeName
          ? context.activeName
          : props.initialActive
          ? props.name
          : "";

        const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
          }
        };

        return (
          <li
            onClick={handleTabClick}
            className={props.name === activeName ? "active" : ""}
          >
            {props.heading()}
          </li>
        );
        //above props.children changed to props.heading() for heading
        //as children will now become the content
      }}
    </TabsContext.Consumer>
  );

  private handleTabClick = (name: string, content: React.ReactNode) => {
    this.setState({ activeName: name, activeContent: content });
  };

  public render() {
    return (
      <TabsContext.Provider
        value={{
          activeName: this.state ? this.state.activeName : "",
          handleTabClick: this.handleTabClick,
        }}
      >
        <ul className="tabs">{this.props.children}</ul>
        <div>{this.state && this.state.activeContent}</div>
      </TabsContext.Provider>
    );
  }
}

export default Tabs;

/* Tabs component is refactored into the compound component 
pattern to seperate the description from the reviews and offers
more flexibility in tab content i.e. not necesarilly an array of string
headings as shown below. We have chosen a class based component because
it will need to track state for whichever tab heading is active, with the 
above passing state through Context from the parent component Tabs to static
child component Tab - does not exist as instance, therefore no "this" reference
within Tab SFC. */

//OLD Component is shown below without the use of compound components

// interface IProps {
//     headings: string[];
// }

// interface IState {
//     activeName: string;
// }

// class Tabs extends React.Component<{}, IState> {

//     public constructor(props:IProps){
//         super(props);
//         this.state = {
//             activeHeading:
//                 this.props.headings && this.props.headings.length > 0
//                 ? this.props.headings[0] : ""
//         };
//     }

//     public static Tab: React.SFC<ITabProps> = props =>
//     <li>{props.children}</li>;

//     private handleTabClick = (e:React.MouseEvent<HTMLLIElement>) => {
//         const li = e.target as HTMLLIElement;
//         const heading: string = li.textContent ? li.textContent : "";
//         this.setState({ activeHeading: heading });
//     };

//     public render() {
//         return (
//             <ul className="tabs">
//                 {this.props.headings.map(heading => (
//                     <li onClick={this.handleTabClick}
//                         className={heading === this.state.activeHeading ?
//                     'active' : ''}
//                     >
//                         {heading}
//                     </li>
//                 ))}
//             </ul>
//         );
//     }
// }

// export default Tabs;
