import { useNavigate } from "react-router-dom";

import fingerprintimg from "../../../assets/fingerprint.png";
import ReusableHeader from "../../../component/reusable/reusableheader/ReusableHeader";

import "./biometric.css";

export default function BiometricScreen() {
  const navigate = useNavigate();

  return (
    <div className="biometric-page">
      <ReusableHeader />

      <div className="biometric-content m-4 p-5">
        <h1 className="mt-4">Biometrics Capture</h1>
        <p>
          Place thumb finger directly on the finger print icon below, rotate
          finger slowly until it reads 100%
        </p>

        <div className="d-flex flex-column align-items-center finger-print mt-4">
          <img src={fingerprintimg} alt="" />
          <span>21 %</span>
        </div>

        <button
          onClick={() => {
            navigate("/employee-list");
          }}
          className="btn biometric-btn mt-4"
        >
          Done
        </button>
      </div>
    </div>
  );
}
