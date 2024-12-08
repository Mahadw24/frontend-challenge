import React from 'react';

interface FilterControlsProps {
  filterValue: 'all' | 'completed' | 'incomplete';
  onFilterChange: (value: 'all' | 'completed' | 'incomplete') => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  filterValue,
  onFilterChange,
}) => {
  return (
    <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <label className="text-sm font-medium text-gray-600">Filter:</label>
      <select
        value={filterValue}
        onChange={(e) =>
          onFilterChange(e.target.value as 'all' | 'completed' | 'incomplete')
        }
        className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
};

export default FilterControls;
