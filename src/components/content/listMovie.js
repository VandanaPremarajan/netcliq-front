import { Table, Space, Button, Popconfirm, Image, Tooltip } from "antd";
import dayjs from "dayjs";
import { date_format } from "../../constants/formConstants";
import { APP_URL } from "../../constants/api_settings";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ListMovie = ({
  list,
  pagination,
  handleDelete,
  handleEdit,
  setIsModalOpen,
  isLoading,
  fetchMovies,
  setIsTableLoading
}) => {
  const onEdit = (record) => {
    console.log(record);
    handleEdit(record);
    setIsModalOpen(true);
  };
// console.log(list)
  const handleTableChange = (pagination) => {
    setIsTableLoading(true);
    fetchMovies(pagination.current, pagination.pageSize);
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "poster", // change this to match your actual field name
      key: "poster",
      render: (src) =>
        src ? (
          <Image
            src={APP_URL + src}
            alt="Thumbnail"
            width={60}
            height={90}
            style={{ objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          "-"
        ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: {
        showTitle: false,
      },
      render: (title) => (
        <Tooltip placement="topLeft" title={title}>
          {title}
        </Tooltip>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: {
        showTitle: false,
      },
      render: (description) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
    },
    {
      title: "Genre",
      dataIndex: "genre_ID",
      key: "genre_ID",
      render: (data) => {
        if (data !== undefined) {
          const labels = data.map((g) => g.name);
          return labels.join(", ");
        }
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => {
        if (typeof duration === 'number') {
          const hours = Math.floor(duration / 60);
          const minutes = duration % 60;
          const hrText = hours === 1 ? 'hr' : 'hrs';
          const minText = minutes === 1 ? 'min' : 'mins';
          return `${hours}${hrText} ${minutes}${minText}`;
        }
        return '-';
      },
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
      render: (date) => (date ? dayjs(date).format(date_format) : "-"),
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => onEdit(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Delete"
            description="Are you sure to delete this record?"
            onConfirm={() => handleDelete(record._id)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="text">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={Array.isArray(list.data) ? list.data : []}
        rowKey="_id"
        loading={isLoading}
        pagination={pagination}
        onChange={handleTableChange}
      ></Table>
    </>
  );
};

export default ListMovie;
