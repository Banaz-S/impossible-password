import { forwardRef } from "react";
import "./PasswordInput.css";

const PasswordInput = forwardRef(function PasswordInput(
  { password, setPassword, disabled },
  ref
) {
  return (
    <div className="password-input-wrapper">
      <input
        ref={ref}
        type="text"
        className="password-input"
        placeholder="Type your password here..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
});

export default PasswordInput;
