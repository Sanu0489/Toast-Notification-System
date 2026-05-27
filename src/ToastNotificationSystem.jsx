import { useState } from "react";
import { Box, Button, Snackbar, Alert, Stack } from "@mui/material";

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
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="success"
          onClick={() => showToast("success", "Success message!")}
        >
          Show Success
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => showToast("error", "Error message!")}
        >
          Show Error
        </Button>

        <Button
          variant="contained"
          color="info"
          onClick={() => showToast("info", "Info message!")}
        >
          Show Info
        </Button>
      </Stack>

      {toasts.map((toast, index) => (
        <Snackbar
          key={toast.id}
          open={true}
          autoHideDuration={3000}
          onClose={() => closeToast(toast.id)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{
            width: "95%",
            left: "30px",
            right: "30px",
            bottom: `${24 + index * 70}px !important`,
          }}
        >
          <Alert
            severity={toast.type}
            variant="filled"
            onClose={() => closeToast(toast.id)}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
}