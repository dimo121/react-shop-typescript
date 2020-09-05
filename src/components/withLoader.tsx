import * as React from "react";

interface IProps {
  loading: boolean;
}

const withLoader = <P extends object>(
  Component: React.ComponentType<P>
): React.SFC<P & IProps> => ({ loading, ...props }: IProps) =>
  loading ? (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    <Component {...(props as P)} />
  );
//return a loading spinner if loading is true
//when loading becomes false after the fetch the component renders again

export default withLoader;

//P & IProps give an intersection type with all the properties and methods
// of the constituents.
