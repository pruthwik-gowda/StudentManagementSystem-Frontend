import React, { useState } from 'react';

const EditStudentModal = ({ isOpen, onClose, student, onSave }) => {
    const [form, setForm] = useState({
        studentId: student?.studentId || '',
        name: student?.name || '',
        email: student?.email || '',
        phone: student?.phone || ''
    });

    // Update form when student changes
    React.useEffect(() => {
        setForm({
            studentId: student?.studentId || '',
            name: student?.name || '',
            email: student?.email || '',
            phone: student?.phone || ''
        });
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 backdrop-blur-sm bg-white/30" onClick={onClose} />
            <form
                onSubmit={handleSubmit}
                className="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-md z-10"
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                    type="button"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">Edit Student</h2>
                <div className="mb-4 flex flex-col gap-2">
                    {/* <label className="font-semibold">Student ID:</label>
                    <input
                        type="number"
                        name="studentId"
                        value={form.studentId}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
                        disabled
                    /> */}
                    <label className="font-semibold">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <label className="font-semibold">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <label className="font-semibold">Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Optional"
                    />
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditStudentModal;