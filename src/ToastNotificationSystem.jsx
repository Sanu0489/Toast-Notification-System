import { useState, useEffect } from "react";

function Toast({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div
      style={{
        position: "relative",
        padding: "16px 36px 16px 16px",
        marginBottom: "10px",
        borderRadius: "8px",
        color: "white",
        background:
          toast.type === "success"
            ? "green"
            : toast.type === "error"
            ? "red"
            : "blue",
      }}
    >
      <button
        onClick={() => onClose(toast.id)}
        style={{
          position: "absolute",
          top: "6px",
          right: "8px",
          background: "transparent",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        ✕
      </button>

      <div>{toast.message}</div>
    </div>
  );
}

export default function ToastNotificationSystem() {
  const [toasts, setToasts] = useState([]);

  const showToast = (type, message) => {
    setToasts((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        message,
      },
    ]);
  };

  
  const closeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  

  return (
    <div>
      <h2>Toast Notification System</h2>

      <button onClick={() => showToast("success", "Success message!")}>
        Show Success
      </button>

      <button onClick={() => showToast("error", "Error message!")}>
        Show Error
      </button>

      <button onClick={() => showToast("info", "Info message!")}>
        Show Info
      </button>

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "280px",
        }}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={closeToast} />
        ))}
      </div>
    </div>
  );
}