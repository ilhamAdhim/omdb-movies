import React, { useState } from "react";

import { Alert, Button } from "react-bootstrap";

interface ICustomAlertProps {
  isAlertOpen: boolean;
  setIsAlertOpen: (state: boolean) => void;
  variant:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark"
    | "light";
  title: string;
  message?: string;
}

const CustomAlert: React.FC<ICustomAlertProps> = ({
  title,
  variant,
  message,
  isAlertOpen,
  setIsAlertOpen,
}) => {
  if (isAlertOpen) {
    return (
      <Alert
        variant={variant}
        onClose={() => setIsAlertOpen(false)}
        dismissible
      >
        {message !== undefined ? (
          <>
            <Alert.Heading> {title}</Alert.Heading>
            <p>{message}</p>
          </>
        ) : (
          <>{title}</>
        )}
      </Alert>
    );
  }
  return null;
};

export default CustomAlert;
