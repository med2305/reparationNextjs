"use client"
import { useState } from 'react';
import data from '@/data/stepper.json';

const Step3 = () => {
    const selectedCategory = localStorage.getItem('category') || null;
    const selectedMark = localStorage.getItem('mark') || null;
    const [selectedRange, setSelectedRange] = useState(() => localStorage.getItem('range') || null);
    console.log(selectedMark);
    
    const handleButtonClick = (range) => {
        setSelectedRange(range);
        localStorage.setItem('range', range);
    };

    return (
        <div className="flex flex-wrap justify-center gap-8">
  {data.category
    .find((category) => category.name === selectedCategory)
    ?.marks.find((mark) => mark.name === selectedMark)
    ?.ranges.map((range, index) => (
      <button
        key={index}
        onClick={() => handleButtonClick(range.name)}
        className={`card w-32 h-32 md:w-64 md:h-64 rounded-xl text-xl shadow-xl p-5 flex flex-row justify-center items-center border-2 ${selectedRange === range.name ? 'border-blue-500 hover:border-blue-500  text-blue-500 hover:text-blue-500' : 'border-gray-700 dark:hover:border-white text-gray-700 hover:text-black dark:hover:text-white'}  font-bold  transition-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300`}
      >
        <span>{range.name}</span>
      </button>
    ))}
</div>
    );
};

export default Step3;