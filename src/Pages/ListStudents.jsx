import React, { useState, useEffect, useCallback } from 'react'
import StudentCard from '../Components/StudentCard';
import Modal from '../Components/Modals/Modal';
import EditStudentModal from '../Components/Modals/EditStudentModal';
import StudentDetailModal from '../Components/Modals/StudentDetailModal';
import PageSelector from '../Components/PageSelector';

const ListStudents = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 21; 
    const [searchTerm, setSearchTerm] = useState("");

    const fetchStudents = useCallback( async (page = 0, size = pageSize, sortBy = "studentId", ascending = true, search = searchTerm) => {
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
        fetchStudents(currentPage, pageSize, "studentId", true, searchTerm);
    }, [currentPage, searchTerm, fetchStudents]);

    const handleViewDetailClick = (student) => {
        setSelectedStudentId(student.studentId);
        setDetailModalOpen(true);
    }

    const handleEditClick = (student) => {
        setSelectedStudent(student);
        setEditModalOpen(true);
    }

    const handleEditSave = async (updatedStudent) => {
    // Create FormData object for form submission
    const formDataObj = new FormData();
    formDataObj.append('name', updatedStudent.name.trim());
    formDataObj.append('email', updatedStudent.email.trim());

    // Only add phone if it has a value
    if (updatedStudent.phone && updatedStudent.phone.trim()) {
        formDataObj.append('phone', updatedStudent.phone.trim());
    }

    // Log FormData contents for debugging
    console.log("Update FormData contents:");
    for (let [key, value] of formDataObj.entries()) {
        console.log(`${key}: ${value}`);
    }

    try {
        const response = await fetch(`http://localhost:8080/api/students/${updatedStudent.studentId}`, {
            method: 'PUT',
            body: formDataObj // No Content-Type header when sending FormData
        });

        console.log("Update response status:", response.status);
        console.log("Update response content-type:", response.headers.get('content-type'));

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error updating student:", response.status, response.statusText);
            console.error("Error response body:", errorText);
            alert(`Error updating student: ${response.status} - ${errorText}`);
            return;
        }

        const data = await response.json();
        console.log("Update success:", response.status, data);
        alert("Student updated successfully!");

        await fetchStudents(currentPage); // Refresh the student list
    } catch (error) {
        console.error("Error updating student:", error);
        alert("Network error occurred while updating student: " + error.message);
    }

    setEditModalOpen(false);
    setSelectedStudent(null);
};

//     const handleEditSave = async (updatedStudent) => {
//     try {
//         const response = await fetch(
//             `http://localhost:8080/api/students/${updatedStudent.studentId}`,
//             {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     name: updatedStudent.name.trim(),
//                     email: updatedStudent.email.trim(),
//                     phone: updatedStudent.phone?.trim() || null
//                 })
//             }
//         );

//         if (!response.ok) {
//             const errorText = await response.text();
//             alert(`Error updating student: ${response.status} - ${errorText}`);
//             return;
//         }

//         const data = await response.json();
//         console.log("Update success:", response.status, data);
//         alert("Student updated successfully!");
//         await fetchStudents(currentPage); // refresh list
//     } catch (error) {
//         alert("Network error: " + error.message);
//     }
//     setEditModalOpen(false);
//     setSelectedStudent(null);
// };



    const handleEditCancel = () => {
        setEditModalOpen(false);
    };

    return (
        <div className='w-full flex flex-col items-center'>
            <div className="my-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Search by name, email, or phone"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded"
                />
                <button
                    onClick={() => fetchStudents(0, pageSize, "studentId", true, searchTerm)}
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
                                <li key={student.studentId}>
                                    <StudentCard
                                        name={student.name}
                                        email={student.email}
                                        handleEditClick={() => handleEditClick(student)}
                                        handleViewDetailsClick={() => handleViewDetailClick(student)}
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

            <EditStudentModal
                isOpen={editModalOpen}
                onClose={handleEditCancel}
                student={selectedStudent}
                onSave={handleEditSave}
            />

            <StudentDetailModal
                isOpen={detailModalOpen}
                onClose={() => {
                    setDetailModalOpen(false);
                    setSelectedStudentId(null);
                }}
                studentId={selectedStudentId}
            />
        </div>
    )
}

export default ListStudents

//add a details button and edit button on the student card to open two different modals