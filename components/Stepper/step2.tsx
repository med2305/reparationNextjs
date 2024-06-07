"use client"
import { useState } from 'react';
import data from '@/data/stepper.json';

const Step2 = () => {
    const selectedDevice = localStorage.getItem('category') || null;
    const [selectedMark, setSelectedMark] = useState(() => localStorage.getItem('mark') || null);
    console.log(selectedDevice);
    
    const handleButtonClick = (mark) => {
        setSelectedMark(mark);
        localStorage.setItem('mark', mark);
    };

    return (
        <div className="flex flex-wrap justify-center gap-8">
  {data.category
    .find((device) => device.name === selectedDevice)
    ?.marks.map((mark, index) => (
      <button
        key={index}
        onClick={() => handleButtonClick(mark.name)}
        className={`card w-32 h-32 md:w-64 md:h-64 rounded-xl text-xl shadow-xl p-5 flex flex-row justify-center items-center border-2 ${selectedMark === mark.name ? 'border-blue-500 hover:border-blue-500  text-blue-500 hover:text-blue-500' : 'border-gray-700 dark:hover:border-white text-gray-700 hover:text-black dark:hover:text-white'}  font-bold  transition-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300`}
      >
        <span>{mark.name}</span>
      </button>
    ))}
</div>
    );
};

export default Step2;