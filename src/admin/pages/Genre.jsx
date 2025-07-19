import { useState, useEffect, useCallback } from "react";
import { getAllGenre, deleteGenre, addGenre, updateGenre } from "../../services/genreService";
import AddGenre from "../../components/genre/addGenre";
import ListGenre from "../../components/genre/listGenre";
import { notification } from "antd";
import { Token_name } from "../../constants/api_settings";

function Genre() {
  const [notify, contextHolder] = notification.useNotification();

  const [genres, setGenres] = useState([]);
  const [genresEditRecord, setGenresEditRecord] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const authToken = localStorage.getItem(Token_name);
  
    const fetchContent = useCallback(async () => {
      const response = await getAllGenre(authToken);
      console.log(response.data);
      setGenres(response.data);
    },[authToken]);
  
    useEffect(() => {
      fetchContent();
    }, [fetchContent]);
  
    const handleDelete = async (id) => {
      await deleteGenre(id, authToken);
      fetchContent();
      setGenresEditRecord([]);
      setIsEdit(false);
    };
    
    const handleEdit = (record) => {
      setGenresEditRecord(record);
      setIsEdit(true);
    }

    const handleSubmit = async(record) => {
      if(genresEditRecord && Object.keys(genresEditRecord).length > 0){
            try {
              await updateGenre(genresEditRecord._id, record, authToken);
              notify.success({
                message: 'Genre Updated',
                description: 'The genre was updated successfully!',
                placement: 'top', 
              });
            } catch (err) {
              notify.error({
                message: 'Error',
                description: 'Error occured when adding the record',
                placement: 'top', 
              });
            }
      }
      else{
        try {
          await addGenre(record, authToken);
          notify.success({
            message: 'Genre Added',
            description: 'The genre was added successfully!',
            placement: 'top', 
          });
        } catch (err) {
          notify.error({
            message: 'Error',
            description: 'Error occured when adding the record',
            placement: 'top', 
          });
        }
      }
      setIsEdit(false);
      fetchContent();
    }

  return (
    <>
    {contextHolder}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">{isEdit ? 'Edit' : 'Add'} Genre</h3>
                  </div>
                </div>
                <div className="card-body">
                  <AddGenre genresEditRecord={genresEditRecord} onSubmit={handleSubmit} isEdit={isEdit} setIsEdit={setIsEdit} />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Genre List</h3>
                  </div>
                </div>
                <div className="card-body">
                  <ListGenre genres={genres} handleDelete={handleDelete} handleEdit={handleEdit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Genre;
