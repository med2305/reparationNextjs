"use client"
import Image from "next/image";

import { Metadata } from "next";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/loader";
import { addCommentToDemande, getDemande } from "@/api/axios/demande";
import { useParams } from 'next/navigation';
import techniqueFile from '@/data/technicalFile.json'
import Cookies from 'js-cookie';
import * as jose from 'jose'
// export const metadata: Metadata = {
//   title: "Blog Details Page | Free Next.js Template for Startup and SaaS",
//   description: "This is Blog Details Page for Startup Nextjs Template",
//   // other metadata
// };
interface Model {
  name: string;
  ficheTechnique: {
    display: string;
    resolution: string;
    camera: string;
    battery: string;
    storage: string;
  };
}

interface Range {
  name: string;
  models: Model[];
}

const getModelDetails = (modelName: string) => {

  for (let range of techniqueFile.ranges) {
    for (let model of range.models) {
      if (model.name === modelName) {
        return model.ficheTechnique;
      }
    }
  }
  return null;
};

const DemandeDetails = () => {
  const [demande, setDemande] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState('');
  const id = useParams();
  const modelDetails = getModelDetails(demande?.model);
  let userId: any;
  const token = Cookies.get('token');
  // let clientId : BigInteger;

  if (token) {
      const decodedToken = jose.decodeJwt(token)
      userId = decodedToken.userId
  }
  useEffect(() => {
    const fetchDemande = async () => {
      try {
        const response = await getDemande(id)
        setDemande(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching the demande:", error);
        setIsLoading(false);
      }
    };

    fetchDemande();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log(id);
      
      await addCommentToDemande(id.id, userId, comment);
      setComment('');
      const response = await getDemande(id)
      setDemande(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to post comment:', error);
      // Optionally, show an error message
    }
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <section className="overflow-hidden pb-[120px] pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h1 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  {demande.category} à réparer
                </h1>
                <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                </div>
                <div>
                  <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">Déscription :</h2>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    {demande.description}
                  </p>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    {/* <div className="relative aspect-[97/60] w-full sm:aspect-[97/97]"> */}
                    <Image
                      src={demande.photo}
                      alt="image"
                      width={1000}
                      height={500}
                      className=" object-cover object-center"
                    />
                    {/* </div> */}
                  </div>
                </div>
                <section className=" py-8 lg:py-16 antialiased">
                  <div className="mx-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({demande.comments.length})</h2>
                    </div>
                    <form className="mb-6" onSubmit={handleSubmit}>
                      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows={6}
                          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                          placeholder="Write a comment..." required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}></textarea>
                      </div>
                      <button type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center dark:text-white text-black bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 border dark:border-white border-black">
                        Envoyer commentaire
                      </button>
                    </form>
                    {demande.comments.map((comment) => (
                      <article key={comment._id} className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 m-5">
                        <footer className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                              <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="User" />
                              {comment.userId?.name ? comment.userId?.name : "Anonyme"}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <time title={new Date(comment.createdAt).toLocaleString()}>
                                {new Date(comment.createdAt).toLocaleString()}
                              </time>
                            </p>
                          </div>
                          {/* Dropdown button and content omitted for brevity */}
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">{comment.msg}</p>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
            <div className="w-full px-4 lg:w-4/12">
              <div className="shadow-three dark:bg-gray-dark mb-10 rounded-sm bg-white dark:shadow-none">
                <h3 className="border-b border-body-color border-opacity-10 px-8 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Caractéristiques
                </h3>
                <ul className="px-9 py-6 list-inside list-disc">
                  <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                    <strong>Mark :</strong> {demande.mark}
                  </li>
                  <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                    <strong>Range :</strong> {demande.range}
                  </li>
                  <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                    <strong>Model :</strong> {demande.model}
                  </li>
                  <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                    <strong>IMEI :</strong> {demande.imei}
                  </li>
                </ul>
              </div>
              <div className="shadow-three dark:bg-gray-dark mb-10 rounded-sm bg-white dark:shadow-none">
                <h3 className="border-b border-body-color border-opacity-10 px-8 py-4 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                  Fiche Technique
                </h3>
                <p className="p-8 mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  {modelDetails && Object.entries(modelDetails).map(([key, value]) => (
                    <ul key={key} className="px-1 py-2 list-inside list-disc">
                      <li> <strong>{key}:</strong> {value}</li>
                    </ul>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DemandeDetails;
