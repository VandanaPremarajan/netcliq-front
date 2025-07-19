import { Table, Space, Popconfirm, Button } from "antd";

const ListGenre = ({ genres, handleDelete, handleEdit }) => {

  // const [genres, setGenres] = useState([]);

  // const fetchContent = async () => {
  //   const response = await getAllGenre();
  //   console.log(response.data);
  //   setGenres(response.data);
  // };

  // useEffect(() => {
  //   fetchContent();
  // }, []);

  // const referesh = (newGenre) => {
  //   console.log("Refresh is Called");
  //   //setGenres([...genres, newGenre]);
  //   fetchContent();
  // };

  // const handleDelete = async (id) => {
  //   // console.log(id);
  //   // const response = await deleteGenre(id);
  //   // fetchContent();
  // };

  // const handleEdit = (id) => {
  //   // navigate("/editGenre/" + id);
  // };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
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

  return (
    <>
      {/* <div className="col-md-2"><AddGenre onAdd={referesh}/></div> */}

      {/* <ul className="list-group">
                        {genres.map(genre => (<Genre key={genre._id} genre={genre}/>))}
                    </ul> */}

      {/* <button
        className="btn btn-success m-4"
        onClick={() => {
          navigate("/admin/addGenre");
        }}
      >
        Add Genre
      </button>

       <table className="table">
        <thead>
          <tr>
            <th scope="col">Genre Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre) => (
            <tr>
              <td>{genre.name}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => handleEdit(genre._id)}
                >
                  Edit
                </button>{" "}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(genre._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <Table columns={columns} dataSource={genres} rowKey="_id"></Table>
    </>
  );
};

export default ListGenre;
