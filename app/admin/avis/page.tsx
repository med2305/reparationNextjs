"use client"
import { Metadata } from "next";
import React, { useEffect, useState } from 'react';
import { FaTrash, FaInfo, FaCheck } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { approveAvis, disapproveAvis, getAvis } from "@/api/axios/avis";
import Cookies from 'js-cookie';
import * as jose from 'jose'
import Loader from "@/components/loader/loader";
import withAuthorization from "@/components/authorization/withAuthorization";

// export const metadata: Metadata = {
//   title: "Blog Page | Free Next.js Template for Startup and SaaS",
//   description: "This is Blog Page for Startup Nextjs Template",
//   // other metadata
// };

const Avis = () => {
  const [loading, setLoading] = useState(false);
  const [avis, setAvis] = useState([]);
  const router = useRouter();
  let userId: any;
  const token = Cookies.get('token');
  // let clientId : BigInteger;

  if (token) {
    const decodedToken = jose.decodeJwt(token)
    userId = decodedToken.userId
  }

  useEffect(() => {
    const fetchAviss = async () => {
      const data = await getAvis();
      console.log(data.avis);

      setAvis(data.avis);
    };
    fetchAviss();
  }, []);

  const handleApprove = async (id) => {
    try {
      setLoading(true);
      await approveAvis(id);
      const updatedAvis = await getAvis();
      setAvis(updatedAvis.avis);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisapprove = async (id) => {
    try {
      setLoading(true);
      await disapproveAvis(id);
      const updatedAvis = await getAvis();
      setAvis(updatedAvis.avis);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <section className="py-1 bg-blueGray-50 ">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-dark w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">Liste des Avis</h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Nom d&apos;utilisateur
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      avis
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
                  {Array.isArray(avis) && avis.length > 0 ? (
                    avis.map((avis) => (
                      <tr key={avis._id}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {avis.userName} {/* Replace with the actual property names */}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {avis.msg}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {avis.approved ?
                            "approuvé"
                            :
                            "non approuvé"
                          }
                        </td>
                          {avis.approved ?
                        <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <FaTrash className="cursor-pointer" onClick={() => handleDisapprove(avis._id)} />
                        </td>
                        :
                        <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <FaCheck className="cursor-pointer" onClick={() => handleApprove(avis._id)} />
                        </td>
}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center align-middle">
                        <p className="m-8">Il n&apos;y a pas d&apos;avis</p>
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

export default withAuthorization(Avis, 'admin'); 
