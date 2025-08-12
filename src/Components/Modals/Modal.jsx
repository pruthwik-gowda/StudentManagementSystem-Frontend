import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blurred background */}
            <div
                className="absolute inset-0 backdrop-blur-sm bg-white/30"
                onClick={onClose}
            />
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-md z-10">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;