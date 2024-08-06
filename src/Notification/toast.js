import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default styles

// To show notifications with custom styles
export const showToastMessage = (message, type) => {
  toast[type](message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000, // Auto-close the toast after 3 seconds
    hideProgressBar: false, // Show progress bar
    closeOnClick: true, // Close on click
    pauseOnHover: true, // Pause on hover
    draggable: true, // Allow drag and drop
    progress: undefined,
    theme: "colored", // Set theme to colored
    icon: type === 'success' ? '🎉' : type === 'error' ? '🚫' : 'ℹ️', // Add custom icons
  });
};
