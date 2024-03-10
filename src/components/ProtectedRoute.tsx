// ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../hooks/contextHooks';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUserContext();
    const location = useLocation();

    if (!user) {
      console.log('lokaatio', location);
      //  replace and state are used to redirect to origin when page is refreshed
      // state value to store in history state, which can then access on the destination route
      return <Navigate to="/" replace state={{from: location}} />;
      // return <Navigate to="/"/>
    }

    return children;
};

export default ProtectedRoute;
