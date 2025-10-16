import { useState, useEffect, useCallback } from "react";
import {
  Form,
  Input,
  Space,
  Button,
  DatePicker,
  Select,
  Modal,
  Upload,
  Image,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { content_type } from "../../constants/formConstants";
import { textareaMaxLength } from "../../constants/formConstants";
import DurationSelector from "../DurationSelector";
// import VideoPlayer from "../VideoPlayer";

const AddContent = ({
  isEditRecord,
  onSubmit,
  isEdit,
  setIsEdit,
  genres,
  isModalOpen,
  closeModal,
}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  // poster
  const [isPosterLoading, setIsPosterLoading] = useState(false);
  const [posterFileList, setPosterFileList] = useState([]);
  const [posterPreviewOpen, setPosterPreviewOpen] = useState(false);
  const [posterPreviewImage, setPosterPreviewImage] = useState("");

  // trailer_video
  const [isTrailerLoading, setIsTrailerLoading] = useState(false);
  const [trailerFileList, setTrailerFileList] = useState([]);
  const [trailerPreviewOpen, setTrailerPreviewOpen] = useState(false);
  const [trailerPreviewImage, setTrailerPreviewImage] = useState("");

  // video_file
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoFileList, setVideoFileList] = useState([]);
  const [videoPreviewOpen, setVideoPreviewOpen] = useState(false);
  const [videoPreviewImage, setVideoPreviewImage] = useState("");

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
    setIsPosterLoading(false);
    setPosterFileList([]);
    setPosterPreviewOpen(false);
    setTrailerPreviewImage('');

    setIsTrailerLoading(false);
    setTrailerFileList([]);
    setTrailerPreviewOpen(false);
    setTrailerPreviewImage('');

    setIsVideoLoading(false);
    setVideoFileList([]);
    setVideoPreviewOpen(false);
    setVideoPreviewImage('');
    form.resetFields();
  }, [form, setIsEdit]);

  useEffect(() => {
    if (isEditRecord && Object.keys(isEditRecord).length > 0) {
      console.log(isEditRecord);
      // settimeout for duration, waiting for <durationSelector> to mount first
      setTimeout(() => {
        let posterFile;
        if (isEditRecord.poster) {
          posterFile = [
            {
              uid: "-1",
              name: "poster.jpg",
              status: "done",
              // url: `${APP_URL}${isEditRecord.poster}`,
              url: isEditRecord.poster,
            },
          ];
          setPosterFileList(posterFile);
        }

        // Trailer
        let trailerFile;
        if (isEditRecord.trailer_video) {
          trailerFile = [
            {
              uid: "-2",
              name: "trailer.mp4",
              status: "done",
              url: isEditRecord.trailer_video,
            },
          ];
          setTrailerFileList(trailerFile);
          setTrailerPreviewImage({
            autoplay: false,
            controls: true,
            responsive: true,
            fluid: true,
            sources: [
              {
                src: videoUrl,
                type: "video/mp4",
              },
            ],
          });
        }

        // Video File
        let videoFile;
        if (isEditRecord.video_file) {
          videoFile = [
            {
              uid: "-3",
              name: "video.mp4",
              status: "done",
              url: isEditRecord.video_file,
            },
          ];
          setVideoFileList(videoFile);
          setVideoPreviewImage({
            autoplay: false,
            controls: true,
            responsive: true,
            fluid: true,
            sources: [
              {
                src: videoUrl,
                type: "video/mp4",
              },
            ],
          });
        }

        form.setFieldsValue({
          title: isEditRecord.title,
          description: isEditRecord.description,
          year: dayjs(isEditRecord.year, "YYYY"),
          duration: {
            hours: Math.floor(isEditRecord.duration / 60),
            minutes: isEditRecord.duration % 60,
          },
          quality: isEditRecord.quality,
          language: isEditRecord.language,
          subtitles: isEditRecord.subtitles,
          cast: isEditRecord.cast,
          genre: isEditRecord.genre_ID.map((g) => g._id),
          video_file: videoFile,
          poster: posterFile,
          trailer_video: trailerFile,
          content_type: isEditRecord.content_type,
          release_date: isEditRecord.release_date ? dayjs(isEditRecord.release_date) : null,
        });
      }, 0);
    } else {
      ClearFields();
    }
  }, [isEditRecord, ClearFields, form]);

  const currentYear = dayjs().year();

  const disableFutureYears = (current) => {
    return current && current.year() > currentYear;
  };

  // const handleRemove = () => {
  //   setPosterFileList([]);
  // };

  const handleCancel = () => {
    setPosterPreviewOpen(false);
    setPosterPreviewImage("");
  };

  const handleChange = ({ file, fileList, type }) => {
    let previewUrl;
    if (file.originFileObj instanceof Blob) {
      previewUrl = URL.createObjectURL(file.originFileObj);
    } else if (file.url) {
      previewUrl = file.url;
    }
    if (type === "poster") {
      setPosterFileList(fileList);
    } else if (type === "trailer") {
      setTrailerFileList(fileList);
      // const previewUrl = URL.createObjectURL(file.originFileObj);
      setTrailerPreviewImage({
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: previewUrl,
            type: "video/mp4",
          },
        ],
      });
    } else if (type === "video_file") {
      setVideoFileList(fileList);
      // const previewUrl = URL.createObjectURL(file.originFileObj);
      setVideoPreviewImage({
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: previewUrl,
            type: "video/mp4",
          },
        ],
      });
    }
  };

  const handlePreview = ({ file, type }) => {
    console.log(file);
    let previewUrl;
    if (file.originFileObj instanceof Blob) {
      previewUrl = URL.createObjectURL(file.originFileObj);
    } else if (file.url) {
      previewUrl = file.url;
    } else {
      console.warn("No valid preview source for file:", file);
      return;
    }
    if (type === "poster") {
      console.log(2);
      setPosterPreviewImage(previewUrl);
      setPosterPreviewOpen(true);
    } else if (type === "trailer") {
      setTrailerPreviewImage(previewUrl);
      setTrailerPreviewOpen(true);
    } else if (type === "video_file") {
      setVideoPreviewImage(previewUrl);
      setVideoPreviewOpen(true);
    }
  };

  const beforeUpload = (file, type) => {
    // if(type === 'poster'){
    //   const isImage = file.type.startsWith("image/");
    //   if (!isImage) {
    //     console.log("Only images allowed");
    //     return Upload.LIST_IGNORE;
    //   }
    // }
    // const previewUrl = URL.createObjectURL(file);
    // console.log(previewUrl)
    // Object.assign(file, {
    //   status: "done",
    //   url: previewUrl,
    //   preview: previewUrl,
    // });
    // return true; // so file enters fileList procedure
  };

  const uploadButton = (isLoading) => {
    return (
      <button style={{ border: 0, background: "none" }} type="button">
        {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    );
  };

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
          xl: "90%",
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
                <DatePicker
                  picker="year"
                  format="YYYY"
                  disabledDate={disableFutureYears}
                />
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
                <Select style={{ width: "100%" }} options={content_type} />
              </Form.Item>
            </div>
            <div className="col-md-2">
              <DurationSelector />
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
                <Upload
                  action=""
                  accept="image/*"
                  listType="picture-card"
                  fileList={posterFileList}
                  customRequest={({ onSuccess }) => {
                    // no upload, just signal success to bypass the error caused by action=""
                    setTimeout(() => onSuccess?.("ok"), 0);
                  }}
                  beforeUpload={(info) => {
                    beforeUpload({ ...info, type: "poster" });
                  }}
                  onChange={(info) => {
                    handleChange({ ...info, type: "poster" });
                  }}
                  onPreview={(file) => {
                    handlePreview({ file, type: "poster" });
                  }}
                >
                  {posterFileList.length >= 1
                    ? null
                    : uploadButton(isPosterLoading)}
                </Upload>
              </Form.Item>
              {posterPreviewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: posterPreviewOpen,
                    onVisibleChange: (visible) => setPosterPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPosterPreviewImage(""),
                  }}
                  src={posterPreviewImage}
                />
              )}
            </div>
            <div className="col-md-4">
              <Form.Item
                name="trailer_video"
                label="Trailer Video"
                rules={[{ required: true }]}
              >
                <Upload
                  action=""
                  accept="video/*"
                  listType="picture-card"
                  fileList={trailerFileList}
                  customRequest={({ onSuccess }) => {
                    // no upload, just signal success to bypass the error caused by action=""
                    setTimeout(() => onSuccess?.("ok"), 0);
                  }}
                  beforeUpload={(info) => {
                    beforeUpload({ ...info, type: "trailer" });
                  }}
                  onChange={(info) => {
                    handleChange({ ...info, type: "trailer" });
                  }}
                  onPreview={(file) => {
                    handlePreview({ file, type: "trailer" });
                  }}
                >
                  {trailerFileList.length >= 1
                    ? null
                    : uploadButton(isTrailerLoading)}
                </Upload>
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                name="video_file"
                label="Video"
                rules={[{ required: true }]}
              >
                <Upload
                  action=""
                  accept="video/*"
                  listType="picture-card"
                  fileList={videoFileList}
                  customRequest={({ onSuccess }) => {
                    // no upload, just signal success to bypass the error caused by action=""
                    setTimeout(() => onSuccess?.("ok"), 0);
                  }}
                  beforeUpload={(info) => {
                    beforeUpload({ ...info, type: "video_file" });
                  }}
                  onChange={(info) => {
                    handleChange({ ...info, type: "video_file" });
                  }}
                  onPreview={(file) => {
                    handlePreview({ file, type: "video_file" });
                  }}
                >
                  {videoFileList.length >= 1
                    ? null
                    : uploadButton(isVideoLoading)}
                </Upload>
              </Form.Item>
            </div>
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
