import { SpinnerRoundFilled } from "spinners-react";

interface ISpinnerProps {
  // TODO : If any
  //...
}

const Spinner: React.FC<ISpinnerProps> = () => {
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
        <div style={{ fontWeight: 600 }}> Loading . . .</div>
      </div>
    </div>
  );
};

export default Spinner;
