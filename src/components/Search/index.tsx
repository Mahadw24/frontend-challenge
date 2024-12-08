import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchInputProps {
  value: string;
  onDebouncedChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onDebouncedChange,
}) => {
  const [localValue, setLocalValue] = useState(value); 
  const debouncedValue = useDebounce(localValue, 500); 

  useEffect(() => {
    onDebouncedChange(debouncedValue); 
  }, [debouncedValue, onDebouncedChange]);

  return (
    <input
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)} 
      placeholder="Search tasks"
      className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    />
  );
};

export default SearchInput;
