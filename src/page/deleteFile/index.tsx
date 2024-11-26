import Folder from '../../assets/folder.jpg'
import File from '../../assets/Capture.jpg'
import { useEffect, useState } from 'react';
import { Col, Dropdown, Menu, Row } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, DownOutlined, EditOutlined, MoreOutlined, ShareAltOutlined, UndoOutlined, UpOutlined } from '@ant-design/icons';

const DeleteFile = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [currentIndexFolder, setCurrentIndexFolder] = useState();
  const [listFolder, setListFolder] = useState([
    {name: "Folder 1"},
    {name: "Folder 1"},
    {name: "Folder 1"},
    {name: "Folder 1"},
    {name: "Folder 1"},
    {name: "Folder 1"},
    {name: "Folder 1"},
  ]);
  const [listfile, setListFile] = useState();
  const [softCondition, setSoftCondition] = useState<any>({name: "name", order: "desc"});

  // Hàm xử lý khi click chuột phải
  const handleContextMenu = (e: any, index?: any) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setVisible(true);
    setCurrentIndexFolder(index);
  };

  // Tạo menu khi click chuột phải
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Row>
          <DeleteOutlined />
          <Row className='ml-3'>削除</Row>
        </Row></Menu.Item>
      <Menu.Item key="3">
        <Row>
          <UndoOutlined />
          <Row className='ml-3'>復元</Row>
        </Row>
      </Menu.Item>
    </Menu>
  );

  const MenuOrder = ({ name }: { name: string }) => {
    const handleOrder = (order: string) => {
        setSoftCondition((prev: any) => ({
            ...prev,
            name: name,
            order: order,
        }));
    }

    return (
      <Menu className='w-[200px]'>
        <Menu.Item key="1">
          <Row className='ml-1' onClick={() => handleOrder("desc")}>A to Z</Row>
        </Menu.Item>
        <Menu.Item key="2">
          <Row className='ml-1' onClick={() => handleOrder("asc")}>Z to A</Row>
        </Menu.Item>
      </Menu>
    );
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item?: any) => {
    const ghostImage = document.createElement("img");
    ghostImage.src = Folder;
    ghostImage.width = 40;

    document.body.appendChild(ghostImage);
  
    e.dataTransfer.setDragImage(ghostImage, 0, 0);

    setTimeout(() => {
      document.body.removeChild(ghostImage);
    }, 0);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  }

  const handleClickOutside = () => {
    if (visible) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [visible]);

  return (
    <div className='flex w-full h-screen px-5 bg-[#f1f6ff]'>
      <div className='block w-full bg-[#fff] rounded-[10px] p-5'>
        <div className='text-[30px] ml-[5px]'>ゴミ箱</div>
        <div className='px-5 mt-10'>
          <Row className="flex border-b border-b-[#cccccc] py-2 px-1">
              <Col md={10}>
                <Dropdown overlay={<MenuOrder name={"name"} />} trigger={['click']}>
                    <Row className='cursor-pointer px-1 hover:bg-[#f2f2f2] hover:rounded-[5px]'>
                        <Row className="text-lg cursor-pointer">名前</Row>
                        {softCondition.name === 'name' && softCondition.order === 'asc' && <ArrowUpOutlined className='ml-2' />}
                        {softCondition.name === 'name' && softCondition.order === 'desc' && <ArrowDownOutlined className='ml-2' />}
                        <DownOutlined className='ml-2 text-[10px]' />
                    </Row>
                </Dropdown>
            </Col>
            <Col md={4}>
              <Dropdown overlay={<MenuOrder name={"dateDelete"} />} trigger={['click']}>
                <Row className='cursor-pointer px-1 hover:bg-[#f2f2f2] hover:rounded-[5px]'>
                  <Row className="text-lg cursor-pointer">削除日</Row>
                    {softCondition.name === 'dateDelete' && softCondition.order === 'asc' && <ArrowUpOutlined className='ml-2' />}
                    {softCondition.name === 'dateDelete' && softCondition.order === 'desc' && <ArrowDownOutlined className='ml-2' />}
                  <DownOutlined className='ml-2 text-[10px]' />
                </Row>
              </Dropdown>
            </Col>
            <Col md={5}>
              <Dropdown overlay={<MenuOrder name={"deleteBy"} />} trigger={['click']}>
                <Row className='cursor-pointer px-1 hover:bg-[#f2f2f2] hover:rounded-[5px]'>
                  <Row className="text-lg cursor-pointer">削除者</Row>
                    {softCondition.name === 'deleteBy' && softCondition.order === 'asc' && <ArrowUpOutlined className='ml-2' />}
                    {softCondition.name === 'deleteBy' && softCondition.order === 'desc' && <ArrowDownOutlined className='ml-2' />}
                  <DownOutlined className='ml-2 text-[10px]' />
                </Row>
              </Dropdown>
            </Col>
            <Col md={4}>
              <Dropdown overlay={<MenuOrder name={"createdBy"} />} trigger={['click']}>
                <Row className='cursor-pointer px-1 hover:bg-[#f2f2f2] hover:rounded-[5px]'>
                  <Row className="text-lg cursor-pointer">作成者</Row>
                    {softCondition.name === 'createdBy' && softCondition.order === 'asc' && <ArrowUpOutlined className='ml-2' />}
                    {softCondition.name === 'createdBy' && softCondition.order === 'desc' && <ArrowDownOutlined className='ml-2' />}
                  <DownOutlined className='ml-2 text-[10px]' />
                </Row>
              </Dropdown>
            </Col>
            <Col md={1}></Col>
          </Row>
          {listFolder?.map((item, index) => (
            <Row
              key={index}
              className='border-b border-b-[#cccccc] py-2 px-1 hover:bg-[#f1f1f1] hover:rounded'
              onContextMenu={(e) => handleContextMenu(e, index)}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              // onDrop={() => handleDrop(item)}
              onDragOver={(e) => handleDragOver(e)}
            >
              <Col
                md={10}
                className="w-fit py-2 text-sm"
              >
                <Row>
                  <img src={Folder} alt="folder" className='w-[25px]'/>
                  <p className='leading-5 ml-2'>{item.name}</p>
                </Row>
              </Col>
              <Col
                md={4}
                className="w-fit py-2 text-sm"
              >
                15/11/2024
              </Col>
              <Col
                md={5}
                className="w-fit py-2 text-sm"
              >
                Nguyen Tuan Thuong
              </Col>
              <Col
                md={4}
                className="w-fit py-2 text-sm"
              >
                Than Le Quang Nhat
              </Col>
              <Col
                md={1}
                className="w-fit py-2 text-sm"
              >
                <Dropdown overlay={menu} trigger={['click']}>
                  <MoreOutlined />
                </Dropdown>
              </Col>
            </Row>
          ))}
            <Row
              className='border-b border-b-[#cccccc] py-2 px-1 hover:bg-[#f1f1f1] hover:rounded'
              onContextMenu={(e) => handleContextMenu(e)}
              draggable
              onDragStart={(e) => handleDragStart(e)}
              // onDrop={() => handleDrop(item)}
              onDragOver={(e) => handleDragOver(e)}
            >
              <Col
                md={10}
                className="w-fit py-2 text-sm"
              >
                <Row>
                  <img src={File} alt="folder" className='w-[25px]'/>
                  <p className='leading-5 ml-1'>fileName</p>
                </Row>
              </Col>
              <Col
                md={4}
                className="w-fit py-2 text-sm"
              >
                15/11/2024
              </Col>
              <Col
                md={5}
                className="w-fit py-2 text-sm"
              >
                Than Le Quang Nhat
              </Col>
              <Col
                md={4}
                className="w-fit py-2 text-sm"
              >
                Than Le Quang Nhat
              </Col>
              <Col
                md={1}
                className="w-fit py-2 text-sm"
              >
                <Dropdown overlay={menu} trigger={['click']}>
                  <MoreOutlined />
                </Dropdown>
              </Col>
            </Row>
            {visible && <Dropdown
              overlay={menu}
              trigger={['contextMenu']}
              visible={true}
              overlayStyle={{
                position: 'absolute',
                top: position.y,
                left: position.x,
              }}
            ><span /></Dropdown>}
        </div>
      </div>
    </div>
  );
}

export default DeleteFile;
