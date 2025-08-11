import React, { useState, useEffect } from 'react'
import StudentCard from './StudentCard';

const ListStudents = () => {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch students from API or any data source
        const fetchStudents = async () => {
            try{
                const response = await fetch ("http://localhost:8080/api/students");
                const data = await response.json(); 
                setStudents(data)
            }catch (error) {
                console.error("Error fetching students:", error);
            }
        }
        fetchStudents();
    }, []); 

    const handleCardClick = (student) => {
        console.log("Student clicked:", student);
    }

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
    </div>
  )
}

export default ListStudents