import React, { useState, useEffect, useCallback } from 'react'
import InfoCard from '../Components/InfoCard';
import Modal from '../Components/Modals/Modal';
import EditTeacherModal from '../Components/Modals/EditTeacherModal';
import TeacherDetailModal from '../Components/Modals/TeacherDetailModal';
import PageSelector from '../Components/PageSelector';

const ListTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 21; 
    const [searchTerm, setSearchTerm] = useState("");

    const fetchTeachers = useCallback( async (page = 0, size = pageSize, sortBy = "teacherId", ascending = true, search = searchTerm) => {
        setIsLoading(true)
        try {
            const response = await fetch(
                `http://localhost:8080/api/teachers?page=${page}&size=${size}&sortBy=${sortBy}&ascending=${ascending}&search=${encodeURIComponent(search)}`
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setTeachers(data.content);
            setCurrentPage(data.number);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
        setIsLoading(false)
    },[searchTerm, pageSize]);

    useEffect(() => {
        fetchTeachers(currentPage, pageSize, "teacherId", true, searchTerm);
    }, [currentPage, searchTerm, fetchTeachers]);

    const handleViewDetailClick = (teacher) => {
        setSelectedTeacherId(teacher.teacherId);
        setDetailModalOpen(true);
    }

    const handleEditClick = (teacher) => {
        setSelectedTeacher(teacher);
        setEditModalOpen(true);
    }

//     const handleEditSave = async (updatedTeacher) => {
//     // Create FormData object for form submission
//     const formDataObj = new FormData();
//     formDataObj.append('name', updatedTeacher.name.trim());
//     formDataObj.append('email', updatedTeacher.email.trim());

//     // Only add phone if it has a value
//     if (updatedTeacher.phone && updatedTeacher.phone.trim()) {
//         formDataObj.append('phone', updatedTeacher.phone.trim());
//     }

//     // Log FormData contents for debugging
//     console.log("Update FormData contents:");
//     for (let [key, value] of formDataObj.entries()) {
//         console.log(`${key}: ${value}`);
//     }

//     try {
//         const response = await fetch(`http://localhost:8080/api/students/${updatedTeacher.studentId}`, {
//             method: 'PUT',
//             body: formDataObj // No Content-Type header when sending FormData
//         });

//         console.log("Update response status:", response.status);
//         console.log("Update response content-type:", response.headers.get('content-type'));

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error("Error updating student:", response.status, response.statusText);
//             console.error("Error response body:", errorText);
//             alert(`Error updating student: ${response.status} - ${errorText}`);
//             return;
//         }

//         const data = await response.json();
//         console.log("Update success:", response.status, data);
//         alert("Student updated successfully!");

//         await fetchStudents(currentPage); // Refresh the student list
//     } catch (error) {
//         console.error("Error updating student:", error);
//         alert("Network error occurred while updating student: " + error.message);
//     }

//     setEditModalOpen(false);
//     setSelectedStudent(null);
// };

    const handleEditSave = async (updatedTeacher) => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/teachers/${updatedTeacher.teacherId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: updatedTeacher.name.trim(),
                    email: updatedTeacher.email.trim(),
                    specialization: updatedTeacher.specialization?.trim() || null
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            alert(`Error updating teacher: ${response.status} - ${errorText}`);
            return;
        }

        const data = await response.json();
        console.log("Update success:", response.status, data);
        alert("Teacher updated successfully!");
        await fetchTeachers(currentPage); // refresh list
    } catch (error) {
        alert("Network error: " + error.message);
    }
    setEditModalOpen(false);
    setSelectedTeacher(null);
};



    const handleEditCancel = () => {
        setEditModalOpen(false);
    };

    return (
        <div className='w-full flex flex-col items-center'>
            <div className="my-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Search by name, email, or specialization"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded"
                />
                <button
                    onClick={() => fetchTeachers(0, pageSize, "teacherId", true, searchTerm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                teachers.length > 0 ? (
                    <>
                        <ul className='flex flex-row justify-center flex-wrap gap-6 p-5 m-5 list-none'>
                            {teachers.map(teacher => (
                                <li key={teacher.teacherId}>
                                    <InfoCard
                                        name={teacher.name}
                                        email={teacher.email}
                                        handleEditClick={() => handleEditClick(teacher)}
                                        handleViewDetailsClick={() => handleViewDetailClick(teacher)}
                                    />
                                </li>
                            ))}
                        </ul>
                        <PageSelector totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                    </>
                ) : (
                    <p>No teachers found.</p>
                )
            )}

            <EditTeacherModal
                isOpen={editModalOpen}
                onClose={handleEditCancel}
                teacher={selectedTeacher}
                onSave={handleEditSave}
            />

            <TeacherDetailModal
                isOpen={detailModalOpen}
                onClose={() => {
                    setDetailModalOpen(false);
                    setSelectedTeacherId(null);
                }}
                teacherId={selectedTeacherId}
            />
        </div>
    )
}

export default ListTeachers