import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const PageWrapper = ({ children, background = false, footer = false, navbar = false }) => {
  return (
    <>
      {navbar && <Navbar />}
      <div className={`${background && 'gradientBackground'} min-h-screen animate-gradient flex py-3 px-4 tablet:px-40 wide:px-96 h-auto ${navbar && 'mt-24'}`}>
        {children}
      </div>
      {footer && <Footer />}
    </>

  )
};

export default PageWrapper;