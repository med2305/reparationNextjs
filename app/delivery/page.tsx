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
      const data = await getDemandes(["technicien affecté", "En cours de livraison"], null, null, null);
      setDemandes(data.data);
    };
    fetchDemandes();
  }, []);

  const handleDetails = (user) => {
    const Demandestring = encodeURIComponent(JSON.stringify(user));
    router.push(`/admin/demandesListe/${user._id}?user=${Demandestring}`);
    // router.push(`${user._id}`);    
  };

  const handleAcceptArrival = async (id) => {
    try {
      await updateDemande(id, { arrivalDeliveryId: userId });
      // Refresh the user list after a user is deleted
      const updatedDemandes = await getDemandes(["technicien affecté", "En cours de livraison"], null, null, null);
      setDemandes(updatedDemandes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptDepart = async (id) => {
    try {
      await updateDemande(id, { departDeliveryId: userId });
      // Refresh the user list after a user is deleted
      const updatedDemandes = await getDemandes(["technicien affecté", "En cours de livraison"], null, null, null);
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
                          En attente de livraison
                        </td>
                        <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <FaInfo className="cursor-pointer" onClick={() => handleDetails(demande)} />
                        </td>
                        <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {demande.arrivalDeliveryId ?
                          <FaCheck className="cursor-pointer" onClick={() => handleAcceptDepart(demande._id)} />
                          :
                          <FaCheck className="cursor-pointer" onClick={() => handleAcceptArrival(demande._id)} />
                          }
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
      </section>
    </>
  );
};

export default Demandes;
