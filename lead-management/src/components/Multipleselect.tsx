import React, { useState } from 'react';

type MultiSelectDropdownProps = {
  options: string[];
  placeholder: string;
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Toggle the dropdown open/close
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle item selection
  const handleSelect = (item: string) => {
    // Only add the item if it hasn't been selected already
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Handle removing a selected item
  const handleRemove = (item: string) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  return (
    <div className="relative w-full md:w-80">
      {/* Dropdown Trigger */}
      <div
        className="border border-gray-300 p-2 rounded cursor-pointer flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <span>{selectedItems.length ? `${selectedItems.length} selected` : placeholder}</span>
        {/* <span className="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</span> */}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto z-10">
          {options.map((option) => (
            <div
              key={option}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}

      {/* Selected Items Display */}
      <div className="flex flex-wrap gap-2 mt-3">
        {selectedItems.map((item) => (
          <div
            key={item}
            className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center"
          >
            <span>{item}</span>
            <button
              className="ml-2 focus:outline-none"
              onClick={() => handleRemove(item)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
