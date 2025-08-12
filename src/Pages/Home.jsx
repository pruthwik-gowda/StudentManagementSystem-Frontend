import React from 'react'
import CreateStudent from '../Components/CreateStudent';
import UpdateStudent from '../Components/UpdateStudent';
import DeleteStudent from '../Components/DeleteStudent';

const Home = () => {

    const [formData, setFormData] = React.useState({
        name: '',
        email: ''
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
        if(identifier === 'id') {
            setUpdateId(value);
        }else{
            setFormData((prevData) => ({
                ...prevData,
                [identifier]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting...", formData);
        try{
            const response = await fetch("http://localhost:8080/api/students", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            });

            if(!response.ok) {
                console.error("Error creating student:", response.statusText);
                return;
            }
            const data = await response.json();
            console.log(response.status, data);
            setFormData({ name: '', email: '' }); // Reset form after submission

        }catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    const handleDelete = async () => {
        console.log("Deleting student...");
        try{
            const response = await fetch(`http://localhost:8080/api/students/${deleteId}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok) {
                console.error("Error deleting student:", response.statusText);
                return;
            }
            console.log(response.status, "Student deleted successfully");
        }catch(error) {
                console.error("Error deleting student:", error);
        }
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        console.log("Updating student...", formData);
        try{
            const response = await fetch(`http://localhost:8080/api/students/${updateId}`, {
                method: 'PUT',      
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                console.error("Error updating student:", response.statusText);
                return;
            }    
            const data = await response.json();
            console.log(response.status, data);
            setFormData({ name: '', email: '' }); 
        } catch (error) {
            console.error("Error updating student:", error);    
        }  
    }

  return (
    <>
        <CreateStudent formData={formData} handleFormDataChange={handleFormDataChange} handleSubmit={handleSubmit} />

        <DeleteStudent deleteId={deleteId} setDeleteId={setDeleteId} handleDelete={handleDelete} />

        <UpdateStudent formData={formData}  updateId={updateId} handleUpdateSubmit={handleUpdateSubmit} handleUpdateFormDataChange={handleUpdateFormDataChange} />
    
    </>
  )
}

export default Home

//THINGS TO DO:
//-> add pagination
//-> add search functionality