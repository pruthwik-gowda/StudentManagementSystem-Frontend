import React, { useState, useEffect, useCallback } from 'react';

const StudentDetailModal = ({ isOpen, onClose, studentId }) => {
    const [studentDetail, setStudentDetail] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchStudentDetail = useCallback( async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/students/${studentId}/details`);
            if (response.ok) {
                const data = await response.json();
                setStudentDetail(data);
            } else {
                console.error('Failed to fetch student details');
            }
        } catch (error) {
            console.error('Error fetching student details:', error);
        } finally {
            setLoading(false);
        }
    }, [studentId]);

        useEffect(() => {
        if (isOpen && studentId) {
            fetchStudentDetail();
        }
    }, [isOpen, studentId, fetchStudentDetail]);


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 backdrop-blur-sm bg-white/30" onClick={onClose} />
            <div className="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl z-10 max-h-96 overflow-y-auto">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : studentDetail ? (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-center">Student Details</h2>
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-600">{studentDetail.name}</h3>
                            <p className="text-gray-600">Email: {studentDetail.email}</p>
                            {studentDetail.phone && (
                                <p className="text-gray-600">Phone: {studentDetail.phone}</p>
                            )}
                            <p className="text-sm text-gray-500">
                                Joined: {new Date(studentDetail.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold mb-3 text-green-600">Enrolled Classes:</h4>
                            {studentDetail.classes && studentDetail.classes.length > 0 ? (
                                <div className="space-y-3">
                                    {studentDetail.classes.map((cls) => (
                                        <div key={cls.classId} className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-green-50">
                                            <h5 className="font-medium text-lg text-blue-700">{cls.topic}</h5>
                                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        Teacher: <span className="text-green-600">{cls.teacher.name}</span>
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Email: {cls.teacher.email}
                                                    </p>
                                                    {cls.teacher.specialization && (
                                                        <p className="text-sm text-gray-600">
                                                            Specialization: <span className="font-medium">{cls.teacher.specialization}</span>
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    {cls.startTime && (
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-medium">Start:</span> {new Date(cls.startTime).toLocaleString()}
                                                        </p>
                                                    )}
                                                    {cls.endTime && (
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-medium">End:</span> {new Date(cls.endTime).toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 text-6xl mb-4">📚</div>
                                    <p className="text-gray-600 text-lg">No classes enrolled yet</p>
                                    <p className="text-gray-500 text-sm">This student hasn't joined any classes</p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center text-red-600">Failed to load student details</div>
                )}
            </div>
        </div>
    );
};

export default StudentDetailModal;