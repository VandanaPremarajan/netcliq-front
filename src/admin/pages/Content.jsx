import { useState, useEffect } from "react";
import {
  getAllContent,
  deleteContent,
  addContent,
  updateContent,
} from "../../services/movieService";
import { getAllGenre } from "../../services/genreService";
import AddContent from "../../components/content/addMovie";
import ListMovie from "../../components/content/listMovie";
import { notification, message, Button } from "antd";
import dayjs from "dayjs";
import { Token_name } from "../../constants/api_settings";
var authToken = localStorage.getItem(Token_name);

function Content() {
  const [notify, contextHolder] = notification.useNotification();
  const [messageApi, msgContextHolder] = message.useMessage();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  
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
  
  const fetchContent = async () => {
    try{
      const response = await getAllContent(authToken);
      setMovies(response.data);
      setIsTableLoading(false);
    }
    catch(err){
      console.log(err);
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
    fetchContent();
    fetchGenre();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteContent(id, authToken);
      fetchContent();
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
      duration: "nil",
      quality: record.quality,
      language: record.language,
      subtitles: record.subtitles,
      cast: record.cast,
      genre_ID: record.genre,
      video_file: record.poster.file.originFileObj,
      poster: record.poster.file.originFileObj,
      trailer_video: record.poster.file.originFileObj,
      content_type: record.content_type,
      is_premium: record.is_premium ? true : false,
      release_date: dayjs(record.release_date.$d).format("MMMM D, YYYY"),
    };
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
    fetchContent();
  };

  

  return (
    <>
      {contextHolder && msgContextHolder}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <Button type="primary" onClick={showModal}>
                Add new
              </Button>
            </div>
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
                    <h3 className="card-title">Content List</h3>
                  </div>
                </div>
                <div className="card-body">
                  <ListMovie
                    list={movies}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    setIsModalOpen={setIsModalOpen}
                    isLoading={isTableLoading}
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
