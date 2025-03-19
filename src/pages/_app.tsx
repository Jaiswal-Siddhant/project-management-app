import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Bounce, ToastContainer, } from 'react-toastify';
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { FullPageLoaderComponent } from "~/Components/FullpageLoader/FullpageLoader";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <FullPageLoaderComponent />
      <div className={`${GeistSans.className} global-container`}>
        <Component {...pageProps} />
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
