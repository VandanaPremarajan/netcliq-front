import { Table, Space, Button, Popconfirm } from 'antd';

const ListMovie = ({ list, handleDelete, handleEdit , setIsModalOpen, isLoading})=>{
    const onEdit = (record) => {
      console.log(record)
      handleEdit(record);
      setIsModalOpen(true);
    }
    const columns = [
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
        },
        {
          title: "Genre",
          dataIndex: "genre_ID",
          key: "genre_ID",
          render: (data) => {
            if(data !== undefined){
            const labels = data.map(g => g.name);
            return labels.join(', ');
            }
          }
        },
        {
          title: "Duration",
          dataIndex: "duration",
          key: "duration",
        },
        {
          title: "Quality",
          dataIndex: "quality",
          key: "quality",
        },
        {
          title: "Release date",
          dataIndex: "release_date",
          key: "release_date",
        },
        {
          title: "Action",
          dataIndex: "Action",
          key: "Action",
          render: (_, record) => (
            <Space size="middle">
              <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
              <Popconfirm
                title="Delete"
                description="Are you sure to delete this record?"
                onConfirm={() => handleDelete(record._id)}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button danger type="text">Delete</Button>
              </Popconfirm>
            </Space>
          ),
        },
      ];

    return(
        <>
        {/* <h1 className='pt-4 mb-3'>Movies </h1>
        <div className='container pb-5'>
            <div className='row'>
                {movies.map(movie => (<Movie key={movie._id} movie={movie}/>))}
            </div>
        </div> */}
        <Table columns={columns} dataSource={list} rowKey="_id" loading={isLoading}></Table>
        </>
    );

};

export default ListMovie;