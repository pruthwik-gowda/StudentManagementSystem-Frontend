import React from 'react'
import CreateStudent from '../Components/CreateStudent';
import UpdateStudent from '../Components/UpdateStudent';
import DeleteStudent from '../Components/DeleteStudent';

const Home = () => {

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: ''
    });

    const [deleteId, setDeleteId] = React.useState('');
    const [updateId, setUpdateId] = React.useState('');

    const handleFormDataChange = (identifier, value) => {   
        setFormData((prevData) => ({
            ...prevData,
            [identifier]: value
        }));
    };

    const handleUpdateFormDataChange = (identifier, value) => {   
        if(identifier === 'studentId') {
            setUpdateId(value);
        }else{
            setFormData((prevData) => ({
                ...prevData,
                [identifier]: value
            }));
        }
    };

    // Function to handle form submission as FormData
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting...", formData);
        
        // Create FormData object for form submission
        const formDataObj = new FormData();
        formDataObj.append('name', formData.name.trim());
        formDataObj.append('email', formData.email.trim());
        
        // Only add phone if it has a value
        if (formData.phone && formData.phone.trim()) {
            formDataObj.append('phone', formData.phone.trim());
        }
        
        // Log FormData contents
        console.log("FormData contents:");
        for (let [key, value] of formDataObj.entries()) {
            console.log(key + ': ' + value);
        }
        
        try {
            const response = await fetch("http://localhost:8080/api/students", {
                method: 'POST',
                body: formDataObj  // No Content-Type header needed for FormData
            });

            console.log("Response status:", response.status);
            console.log("Response content-type:", response.headers.get('content-type'));

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error creating student:", response.status, response.statusText);
                console.error("Error response body:", errorText);
                alert(`Error creating student: ${response.status} - ${errorText}`);
                return;
            }
            
            const data = await response.json();
            console.log("Success:", response.status, data);
            alert("Student created successfully!");
            setFormData({ name: '', email: '', phone: '' });

        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Network error occurred while creating student: " + error.message);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) {
            alert("Please enter a student ID");
            return;
        }
        
        console.log("Deleting student...");
        try {
            const response = await fetch(`http://localhost:8080/api/students/${deleteId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error deleting student:", response.status, response.statusText);
                console.error("Error response body:", errorText);
                alert(`Error deleting student: ${response.status} - ${errorText}`);
                return;
            }
            
            console.log(response.status, "Student deleted successfully");
            alert("Student deleted successfully!");
            setDeleteId('');
        } catch (error) {
            console.error("Error deleting student:", error);
            alert("Network error occurred while deleting student: " + error.message);
        }
    };


    // Function to handle update submission as JSON only
    const handleUpdateSubmit = async (e) => {
    try {
        e.preventDefault();
        console.log("Updating student with ID:", updateId);
        console.log("Update form data:", formData);
        const response = await fetch(
            `http://localhost:8080/api/students/${updateId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone?.trim() || null
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            alert(`Error updating student: ${response.status} - ${errorText}`);
            return;
        }

        const data = await response.json();
        console.log("Update success:", response.status, data);
        alert("Student updated successfully!");
    } catch (error) {
        alert("Network error: " + error.message);
    }
}

    return (
        <>
            <CreateStudent 
                formData={formData} 
                handleFormDataChange={handleFormDataChange} 
                handleSubmit={handleSubmit} 
            />

            <DeleteStudent 
                deleteId={deleteId} 
                setDeleteId={setDeleteId} 
                handleDelete={handleDelete} 
            />

            <UpdateStudent 
                formData={formData}  
                updateId={updateId} 
                handleUpdateSubmit={handleUpdateSubmit} 
                handleUpdateFormDataChange={handleUpdateFormDataChange} 
            />
        </>
    )
}

export default Home