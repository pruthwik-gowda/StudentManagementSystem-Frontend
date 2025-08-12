import React from 'react'

const UpdateStudent = ( { formData, updateId, handleUpdateSubmit, handleUpdateFormDataChange }) => {

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg space-y-8 m-5">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Student</h2>
        <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
                <input
                    type="number"
                    value={updateId}
                    onChange={(e) => {
                            const value = e.target.value;
                            handleUpdateFormDataChange("id",value === "" ? "" : Number(value));
                        }
                    }
                    placeholder="Student ID"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <label htmlFor="name" className="font-semibold">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(event) => handleUpdateFormDataChange("name", event.target.value)}
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <label htmlFor="email" className="font-semibold">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(event) => handleUpdateFormDataChange("email", event.target.value)}
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
  )
}

export default UpdateStudent