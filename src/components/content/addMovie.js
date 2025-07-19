import { useState, useEffect, useCallback } from "react";
import {
  Form,
  Input,
  Space,
  Button,
  DatePicker,
  Select,
  Switch,
  Modal,
  Upload,
  Image
} from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { content_type } from "../../constants/formConstants";
import { textareaMaxLength } from "../../constants/formConstants";

function AddContent({
  isEditRecord,
  onSubmit,
  isEdit,
  setIsEdit,
  genres,
  isModalOpen,
  closeModal,
}) {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const [previewUrl, setPreviewUrl] = useState('');
  const [isImgLoading, setisImgLoading] = useState(false);

  const handleModalCancel = () => {
    closeModal();
    ClearFields();
  };

  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: "${label} is required!",
  };

  const onFinish = (values) => {
    console.log(values);
    onSubmit(values);
    ClearFields();
  };

  const ClearFields = useCallback(() => {
    setIsEdit(false);
    setPreviewUrl('');
    setisImgLoading(false);
    form.resetFields();
  }, [form, setIsEdit, setPreviewUrl]);

  useEffect(() => {
    if (isEditRecord && Object.keys(isEditRecord).length > 0) {
      console.log(isEditRecord)
      form.setFieldsValue({
        title: isEditRecord.title,
        description: isEditRecord.description,
        year: dayjs(isEditRecord.year, 'YYYY'),
        duration: "nil",
        quality: isEditRecord.quality,
        language: isEditRecord.language,
        subtitles: isEditRecord.subtitles,
        cast: isEditRecord.cast,
        genre: isEditRecord.genre_ID.map(g => g._id),
        video_file: 'nil',
        poster: 'nil',
        trailer_video: 'nil',
        content_type: isEditRecord.content_type,
        is_premium: isEditRecord.is_premium ? true : false,
        release_date: dayjs(isEditRecord.release_date, "MMMM D, YYYY"),
      });
    } else {
      ClearFields();
    }
  }, [isEditRecord, ClearFields, form]);

  const currentYear = dayjs().year();

  const disableFutureYears = (current) => {
    return current && current.year() > currentYear;
  };

  const uploadProps = {
  name: 'file',
  // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  // headers: {
  //   authorization: 'authorization-text',
  // },
  listType:"picture-circle",
  onChange(info) {
     const preview = URL.createObjectURL(info.file.originFileObj);
    setPreviewUrl(preview);

    if (info.file.status !== 'uploading') {
      setisImgLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setisImgLoading(false);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  },
};
const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {isImgLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Modal
        title={isEdit ? "Edit Content" : "Add New Content"}
        closable={{ "aria-label": "Custom Close Button" }}
        footer={null}
        open={isModalOpen}
        onCancel={handleModalCancel}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "70%",
          xxl: "50%",
        }}
      >
        <Form
          form={form}
          preserve={false}
          layout="vertical"
          name="movies"
          validateMessages={validateMessages}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item name="year" label="Year" rules={[{ required: true }]}>
                <DatePicker picker="year" format="YYYY" disabledDate={disableFutureYears} />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item
                name="quality"
                label="Quality"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item
                name="content_type"
                label="Content Type"
                rules={[{ required: true }]}
              >
                <Select
                  style={{ width: "100%" }}
                  options={content_type}
                />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <Form.Item
                name="is_premium"
                label="Premium"
                rules={[{ required: false }]}
              >
                <Switch />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-12">
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true }]}
                  >
                    <TextArea rows={5} maxLength={textareaMaxLength} />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4">
                  <Form.Item
                    name="genre"
                    label="Genre"
                    rules={[{ required: true }]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      options={genres}
                      maxTagCount="responsive"
                    />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <Form.Item
                    name="language"
                    label="Language"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <Form.Item
                    name="subtitles"
                    label="Subtitles"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-md-8">
                  <Form.Item
                    name="cast"
                    label="Cast"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="col-md-4">
                  <Form.Item
                    name="release_date"
                    label="Release Date"
                    rules={[{ required: true }]}
                  >
                    <DatePicker disabledDate={disableFutureYears} />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                name="poster"
                label="Poster"
                rules={[{ required: true }]}
              >
                <Upload {...uploadProps}>
                  {previewUrl ? <img src={previewUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
              </Form.Item>
            </div>
            {previewUrl && (
        <div style={{ marginTop: 16 }}>
          <Image
            src={previewUrl}
            alt="Poster Preview"
            width={200}
            style={{ border: '1px solid #ccc', borderRadius: 4 }}
          />
        </div>
      )}
          </div>
          <Form.Item label={null}>
            <Space size="small">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={ClearFields}>Clear</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default AddContent;
