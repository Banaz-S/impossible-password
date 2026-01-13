import "./ExitConfirmModal.css";

function ExitConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="exit-modal-overlay">
      <div className="exit-modal">
        <h2>Exit Game?</h2>
        <p>Your progress will be lost.</p>

        <div className="exit-actions">
          <button className="continue-btn" onClick={onCancel}>
            Continue
          </button>
          <button className="exit-btn" onClick={onConfirm}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExitConfirmModal;
