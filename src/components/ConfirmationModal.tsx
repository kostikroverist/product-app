import React from "react";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Confirmation</h3>
      <p className="text-slate-300 mb-6">{message}</p>
      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
