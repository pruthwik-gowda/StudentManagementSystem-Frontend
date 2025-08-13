import React from 'react'

const CreateStudent = ({ formData, handleFormDataChange, handleSubmit }) => {

    return (
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
                    <label htmlFor="phone" className="font-semibold">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(event) => handleFormDataChange("phone", event.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Optional"
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
    )
}

export default CreateStudent