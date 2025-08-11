import React, { useState, useEffect } from 'react'
import StudentCard from './StudentCard';
import Modal from './Modal';
import EditStudentModal from './EditStudentModal';

const ListStudents = () => {

    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const fetchStudents = async () => {
            try{
                const response = await fetch ("http://localhost:8080/api/students");
                const data = await response.json(); 
                setStudents(data)
            }catch (error) {
                console.error("Error fetching students:", error);
            }
        }

    useEffect(() => {
        // Fetch students from API or any data source
        
        fetchStudents();
    }, []); 

    const handleCardClick = (student) => {
        setSelectedStudent(student);
    }

    const handleCloseModal = () => {
        setSelectedStudent(null);
    };

    const handleEdit = () => {
        setEditModalOpen(true);
    };

   const handleDelete = async () => {
    const studentToDelete = selectedStudent;
    setSelectedStudent(null); // Close the modal immediately

    if (!studentToDelete) return;

    try {
        const response = await fetch(`http://localhost:8080/api/students/${studentToDelete.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            await fetchStudents(); // Refresh the student list
        } else {
            alert("Failed to delete student.");
        }
    } catch (error) {
        console.error("Error deleting student:", error);
    }
};

    const handleEditSave = async (updatedStudent) => {
        // Example: update on backend
        try {
            const response = await fetch(`http://localhost:8080/api/students/${updatedStudent.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedStudent),
            });
            if (response.ok) {
                fetchStudents(); // Refresh the student list
            } else {
                alert("Failed to update student.");
            }
        } catch (error) {
            console.error("Error updating student:", error);
        }
        setEditModalOpen(false);
        setSelectedStudent(null);
    };

    const handleEditCancel = () => {
        setEditModalOpen(false);
    };

    return (
        <div className='w-full flex justify-center'>
            {
                students.length > 0 ? (
                    <ul className='flex flex-row flex-wrap gap-6 p-5 m-5 list-none'>
                        {students.map(student => (

                            <li key={student.id}>
                                <StudentCard 
                                    name={student.name} 
                                    email={student.email} 
                                    onClick={() => handleCardClick(student)}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No students found.</p>
                )
            }

            <Modal isOpen={!!selectedStudent && !editModalOpen} onClose={handleCloseModal}>
                {selectedStudent && (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-center">Student Details</h2>
                        <div className="mb-4 text-center">
                            <div className="text-lg font-semibold">{selectedStudent.name}</div>
                            <div className="text-gray-600">{selectedStudent.email}</div>
                        </div>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </>
                )}
            </Modal>

            <EditStudentModal
                isOpen={editModalOpen}
                onClose={handleEditCancel}
                student={selectedStudent}
                onSave={handleEditSave}
            />
        </div>
    )
}

export default ListStudents