import React, { useState, useEffect, useCallback } from 'react'
import StudentCard from '../Components/StudentCard';
import Modal from '../Components/Modals/Modal';
import EditStudentModal from '../Components/Modals/EditStudentModal';
import PageSelector from '../Components/PageSelector';

const ListStudents = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 21; 
    const [searchTerm, setSearchTerm] = useState("");


    const fetchStudents = useCallback( async (page = 0, size = pageSize, sortBy = "id", ascending = true, search = searchTerm) => {
        setIsLoading(true)
        try {
            const response = await fetch(
                `http://localhost:8080/api/students?page=${page}&size=${size}&sortBy=${sortBy}&ascending=${ascending}&search=${encodeURIComponent(search)}`
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setStudents(data.content);
            setCurrentPage(data.number);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
        setIsLoading(false)
    },[searchTerm, pageSize]);

    useEffect(() => {
        fetchStudents(currentPage, pageSize, "id", true, searchTerm);
    }, [currentPage, searchTerm, fetchStudents]);

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
                await fetchStudents(currentPage); // Refresh the student list
            } else {
                alert("Failed to delete student.");
            }
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    const handleEditSave = async (updatedStudent) => {
        try {
            const response = await fetch(`http://localhost:8080/api/students/${updatedStudent.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedStudent),
            });
            if (response.ok) {
                await fetchStudents(currentPage); // Refresh the student list
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
        <div className='w-full flex flex-col items-center'>
            <div className="my-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded"
                />
                <button
                    onClick={() => fetchStudents(0, pageSize, "id", true, searchTerm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                students.length > 0 ? (
                    <>
                        <ul className='flex flex-row justify-center flex-wrap gap-6 p-5 m-5 list-none'>
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
                        <PageSelector totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                    </>
                ) : (
                    <p>No students found.</p>
                )
            )}

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
