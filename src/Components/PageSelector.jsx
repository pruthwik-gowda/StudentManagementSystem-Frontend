import React from 'react'

const PageSelector = ( {currentPage, totalPages,setCurrentPage}) => {
    const maxVisiblePages = 5;
        const pages = [];

        let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = startPage + maxVisiblePages - 1;

        if (endPage >= totalPages) {
            endPage = totalPages - 1;
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
        }

        // Prev button
        pages.push(
            <button
                key="prev"
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
            >
                Prev
            </button>
        );

        // First page + "..."
        if (startPage > 0) {
            pages.push(
                <button
                    key={0}
                    className={`px-3 py-1 rounded ${currentPage === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => setCurrentPage(0)}
                >
                    1
                </button>
            );
            if (startPage > 1) {
                pages.push(<span key="start-ellipsis" className="px-2">...</span>);
            }
        }

        // Visible middle pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 rounded ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => setCurrentPage(i)}
                >
                    {i + 1}
                </button>
            );
        }

        // Last page + "..."
        if (endPage < totalPages - 1) {
            if (endPage < totalPages - 2) {
                pages.push(<span key="end-ellipsis" className="px-2">...</span>);
            }
            pages.push(
                <button
                    key={totalPages - 1}
                    className={`px-3 py-1 rounded ${currentPage === totalPages - 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => setCurrentPage(totalPages - 1)}
                >
                    {totalPages}
                </button>
            );
        }

        // Next button
        pages.push(
            <button
                key="next"
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                disabled={currentPage === totalPages - 1}
            >
                Next
            </button>
        );

        return <div className="flex justify-center gap-1 my-4 flex-wrap">{pages}</div>;
}

export default PageSelector