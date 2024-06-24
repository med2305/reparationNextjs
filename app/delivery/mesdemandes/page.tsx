"use client"
import { Metadata } from "next";
import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaInfo, FaCheck } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { deleteDemande, getDemandes, updateDemande } from "@/api/axios/demande";
import Cookies from 'js-cookie';
import * as jose from 'jose'

// export const metadata: Metadata = {
//   title: "Blog Page | Free Next.js Template for Startup and SaaS",
//   description: "This is Blog Page for Startup Nextjs Template",
//   // other metadata
// };

const Demandes = () => {
  const [demandes, setDemandes] = useState([]);
  const router = useRouter();
  let userId: any;
  const token = Cookies.get('token');
  // let clientId : BigInteger;

  if (token) {
    const decodedToken = jose.decodeJwt(token)
    userId = decodedToken.userId
  }

  useEffect(() => {
    const fetchDemandes = async () => {
      const data = await getDemandes(["En attente de réception", "En cours de livraison"], null, userId, null);
      setDemandes(data.data);
    };
    fetchDemandes();
  }, []);

  const handleDetails = (id) => {
    router.push(`/demande/${id}`);
  };

  const handleAcceptArrival = async (id) => {
    try {
      await updateDemande(id, { status: "En attente de réparation" });
      // Refresh the user list after a user is deleted
      const updatedDemandes = await getDemandes(["En attente de réception", "En cours de livraison"], null, userId, null);
      setDemandes(updatedDemandes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptDepart = async (id) => {
    try {
      await updateDemande(id, { status: "Terminé" });
      // Refresh the user list after a user is deleted
      const updatedDemandes = await getDemandes(["En attente de réception", "En cours de livraison"], null, userId, null);
      setDemandes(updatedDemandes.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="py-1 bg-blueGray-50 ">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-dark w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">Liste des Demandes</h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      category
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      mark
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      source
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      destination
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Status
                    </th>
                    <th className="px-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    </th>
                    <th className="px-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(demandes) && demandes.length > 0 ? (
                    demandes.map((demande) => (
                      <tr key={demande._id}>
                       <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {demande.category} {/* Replace with the actual property names */}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {demande.mark}
                        </td>
                        {demande.status === "technicien affecté" ?
                          <>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {demande.clientId?.adress}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {demande.technicianId?.adress}
                            </td>
                          </> :
                          <>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {demande.technicianId?.adress}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {demande.clientId?.adress}
                            </td>
                          </>
                        }
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {demande.status}
                        </td>
                        {/* <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <FaInfo className="cursor-pointer" onClick={() => handleDetails(demande._id)} />
                        </td> */}
                        <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <FaCheck className="cursor-pointer" onClick={() => demande.status === 'En attente de réception' ? handleAcceptArrival(demande._id) : handleAcceptDepart(demande._id)} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center align-middle">
                        <p className="m-8">Il n&apos;y a pas de demandes</p>
                      </td>
                    </tr>)}
                </tbody>

              </table>
            </div>
          </div>
        </div>
        <footer className="relative pt-8 pb-6 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  {/* Made with <a href="https://www.creative-tim.com/product/notus-js" rel="noreferrer" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank" rel="noreferrer"> Creative Tim</a>. */}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default Demandes;
