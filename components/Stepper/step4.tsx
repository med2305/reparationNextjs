"use client"
import { useState } from 'react';
import data from '@/data/stepper.json';

const Step4 = () => {
    const selectedCategory = localStorage.getItem('category') || null;
    const selectedMark = localStorage.getItem('mark') || null;
    const selectedRange = localStorage.getItem('range') || null;
    const [selectedModel, setSelectedModel] = useState(() => localStorage.getItem('model') || null);

    console.log(selectedMark);

    const handleButtonClick = (model) => {
        setSelectedModel(model);
        localStorage.setItem('model', model);
    };

    return (
        <div className="flex flex-wrap justify-center gap-8">
            {data.category
                .find((category) => category.name === selectedCategory)
                ?.marks.find((mark) => mark.name === selectedMark)
                ?.ranges.find((range) => range.name === selectedRange)
                ?.models.map((model, index) => (
                    <button
                        key={index}
                        onClick={() => handleButtonClick(model)}
                        className={`card w-32 h-32 md:w-64 md:h-64 rounded-xl text-xl shadow-xl p-5 flex flex-row justify-center items-center border-2 ${selectedModel === model ? 'border-blue-500 hover:border-blue-500  text-blue-500 hover:text-blue-500' : 'border-gray-700 dark:hover:border-white text-gray-700 hover:text-black dark:hover:text-white'}  font-bold  transition-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300`}
                    >
                        <span>{model}</span>
                    </button>
                ))}
        </div>
    );
};

export default Step4;