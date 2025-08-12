import React from 'react'

const DeleteStudent = ( {deleteId, setDeleteId, handleDelete} ) => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg space-y-8 m-5">
        <h2 className="text-2xl font-bold mb-4 text-center">Delete Student</h2>
        <div className="flex gap-2 items-center">
            <input
                type="number"
                value={deleteId}
                onChange={(e) => {
                        const value = e.target.value;
                        setDeleteId(value === "" ? "" : Number(value));
                    }
                }
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

  )
}

export default DeleteStudent