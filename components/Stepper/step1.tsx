"use client"
import { useState } from 'react';
import data from '@/data/stepper.json';

const Step1 = () => {
    const [selectedDevice, setSelectedDevice] = useState(() => localStorage.getItem('category') || null);

    const handleButtonClick = (device) => {
        setSelectedDevice(device);
        localStorage.setItem('category', device);
    };

    return (
        <div className="flex flex-wrap justify-center gap-8">
            {data.category.map((device, index) => (
                <button
                    key={index}
                    onClick={() => handleButtonClick(device.name)}
                    className={`card w-32 h-32 md:w-64 md:h-64 rounded-xl text-xl shadow-xl p-5 flex flex-row justify-center items-center border-2 ${selectedDevice === device.name ? 'border-blue-500 hover:border-blue-500  text-blue-500 hover:text-blue-500' : 'border-gray-700 dark:hover:border-white text-gray-700 hover:text-black dark:hover:text-white'}  font-bold  transition-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300`}
                >
                    <span>{device.name}</span>
                </button>
            ))}
        </div>
    );
};

export default Step1;