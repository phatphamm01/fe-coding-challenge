import styled from 'styled-components';
import tw from 'twin.macro';

import EditElement from './EditElement';
import Header from './Header';
import Ingredient from './Ingredient';
import Main from './Main';

const AdminContainer = styled.div`
  ${tw``}
`;

const HeaderBox = styled.div`
  ${tw`h-[60px]`}
`;

const MainBox = styled.div`
  ${tw`flex flex-grow-0 h-[calc(100vh - 60px)]`}
`;

const AdminPage: React.FC = () => {
  return (
    <AdminContainer className="no-selected">
      <HeaderBox>
        <Header />
      </HeaderBox>

      <MainBox>
        <Ingredient />
        <div tw="h-[inherit] w-full flex flex-col">
          <Main />
          <EditElement />
        </div>
      </MainBox>
    </AdminContainer>
  );
};

export default AdminPage;
