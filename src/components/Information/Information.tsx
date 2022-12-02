import React, { ReactElement, SVGProps } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

interface IInformationProps {
  fullpage: boolean;
  title: string;
  withLink?: boolean;
  linkText?: string;
  linkRedirect?: string;
  SVGComponent: ReactElement<SVGProps<SVGSVGElement>>;
}

const Information: React.FC<IInformationProps> = ({
  fullpage,
  title,
  withLink,
  linkText,
  linkRedirect,
  SVGComponent,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: fullpage ? "90vh" : "auto",
        width: "auto",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {SVGComponent}
      <div
        style={{
          margin: "1em",
          fontWeight: "bold",
        }}
      >
        {title}
      </div>
      {withLink && linkRedirect && (
        <Link to={linkRedirect}>
          <Button>{linkText}</Button>
        </Link>
      )}
    </div>
  );
};

export default Information;
