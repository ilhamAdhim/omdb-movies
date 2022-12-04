import Information from "components/Information";
import { ReactComponent as NotFound } from "assets/404.svg";

const NoMatchPage = () => {
  return (
    <Information
      withLink
      fullpage
      title="Oops ! Page not found"
      linkRedirect="/"
      linkText="Back to Home"
      SVGComponent={
        <NotFound style={{ height: "200px", width: "auto", padding: 20 }} />
      }
    />
  );
};

export default NoMatchPage;
