import Folder from '../../assets/folder.jpg'
import File from '../../assets/Capture.jpg'
import { useEffect, useState } from 'react';
import { Button, Col, Dropdown, Image, Input, Menu, Modal, Row, Select, Upload } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, DownloadOutlined, DownOutlined, EditOutlined, ExclamationCircleFilled, MoreOutlined, OrderedListOutlined, PlusOutlined, ShareAltOutlined, UnorderedListOutlined, UploadOutlined, UpOutlined } from '@ant-design/icons';
import { FiGrid } from 'react-icons/fi';

const FileManager = () => {
  const [isList, setIsList] = useState<any>(true);
  const [isAddFile, setIsAddFile] = useState<any>(false);
  const [isAddFolder, setIsAddFolder] = useState<any>(false);
  const [isModalShare, setIsModalShare] = useState<any>(false);
  const [isEditFolder, setIsEditFolder] = useState<any>(false);
  const [fileName, setFileName] = useState<any>('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [currentIndexFolder, setCurrentIndexFolder] = useState();
  const [folderName, setFolderName] = useState<any>();
  const [listFolder, setListFolder] = useState([
    { id: "1", name: "Folder 1"},
    { id: "2", name: "Folder 1"},
    { id: "3", name: "Folder 1"},
    { id: "4", name: "Folder 1"},
    { id: "5", name: "Folder 1"},
    { id: "6", name: "Folder 1"},
    { id: "7", name: "Folder 1"},
  ]);
  const [softCondition, setSoftCondition] = useState<any>({name: "name", order: "desc"});
  const [sortKeys, setSortKeys] = useState<any>(['name', 'desc']);
  const [listfile, setListFile] = useState();

  // Hàm xử lý khi click chuột phải
  const handleContextMenu = (e: any, index?: any) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setVisible(true);
    setCurrentIndexFolder(index);
  };

  const confirm = (id?: any): any => {
    Modal.confirm({
      title: "Delete",
      icon: <ExclamationCircleFilled className="!text-[#1677ff]" />,
      content: "Do you want to delete this folder",
      okText: "Yes",
      cancelText: "No",
      // onOk() {
      //   handleDeleteGroupDetail(id);
      // },
      centered: true,
      closable: false,
    });
  };

  const handleCreateFolder = () => {
    setListFolder([...listFolder, { id: String(listFolder.length + 2), name: folderName}])
    setFolderName("");
    setIsAddFolder(false);
  }

  // Tạo menu khi click chuột phải
  const menu = (
    <Menu>
      <Menu.Item className='mx-5' key="1" onClick={confirm}>
        <Row>
            <DeleteOutlined />
            <Row className='ml-3'>削除</Row>
        </Row>
      </Menu.Item>
      <Menu.Item className='mx-5' key="2" onClick={() => setIsEditFolder(true)}>
        <Row>
            <EditOutlined />
            <Row className='ml-3'>名前を変更</Row>
        </Row>
      </Menu.Item>
      <Menu.Item className='mx-5' key="3" onClick={() => setIsModalShare(true)}>
        <Row>
            <ShareAltOutlined />
            <Row className='ml-3'>共有</Row>
        </Row>
      </Menu.Item>
      {/* <Menu.Item className='mx-5' key="4">
        <Row>
            <DownloadOutlined />
            <Row className='ml-3'>download</Row>
        </Row>
      </Menu.Item> */}
    </Menu>
  );

  const menuSort = (
    <Menu onClick={(e) => handleSortSelect(e)} selectedKeys={sortKeys}>
      <Menu.Item key="name">
        <Row className="ml-1">名前</Row>
      </Menu.Item>
      <Menu.Item key="dateShared">
        <Row className="ml-1">共有日</Row>
      </Menu.Item>
      <Menu.Item key="sharedBy">
        <Row className="ml-1">共有者</Row>
      </Menu.Item>
      <Menu.Item key="activity">
        <Row className="ml-1">共有</Row>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="asc">
        <Row className="ml-1">昇順</Row>
      </Menu.Item>
      <Menu.Item key="desc">
        <Row className="ml-1">降順</Row>
      </Menu.Item>
    </Menu>
  );

  const handleSortSelect = (e: any) => {
    const { key } = e;

    if (key === 'asc' || key === 'desc') {
      setSoftCondition((prev: any) => ({
        ...prev,
        order: key,
      }));
      setSortKeys([softCondition.name, key])
    } else {
      setSoftCondition((prev: any) => ({
        ...prev,
        name: key,
      }));
      setSortKeys([key, softCondition.order])
    }
  }

  const MenuOrder = ({ name }: { name: string }) => {
    const handleOrder = (order: string) => {
        setSoftCondition((prev: any) => ({
            ...prev,
            name: name,
            order: order,
        }));
      setSortKeys([name, order])
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

  const handleChange = (info: any) => {
    if (info.fileList.length > 0) {
      setFileName(info.fileList[0].name);
    } else {
      setFileName('');
    }
  }

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
        <div className='flex justify-between'>
          <div className='text-[30px] ml-[5px]'>共有アイテム</div>
        </div>
        <Row className='justify-end mr-5 mt-10 items-center'>
          <Dropdown overlay={menuSort} trigger={['click']}>
            <Row className='mr-2 items-center text-[20px] hover:bg-[#f1f6ff] p-2 rounded-[10px] cursor-pointer'>
              <OrderedListOutlined />
              <Row className='mx-2 mb-1'>ソート順</Row>
              <DownOutlined className='text-[10px]' />
            </Row>
          </Dropdown>
          <Row className='rounded-[20px] border overflow-hidden'>
            <UnorderedListOutlined className={`text-[24px] py-1 px-4 border-r ${isList ? 'bg-[#96e5d0]' : ''}`} onClick={() => setIsList(true)} />
            <Row className={`py-1 px-4 items-center ${isList ? '' : 'bg-[#96e5d0]'}`} onClick={() => setIsList(false)}>
              <FiGrid className='text-[24px]' />
            </Row> 
          </Row>
        </Row>
        {isList ? (
        <div className='px-5 mt'>
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
            <Dropdown overlay={<MenuOrder name={"dateShared"} />} trigger={['click']}>
              <Row className='cursor-pointer px-1 hover:bg-[#f2f2f2] hover:rounded-[5px]'>
                <Row className="text-lg cursor-pointer">共有日</Row>
                  {softCondition.name === 'dateShared' && softCondition.order === 'asc' && <ArrowUpOutlined className='ml-2' />}
                  {softCondition.name === 'dateShared' && softCondition.order === 'desc' && <ArrowDownOutlined className='ml-2' />}
                <DownOutlined className='ml-2 text-[10px]' />
              </Row>
            </Dropdown>
          </Col>
          <Col md={4}>
            <Dropdown overlay={<MenuOrder name={"sharedBy"} />} trigger={['click']}>
              <Row className='cursor-pointer px-1 hover:bg-[#f2f2f2] hover:rounded-[5px]'>
                <Row className="text-lg cursor-pointer">共有者</Row>
                  {softCondition.name === 'sharedBy' && softCondition.order === 'asc' && <ArrowUpOutlined className='ml-2' />}
                  {softCondition.name === 'sharedBy' && softCondition.order === 'desc' && <ArrowDownOutlined className='ml-2' />}
                <DownOutlined className='ml-2 text-[10px]' />
              </Row>
            </Dropdown>
          </Col>
          <Col md={5}>
            <Dropdown overlay={<MenuOrder name={"activity"} />} trigger={['click']}>
              <Row className='cursor-pointer px-1 hover:bg-[#f2f2f2] hover:rounded-[5px]'>
                <Row className="text-lg cursor-pointer">共有</Row>
                  {softCondition.name === 'activity' && softCondition.order === 'asc' && <ArrowUpOutlined className='ml-2' />}
                  {softCondition.name === 'activity' && softCondition.order === 'desc' && <ArrowDownOutlined className='ml-2' />}
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
              md={4}
              className="w-fit py-2 text-sm"
            >
              Nguyen Tuan Thuong
            </Col>
            <Col
              md={5}
              className="w-fit py-2 text-sm"
            >
              <Row>
                  <ShareAltOutlined />
                  <Row className='ml-2'>share with me</Row>
              </Row>
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
              md={4}
              className="w-fit py-2 text-sm"
            >
              Than Le Quang Nhat
            </Col>
            <Col
              md={5}
              className="w-fit py-2 text-sm"
            >
              <Row>
                  <EditOutlined />
                  <Row className='ml-2'>my file</Row>
              </Row>
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
        ) : (
          <>
            <div className='w-full flex flex-wrap'>
              {listFolder?.map((item, index) => (
                <div
                  className='flex w-[300px] items-center rounded-lg border border-slate-300 ml-[15px] mt-[15px] cursor-pointer'
                  onContextMenu={(e) => handleContextMenu(e, index)}
                  draggable
                  onDragStart={(e) => handleDragStart(e)}
                  // onDrop={() => handleDrop(item)}
                  onDragOver={(e) => handleDragOver(e)}
                >
                  <img src={Folder} alt="folder" className='w-[65px] p-[10px]'/>
                  <div>
                    <p className='leading-5'>{item.name}</p>
                  </div>
                  <button className='ml-[150px]' onClick={(e) => handleContextMenu(e, index)}>:</button>
                </div>
              ))}
              {visible && <Dropdown
                overlay={menu}
                trigger={['contextMenu']} // Hiển thị menu khi click chuột phải
                visible={true}
                overlayStyle={{
                  position: 'absolute',
                  top: position.y,
                  left: position.x,
                }}
              ><span /></Dropdown>}
            </div>
            <div className='text-[30px] mt-[40px] ml-[5px]'>My File</div>
            <div className='w-full flex flex-wrap'>
              <div className='w-[300px] rounded-lg border ml-[15px] mt-[15px] cursor-pointer py-[10px] relative'>
                <Image src={File} className='w-[300px]' />
                <div className='flex'>
                  <p className='leading-5 ml-[10px]'>file Name</p>
                </div>
                <button className='absolute top-[10px] right-[15px] w-[15px]'>:</button>
              </div>
            </div>
          </>
        )}
      </div>
      {isAddFile && <Modal
          title="Add File"
          open={isAddFile}
          onCancel={() => setIsAddFile(false)}
          centered
          className="modal-detail"
        >
          <Row className='justify-between items-center px-10'>
            {fileName ? <p>Tên file: {fileName}</p> : <span></span>}
            <Upload onChange={handleChange} showUploadList={false}>
              <Button icon={<UploadOutlined />}>Chọn file</Button>
            </Upload>
          </Row>
        </Modal>
      }
      {isAddFolder && <Modal
          title="Add Folder"
          open={isAddFolder}
          onCancel={() => setIsAddFolder(false)}
          onOk={handleCreateFolder}
          centered
          className="modal-detail"
        >
          <Input placeholder='folder name' onChange={(e) => setFolderName(e.target.value)} />
        </Modal>
      }
      {isEditFolder && <Modal
          title="名前を変更"
          open={isEditFolder}
          onCancel={() => setIsEditFolder(false)}
          // onOk={handleRenameFolder}
          centered
          className="modal-detail"
        >
          <Input placeholder='フォルダ' />
        </Modal>
      }
      {isModalShare && <Modal
          title="共有"
          open={isModalShare}
          onCancel={() => setIsModalShare(false)}
          centered
          okText={"Share"}
          className="modal-detail"
        >
          <Col>
            <Row>組織</Row>
            <Select options={[
                {
                  value: "A",
                  label: "organization A",
                },
                {
                  value: "B",
                  label: "organization B",
                },
                {
                  value: "C",
                  label: "organization C",
                },
                {
                  value: "D",
                  label: "organization D",
                },
              ]}
              className='w-full mt-1'
            />
          </Col>
          <Col className='mt-3'>
            <Row>役割</Row>
            <Select options={[
                {
                  value: "A",
                  label: "Role A",
                },
                {
                  value: "B",
                  label: "Role B",
                },
                {
                  value: "C",
                  label: "Role C",
                },
                {
                  value: "D",
                  label: "Role D",
                },
              ]}
              className='w-full mt-1'
            />
          </Col>
          <Col className='mt-3'>
            <Row>権限</Row>
            <Select options={[
                {
                  value: "view",
                  label: "View",
                },
                {
                  value: "edit",
                  label: "Edit",
                },
              ]}
              className='w-full mt-1'
            />
          </Col>
          <Col className='mt-3'>
            <Row>ユーザー</Row>
            <Input className='mt-1' />
          </Col>
        </Modal>
      }
    </div>
  );
}

export default FileManager;
