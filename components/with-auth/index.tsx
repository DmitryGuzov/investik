import { auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { NextComponentType } from 'next';
import React from 'react';
import SignIn from '@/pages/admin/sign-in';
import Loading from '../loading';
import PageLoading from '../page-loading';

const withAuth = (Component: NextComponentType) => {
  const Auth = (props: any) => {
    const [loading, setLoading] = React.useState(true);
    const [isAuth, setIsAuth] = React.useState(false);
    React.useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoading(false);
          setIsAuth(true);
          const uid = user.uid;
        } else {
          setLoading(false);
          setIsAuth(false);
        }
      });
    }, []);

    if (loading) {
      return <PageLoading />;
    }

    // If user is not logged in, return login component
    else if (!isAuth && !loading) {
      return <SignIn />;
    } else {
      // If user is logged in, return original component
      return <Component {...props} />;
    }
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
