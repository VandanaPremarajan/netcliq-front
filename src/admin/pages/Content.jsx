import { useState, useEffect } from "react";
import {
  getAllContent,
  deleteContent,
  addContent,
  updateContent,
} from "../../services/movieService";
import { getAllGenre } from "../../services/genreService";
import AddContent from "../../components/content/AddContent";
import ListContent from "../../components/content/ListContent";
import { notification, message, Button } from "antd";
import dayjs from "dayjs";
import { Token_name } from "../../constants/api_settings";
var authToken = localStorage.getItem(Token_name);

function Content() {
  const [notify, contextHolder] = notification.useNotification();
  const [messageApi, msgContextHolder] = message.useMessage();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const resetPagination = {
    current: 1,
    pageSize: 3,
    total: 0,
  }
  const [pagination, setPagination] = useState(resetPagination);
  
  const [isEditRecord, setIsEditRecord] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(true);
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const fetchContent = async (pagination) => {
    try{
      const response = await getAllContent(authToken, pagination);
      setMovies(response.data);
      setIsTableLoading(false);
      setPagination({
        current: pagination.current, 
        pageSize: pagination.pageSize,
        total: response.data.total || 0,
      });
    }
    catch(err){
      console.log(err);
      setIsTableLoading(false);
    }
  };

  const fetchGenre = async () => {
    try{
      const response = await getAllGenre(authToken);
      const mappedOptions = response.data.map((item) => ({
        label: item.name,
        value: item._id,
      }));
      setGenres(mappedOptions);
    }
    catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    authToken = localStorage.getItem(Token_name);
    fetchContent(pagination);
    fetchGenre();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteContent(id, authToken);
      fetchContent(pagination);
      messageApi.success("Content deleted");
    } catch (err) {
      console.log("Catch Error 400: " + err);
    }
  };

  const handleEdit = (record) => {
    setIsEditRecord(record);
    setIsEdit(true);
  };

  const handleSubmit = async (record) => {
    

    const objValues = {
      title: record.title,
      description: record.description,
      year: dayjs(record.year.$d).format("YYYY"),
      duration: (record.duration.hours * 60) + record.duration.minutes,
      quality: record.quality,
      language: record.language,
      subtitles: record.subtitles,
      cast: record.cast,
      genre_ID: record.genre,
      video_file: record.video_file.file !== undefined ? record.video_file.file.originFileObj : record.video_file[0].url.replace(/^https?:\/\/[^\/]+\/?/, ''),
      poster: record.poster.file !== undefined ? record.poster.file.originFileObj : record.poster[0].url.replace(/^https?:\/\/[^\/]+\/?/, ''),
      trailer_video: record.trailer_video.file !== undefined ? record.trailer_video.file.originFileObj : record.trailer_video[0].url.replace(/^https?:\/\/[^\/]+\/?/, ''),
      content_type: record.content_type,
      release_date: record.release_date ? record.release_date.toDate() : null,
    };
    // console.log(objValues);
    if (isEditRecord && Object.keys(isEditRecord).length > 0) {
      try {
        await updateContent(isEditRecord._id, objValues, authToken);
        notify.success({
          message: "Content Updated",
          description: "The content was updated successfully!",
          placement: "top",
        });
      } catch (err) {
        notify.error({
          message: "Error",
          description: "Error occured when adding the record",
          placement: "top",
        });
        console.log(err);
      }
    } else {
      try {
        await addContent(objValues, authToken);
        notify.success({
          message: "Content Added",
          description: "The content was added successfully!",
          placement: "top",
        });
      } catch (err) {
        notify.error({
          message: "Error",
          description: "Error occured when adding the record",
          placement: "top",
        });
        console.log(err);
      }
    }
    setIsEdit(false);
    closeModal();
    fetchContent(resetPagination);
  };

  

  return (
    <>
      {contextHolder && msgContextHolder}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 mb-3">
              <AddContent
                isEditRecord={isEditRecord}
                onSubmit={handleSubmit}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                genres={genres}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
              />
            </div>

            <div className="col-md-12 mb-3">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title fs-5">Content List</h3>
                    <Button type="primary" onClick={showModal}>
                      Add new
                    </Button>
                  </div>
                </div>
                <div className="card-body">
                  <ListContent
                    list={movies}
                    pagination={pagination}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    setIsModalOpen={setIsModalOpen}
                    isLoading={isTableLoading}
                    fetchMovies={fetchContent}
                    setIsTableLoading={setIsTableLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Content;
