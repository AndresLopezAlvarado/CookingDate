import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
              <div className="absolute inset-0 bg-lime-700 opacity-75"></div>
            </div>
            
            <div className="relative bg-lime-900 rounded-md p-4">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
