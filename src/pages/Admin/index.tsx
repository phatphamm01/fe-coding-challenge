import AdminPage from '@/containers/Admin';

import DraggingProvider from '@/provider/DraggingProvider';
import HandlerProvider from '@/provider/HandlerProvider';

const Admin: React.FC = () => {
  return (
    <DraggingProvider>
      <HandlerProvider>
        <AdminPage />
      </HandlerProvider>
    </DraggingProvider>
  );
};

export default Admin;
