import React from 'react';

const StudentCard = ({ name, email, onClick }) => (
    <div
        className="w-76 h-32 p-6 shadow-lg rounded-xl cursor-pointer text-center font-sans hover:brightness-95 transition-all duration-300"
        onClick={onClick}
        style={{
            backgroundColor: '#FBF3D5',
            fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif"
        }}
    >
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-700">{email}</p>
    </div>
);

export default StudentCard;