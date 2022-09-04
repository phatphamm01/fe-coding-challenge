import styled from 'styled-components';
import tw from 'twin.macro';

import EditElement from './EditElement';
import Header from './Header';
import Ingredient from './Ingredient';
import Main from './Main';

const AdminContainer = styled.div`
  ${tw`h-screen w-screen`}
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
`;

const AdminPage: React.FC = () => {
  return (
    <AdminContainer>
      <div className="h-full flex flex-col">
        <Header />
        <div className="flex flex-1 w-full">
          <Ingredient />
          <div className="h-full w-full flex flex-col">
            <Main />
            <EditElement />
          </div>
        </div>
      </div>
    </AdminContainer>
  );
};

export default AdminPage;
