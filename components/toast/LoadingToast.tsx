'use client'
import React, {useState, useEffect} from "react";
import { Toast, ToastAction, ToastDescription, ToastTitle } from '@/components/ui/toast';

function LoadingToast() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an async operation like fetching data
    setTimeout(() => {
      setIsLoading(false); // Stop loading after 3 seconds
    }, 3000);
  }, []);

  return (
    <Toast open={isLoading}>
      <ToastTitle>Loading...</ToastTitle>
      <ToastDescription>
        <div className="flex items-center">
          {/* Loading spinner can go here */}
          <span className="animate-spin mr-2">🔄</span> Fetching data...
        </div>
      </ToastDescription>
      <ToastAction altText="Close">Cancel</ToastAction>
    </Toast>
  );
}

export default LoadingToast;
