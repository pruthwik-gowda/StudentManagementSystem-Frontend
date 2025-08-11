import React from 'react'

const CreateStudent = () => {

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
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg space-y-8 m-5">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(event) => handleFormDataChange("name", event.target.value)}
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label htmlFor="email" className="font-semibold">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(event) => handleFormDataChange("email", event.target.value)}
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
                Create
            </button>
        </form>
    </div>

    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg space-y-8 m-5">
        <h2 className="text-2xl font-bold mb-4 text-center">Delete Student</h2>
        <div className="flex gap-2 items-center">
            <input
                type="number"
                value={deleteId}
                onChange={(e) => setDeleteId(Number(e.target.value))}
                placeholder="Student ID"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition cursor-pointer"
            >
                Delete
            </button>
        </div>
    </div>

    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg space-y-8 m-5">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Student</h2>
        <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
                <input
                    type="number"
                    value={updateId}
                    onChange={(e) => setUpdateId(Number(e.target.value))}
                    placeholder="Student ID"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <label htmlFor="name" className="font-semibold">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(event) => handleFormDataChange("name", event.target.value)}
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <label htmlFor="email" className="font-semibold">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(event) => handleFormDataChange("email", event.target.value)}
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded-md font-semibold hover:bg-yellow-600 transition cursor-pointer"
            >
                Edit
            </button>
        </form>
    </div>
    </>
  )
}

export default CreateStudent

//THINGS TO DO:
//->make the changes make by adding, deleting, updating students in this component change the state of students in ListStudents.jsx
//->create different components for create, delete, update students 