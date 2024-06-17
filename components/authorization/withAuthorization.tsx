/* eslint-disable react/display-name */
import { useRouter } from 'next/navigation';
import React, { useEffect, PropsWithChildren, useState } from 'react';
import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';
import Loader from '../loader/loader';

const withAuthorization = (WrappedComponent, roles) => {

    return (props: PropsWithChildren<{}>) => {
        const [loading, setLoading] = useState(true);
        const router = useRouter();
        const token = Cookies.get('token'); // replace 'token' with your token's cookie name

        useEffect(() => {
            (async () => {
                try {
                    const decodedToken = decodeJwt(token);
                    const role = decodedToken.role;
                    console.log("role", role);

                    if (!role || !roles.includes(role)) {
                        router.push('/signin'); // redirect to login if user is not authenticated or doesn't have the necessary role
                    }
                    setLoading(false);
                } catch (error) {
                    router.push('/signin'); // redirect to login if token is invalid
                    setLoading(false);
                }
            })();
        }, [token, router]); // include router in the dependency array

        if (loading) {
            return <Loader />; // or your custom loading component
        }
        return <WrappedComponent {...props} />;
    };
};

export default withAuthorization;