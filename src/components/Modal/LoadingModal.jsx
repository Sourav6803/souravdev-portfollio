// components/LoadingModal.jsx
import { useEffect, useState } from 'react';
import { useLoading } from '../../context/LoadingContext';
// import { useLoading } from '../../contexts/LoadingContext';

const LoadingModal = () => {
  const { isLoading } = useLoading();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        <div className="fixed inset-0  opacity-50"></div>
      <div className="relative w-full max-w-md px-8 py-12">
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden p-[2px]">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 rounded-2xl animate-spin-slow"></div>
          <div className="absolute inset-[2px] bg-black opacity-80 rounded-xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo or icon animation */}
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-pink-500 animate-spin-reverse"></div>
            <div className="absolute inset-4 rounded-full border-4 border-transparent border-l-amber-400 animate-spin"></div>
            <div className="absolute inset-6 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-900 to-black">
              <svg
                className="w-8 h-8 text-white animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>

          {/* Text with typing animation */}
          <h2 className="text-2xl font-bold text-white mb-2">
            <span className="inline-block">
              Loading
              <span className="animate-typing">...</span>
            </span>
          </h2>
          <p className="text-gray-400 mb-6">Crafting digital excellence</p>

          {/* Progress bar */}
          {/* <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-400">{progress}%</span> */}
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;