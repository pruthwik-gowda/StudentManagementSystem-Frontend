import React from 'react';

const InfoCard = ({ name, email, handleViewDetailsClick, handleEditClick }) => (
    <div
        className="flex flex-col items-center w-76 h-35 p-6 shadow-lg rounded-xl cursor-pointer text-center font-sans hover:brightness-95 transition-all duration-300"
        style={{
            backgroundColor: '#FBF3D5',
            fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif"
        }}
    >
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-700">{email}</p>
        <div className="flex items-center gap-3 mt-2">
            <button
                className="px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-400 rounded-md hover:bg-blue-50 transition-colors"
                onClick={handleViewDetailsClick}
            >
                View Details
            </button>

            <button
                className="px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-400 rounded-md hover:bg-blue-50 transition-colors"
                onClick={handleEditClick}
            >
                Edit
            </button>
        </div>

    </div>
);

export default InfoCard;