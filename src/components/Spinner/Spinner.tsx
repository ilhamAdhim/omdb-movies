import { SpinnerRoundFilled } from "spinners-react";

interface ISpinnerProps {
  // TODO : If any
  text?: string;
}

const Spinner: React.FC<ISpinnerProps> = ({ text }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "1em",
      }}
    >
      <div style={{ margin: "auto" }}>
        <SpinnerRoundFilled color="#453DD8" />
        <div style={{ fontWeight: 600 }}> {text || "Loading..."} </div>
      </div>
    </div>
  );
};

export default Spinner;
