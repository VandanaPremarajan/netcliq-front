import { Outlet } from 'react-router-dom';
import Header from './browse/Header'; 

const SubscriberLayout = ({ setIsAuthenticated }) => {
  return (
    <>
      <Header setIsAuthenticated={setIsAuthenticated} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SubscriberLayout;
