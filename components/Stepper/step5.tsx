"use client"
import React, { useRef, useState } from 'react';
import { createDemande } from "@/api/axios/demande";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import * as jose from 'jose'

const Step5 = () => {
    const router = useRouter();
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState(null);
    const [imei, setImei] = useState(null);
    const [description, setDescription] = useState(null);
    const [photo, setPhoto] = useState(null);
    // const [userId, setUserId] = useState(null);
    let userId: any;
    const token = Cookies.get('token');
    // let clientId : BigInteger;

    if (token) {
        const decodedToken = jose.decodeJwt(token)
        userId = decodedToken.userId
    }
    const handleButtonClick = (event) => {
        event.preventDefault();
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        setFileName(event.target.files[0].name);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPhoto(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = {
                imei: imei,
                photo: photo,
                description: description,
                category: localStorage.getItem('category'),
                mark: localStorage.getItem('mark'),
                range: localStorage.getItem('range'),
                model: localStorage.getItem('model'),
                clientId: userId
            }
            const response = await createDemande(data).then(
                () => {
                    localStorage.removeItem('category');
                    localStorage.removeItem('mark');
                    localStorage.removeItem('range');
                    localStorage.removeItem('model');
                }
            ).finally(
                () => {
                    router.push(`/stepper`);
                }
            )

            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section id="contact" className="overflow-hidden ">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div
                            className="wow fadeInUp shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                            data-wow-delay=".15s"
                        >
                            <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                                Décrivez Votre Problème
                            </h2>
                            <p className="mb-12 text-base font-medium text-body-color">
                                Nous vous envoyons un email lorsque votre demande sera examiner
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="-mx-4 flex flex-wrap">
                                    <div className="w-full px-4 md:w-1/2">
                                        <div className="mb-8">
                                            <label
                                                htmlFor="imei"
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                            >
                                                IMEI
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Entrer votre appareil imei"
                                                onChange={(e) => setImei(e.target.value)}
                                                className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-4 md:w-1/2">
                                        <div className="mb-8">
                                            <label
                                                htmlFor="photo-upload"
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                            >
                                                Photo
                                            </label>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                            <button
                                                onClick={handleButtonClick}
                                                className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                            >
                                                {fileName ? <div> {fileName} </div> : 'Ajouter une photo'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full px-4">
                                        <div className="mb-8">
                                            <label
                                                htmlFor="description"
                                                className="mb-3 block text-sm font-medium text-dark dark:text-white"
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                rows={5}
                                                placeholder="Entrer votre description"
                                                onChange={(e) => setDescription(e.target.value)}
                                                className="border-stroke dark:text-body-color-dark dark:shadow-two w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="w-full px-4">
                                        <button className="shadow-submit dark:shadow-submit-dark rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                                            ENVOYER
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Step5;