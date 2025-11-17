import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const renderPage = (page: number, active = false) => {
    return (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm border transition
          ${
            active
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
      >
        {page}
      </button>
    );
  };

  const renderPages = () => {
    const pages: JSX.Element[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(renderPage(i, i === currentPage));
    }

    return pages;
  };

  return (
    <div className="border-t mt-6 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Previous */}
        <button
          disabled={currentPage === 1}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 
            text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          ‹
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-3">
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {renderPages()}

            <span className="w-10 h-10 flex items-center justify-center text-gray-400">
              ...
            </span>

            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-700">
              {totalPages}
            </div>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            {renderPages()}
          </div>
        </div>

        {/* Info */}
        <div className="hidden md:block text-sm text-gray-500">
          Showing page {currentPage} of {totalPages}
        </div>

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 
            text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          ›
        </button>
      </div>
    </div>
  );
}
