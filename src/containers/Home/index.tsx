import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

import { IChildrenProp } from '@/types/common';

import CancelIcon from '@/icons/Cancel';
import EditIcon from '@/icons/Edit';
import EyeIcon from '@/icons/Eye';

import { useGetAllWebPage } from '@/hooks/api/webPage';

import fetchWebPage from '@/services/webPage';

const HomePageContainer = styled.div`
  ${tw`flex justify-center mt-20`}
`;

const HomeBox = styled.div`
  ${tw`w-[500px] h-[600px] flex flex-col gap-4 px-4 py-4`}
`;

const Title = styled.div`
  ${tw`text-2xl font-bold text-center`}
`;

const ActionBox = styled.div`
  ${tw`flex justify-end`}
`;
const Action = styled.button`
  ${tw`border rounded-sm px-4 py-2`}
`;

const ListBox = styled.div`
  ${tw`flex-shrink shadow-lg rounded-lg h-full w-full py-4`}
`;

const List = styled.ul`
  ${tw`list-decimal`}
`;

const Item = styled.li`
  ${tw`flex justify-between px-4 py-2`}
`;

interface IHomePage {}

const HomePage: React.FC<IChildrenProp & IHomePage> = () => {
  const { data: allWebPage, fetchData, loading } = useGetAllWebPage();

  const invokeCreateWebPage = async () => {
    await fetchWebPage.create({ json: '' });
    fetchData();
  };

  const invokeDeleteWebPage = async (id: string) => {
    await fetchWebPage.delete({ _id: id });
    fetchData();
  };

  const render = {
    loading: (
      <div className="h-full flex flex-col items-center justify-center">
        Loading...
      </div>
    ),
    notFound: (
      <div className="h-full flex flex-col gap-3 items-center justify-center pb-20">
        <p className="text-lg font-medium">Chưa có trang nào cả</p>
        <button onClick={invokeCreateWebPage}>Thêm trang mới</button>
      </div>
    ),
    main: allWebPage?.map((value, index) => (
      <Item
        key={index}
        style={{ background: index % 2 ? '#ececec' : '#ffdddd' }}
      >
        <span>{index + 1}</span>
        <p>{value._id}</p>
        <div className="flex items-center gap-2">
          <button>
            <NavLink to={`/consumer/${value._id}`}>
              <EyeIcon />
            </NavLink>
          </button>
          <button>
            <NavLink to={`/admin/${value._id}`}>
              <EditIcon />
            </NavLink>
          </button>
          <button onClick={() => invokeDeleteWebPage(value._id)}>
            <CancelIcon />
          </button>
        </div>
      </Item>
    ))
  };

  return (
    <HomePageContainer>
      <HomeBox>
        <Title>Danh sách web page</Title>
        <ActionBox>
          <Action onClick={invokeCreateWebPage}>Thêm</Action>
        </ActionBox>
        <ListBox>
          <List>
            {
              render[
                loading
                  ? 'loading'
                  : allWebPage.length === 0
                  ? 'notFound'
                  : 'main'
              ]
            }
          </List>
        </ListBox>
      </HomeBox>
    </HomePageContainer>
  );
};

export default HomePage;
