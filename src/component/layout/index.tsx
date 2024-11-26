import { Dropdown, Layout, Menu, Row } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { HomeOutlined, FolderOutlined, ShareAltOutlined, DeleteOutlined } from '@ant-design/icons';
import Logo from '/logo.png'

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const menuUser = (
    <Menu>
      <Menu.Item className='mx-5' key="1">
        <Row>
            <DeleteOutlined />
            <Row className='ml-3'>Logout</Row>
        </Row>
      </Menu.Item>
    </Menu>
  );
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={200}
        className='bg-[#f1f6ff]'
      >
        <Row className='justify-center'>
          <img src={Logo} alt="logo" className='w-[90px] py-[5px]'/>
        </Row>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          className='mt-10 bg-[#f1f6ff] !border-e-0'
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">ホームページ</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FolderOutlined />}>
            <Link to="/my-file">マイドライブ</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ShareAltOutlined />}>
            <Link to="/share-file">共有アイテム</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<DeleteOutlined />}>
            <Link to="/delete-file">ゴミ箱</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="flex bg-[#f1f6ff] justify-between items-center pl-[20px] h-[70px]">
          <input placeholder='ファイル名またはフォルダ名で検索してください。' className='border py-1 px-5 h-[40px] w-[400px] rounded-[30px]'/>
          <Dropdown overlay={menuUser} trigger={['click']}>
            <Row className='cursor-pointer' align="middle">
              User01
            </Row>
          </Dropdown>
        </Header>
        <Content>
          <Outlet  />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;