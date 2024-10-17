import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ label = 'Select', options = [], onSelect = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full sm:w-40">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="truncate">{label}</span>
        <svg className="-mr-1 ml-2 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full sm:w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <span className="truncate block">{option}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  onSelect: PropTypes.func
};

export default Dropdown;