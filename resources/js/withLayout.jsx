import React from 'react';
import { usePage } from '@inertiajs/react';
import Nav from './Components/Nav';
import Footer from './Components/Footer';

const withLayout = (WrappedComponent) => {
  return (props) => {
    const { url } = usePage(); // Correctly within Inertia context

    return (
      <>

        {(url.split("/dashboard")[0].length == url.length ) && <div className="mb-[4rem]"><Nav /></div>}
        <div>
          <WrappedComponent {...props} />
        </div>
        {(url.split("/dashboard")[0].length == url.length ) && <div className="mb-[4rem]"> <Footer /></div>}


      </>
    );
  };
};

export default withLayout;
