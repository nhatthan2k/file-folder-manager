import Folder from '../../assets/folder.jpg';
import File from '../../assets/Capture.jpg';
import doc from '../../assets/docx.svg';
import csv from '../../assets/xlsx.svg';
import pdf from '../../assets/pdf.svg'
import { useEffect, useState } from 'react';
import { Col, Dropdown, Input, Menu, Modal, Row, Select } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, DownloadOutlined, DownOutlined, EditOutlined, ExclamationCircleFilled, MoreOutlined, RightOutlined, ShareAltOutlined} from '@ant-design/icons';

const initFolderList = [
  { id: "1", name: "Folder 1", type: "folder", subFolder: [
    { id: "1.1", name: "Folder 1-1", type: "folder", subFolder: [
      { id: "4", name: "image.png", src: File, type: "img" },
    ]},
    { id: "1.2", name: "Folder 1-2", type: "folder" }
  ]},
  { id: "2", name: "Folder 2", type: "folder", subFolder: [
    { id: "2.1", name: "Folder 2-1", type: "folder" },
    { id: "2.2", name: "Folder 2-2", type: "folder" }
  ]},
  { id: "3", name: "Folder 3", type: "folder", subFolder: [
    { id: "3.1", name: "Folder 3-1", type: "folder" }
  ]},
  { id: "4", name: "image.png", src: File, type: "img" },
  { id: "5", name: "example.csv", src: csv, type: "csv" },
  { id: "6", name: "test.doc", src: doc, type: "doc" },
  { id: "7", name: "text.pdf", src: pdf, type: "pdf" },
]

const findItem = (data: any, targetId: any, parents: any[] = []): any => {
  for (const item of data) {
    // Nếu tìm thấy phần tử
    if (item.id === targetId) {
      return {
        current: item,
        parents: parents,
        children: item.subFolder || []
      };
    }
    
    // Nếu không tìm thấy, tiếp tục tìm trong subFolder
    if (item.subFolder) {
      const result = findItem(item.subFolder, targetId, [...parents, item]);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

const Home = () => {
  // const [isList, setIsList] = useState<any>(false);
  const [isModalShare, setIsModalShare] = useState<any>(false);
  // const [fileName, setFileName] = useState<any>('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isEditFolder, setIsEditFolder] = useState<any>(false);
  // const [currentIndexFolder, setCurrentIndexFolder] = useState();
  const [listFolder, setListFolder] = useState<any>(initFolderList);
  const [listParentFolders, setParentFolders] = useState<any>();
  const [currentFolder, setCurrentFolder] = useState<any>();
  const [softCondition, setSoftCondition] = useState<any>({name: "name", order: "desc"});
  const [targetChange, setTargetChange] = useState<any>();
  // const [listfile, setListFile] = useState();

  // Hàm xử lý khi click chuột phải
  const handleContextMenu = (e: any, index?: any) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setVisible(true);
    // setCurrentIndexFolder(index);
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
    setTargetChange(item)
    const ghostImage = document.createElement("img");
    ghostImage.src = Folder;
    ghostImage.width = 40;

    document.body.appendChild(ghostImage);
  
    e.dataTransfer.setDragImage(ghostImage, 0, 0);

    setTimeout(() => {
      document.body.removeChild(ghostImage);
    }, 0);
  };

  const handleDrop = (item:any) => {
    console.log(item);
    console.log(targetChange);
    
    if(targetChange) {
      const newList = listFolder.filter((folder: any) => {
        if(folder.id !== targetChange.id) {
          return folder;
        }
      })
      
      newList.map((folder: any) => {
        if(folder.id == item.id) {
          return folder.subFolder.push(targetChange);
        }
      })
      setListFolder(newList);
    }
  }

  const handleOpenFolder = ( listNewFolder: any ) => {
    setListFolder(listNewFolder.children);
    setCurrentFolder(listNewFolder.current);
    setParentFolders(listNewFolder.parents);
  }

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
        <Row>
          <Row className={`text-[30px] ml-[5px] mr-1 ${currentFolder && "cursor-pointer hover:underline"}`} onClick={() => {
            setListFolder(initFolderList)
            setCurrentFolder({})
            setParentFolders([])
          }}>
            ホームページ
          </Row>
          {listParentFolders?.length > 0 && <RightOutlined />}
          {listParentFolders?.map((item: any, index: any) => (
            item.type == 'folder' && <Row className='text-[30px] ml-[5px] cursor-pointer hover:underline' onClick={() => handleOpenFolder(findItem(initFolderList, item.id))}>
              {item.name}
            </Row>
          ))}
          {currentFolder?.name && <RightOutlined />}
          {currentFolder?.name && <Row className='text-[30px] ml-[5px] cursor-default'>
            {currentFolder?.name}
          </Row>}
        </Row>
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
              <Dropdown overlay={<MenuOrder name={"open"} />} trigger={['click']}>
                <Row className='cursor-pointer px-1 hover:bg-[#f2f2f2] hover:rounded-[5px]'>
                  <Row className="text-lg cursor-pointer">最終更新日</Row>
                  {softCondition.name === 'open' && softCondition.order === 'asc' && <ArrowUpOutlined className='ml-2' />}
                  {softCondition.name === 'open' && softCondition.order === 'desc' && <ArrowDownOutlined className='ml-2' />}
                  <DownOutlined className='ml-2 text-[10px]' />
                </Row>
              </Dropdown>
            </Col>
            <Col md={4}>
              <Dropdown overlay={<MenuOrder name={"owner"} />} trigger={['click']}>
                <Row className='cursor-pointer px-1 hover:bg-[#f2f2f2] hover:rounded-[5px]'>
                  <Row className="text-lg cursor-pointer">作成者</Row>
                  {softCondition.name === 'owner' && softCondition.order === 'asc' && <ArrowUpOutlined className='ml-2' />}
                  {softCondition.name === 'owner' && softCondition.order === 'desc' && <ArrowDownOutlined className='ml-2' />}
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
            <Col md={1}>

            </Col>
          </Row>
          {listFolder?.map((item: any, index: any) => (
            item.type == 'folder' ? (
              <Row
                key={index}
                className='border-b border-b-[#cccccc] py-2 px-1 hover:bg-[#f1f1f1] hover:rounded'
                onContextMenu={(e) => handleContextMenu(e, index)}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onDrop={() => handleDrop(item)}
                onDragOver={(e) => handleDragOver(e)}
              >
                <Col
                  md={10}
                  className="w-fit py-2 text-sm"
                >
                  <Row>
                    <img src={Folder} alt="folder" className='w-[25px]'/>
                    <p className='leading-5 ml-2 hover:underline' onClick={() => handleOpenFolder(findItem(initFolderList, item.id))}>{item.name}</p>
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
            ) : (
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
                    <img src={item.src} alt="folder" className='w-[25px]'/>
                    <p className='leading-5 ml-1 hover:underline'>{item.name}</p>
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
            )))}
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

export default Home;
