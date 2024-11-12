import React from 'react';
const Loading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <div className="w-32 h-32 border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loading;
