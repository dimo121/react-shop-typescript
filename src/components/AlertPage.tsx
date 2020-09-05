import * as React from "react";
import { useState } from "react";
import { Container, Button, Alert } from "reactstrap";
import { CSSTransition } from "react-transition-group";

const AlertPage: React.SFC = () => {
  const [showButton, setShowButton] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Container className="alert-container">
      <CSSTransition
        in={showButton}
        timeout={450}
        classNames="alert"
        unmountOnExit
      >
        <div>
          <h1>WARNING</h1>
          <Button
            onClick={() => setShowAlert(true)}
            size="lg"
            className="alert-container-button"
          >
            Alert
          </Button>
        </div>
      </CSSTransition>
      <CSSTransition
        in={showAlert}
        timeout={450}
        classNames="alert"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
        <Alert variant="primary" dismissible className="alert-container-alert">
          <p>T2 temperature reading is elevated</p>
          <Button
            onClick={() => setShowAlert(false)}
            className="alert-container-button alert-container-button-internal"
          >
            Close
          </Button>
        </Alert>
      </CSSTransition>
    </Container>
  );
};

export default AlertPage;
