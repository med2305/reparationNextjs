"use client"
import { useState } from 'react';
import Step1 from '@/components/Stepper/step1';
import Step2 from '@/components/Stepper/step2';
import Step3 from '@/components/Stepper/step3';
import Step4 from '@/components/Stepper/step4';
import Step5 from '@/components/Stepper/step5';
import withAuthorization from '@/components/authorization/withAuthorization';


function StepperPage() {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goToStep = (step) => {
        if (step < currentStep) {
            setCurrentStep(step);
        }
    };

    let StepComponent;
    switch (currentStep) {
        case 1:
            StepComponent = Step1;
            break;
        case 2:
            StepComponent = Step2;
            break;
        case 3:
            StepComponent = Step3;
            break;
        case 4:
            StepComponent = Step4;
            break;
        case 5:
            StepComponent = Step5;
            break;
        default:
            StepComponent = Step1;
    }

    return (
        <div className="flex flex-col items-center w-full  md:pb-20 lg:pb-28 pt-[180px]  text-sm font-medium text-center text-gray-500  border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base  dark:border-gray-700  sm:space-x-4 rtl:space-x-reverse">
            <ol className='flex items-center mb-16 space-x-4 md:space-x-8 lg:space-x-12'>
                {[...Array(5)].map((_, i) => (
                    <li key={i} className={`flex items-center cursor-pointer ${currentStep === i + 1 ? 'text-blue-600 dark:text-blue-500' : ''}`} onClick={() => goToStep(i + 1)}>
                        <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${currentStep === i + 1 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'} rounded-full shrink-0`}>
                            {i + 1}
                        </span>
                        Step {i + 1}
                    </li>
                ))}
            </ol>
            <StepComponent />
            {StepComponent !== Step5 && (
                <button onClick={nextStep} className="mt-8 px-6 py-2 text-white bg-blue-600 rounded">Next</button>
            )}
        </div>
    );
}

export default withAuthorization(StepperPage, 'client'); 
