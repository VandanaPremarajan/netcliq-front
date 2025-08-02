import { useParams } from "react-router-dom";
import {useState, useEffect, useCallback} from "react";
import { updateContent , getContent} from "../../services/movieService";
import { useNavigate } from "react-router-dom";

const EditContent = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const setInputValues = (data) => {
        setValues({
            "title": data.title,
            "description": data.description,
            "year": data.year,
            "duration": data.duration,
            "quality": data.quality,
            "language": data.language,
            "subtitles": data.subtitles,
            "cast": data.cast,
            "genre_ID": data.genre_ID,
            "video_file": data.video_file,
            "poster": data.poster,
            "trailer_video": data.trailer_video,
            "content_type": data.content_type,
            "is_premium": data.is_premium,
            "release_date": data.release_date,
        });
    }
        const fetchContent = useCallback(async() => {
            const response = await getContent(id);
            setInputValues(response.data);
        },[id]);
        
        useEffect(()=>{ 
            fetchContent();
        },[fetchContent]);

        const [values, setValues] = useState({
            "title": "",
            "description": "",
            "year": 0,
            "duration": "",
            "quality": "",
            "language": "",
            "subtitles": "",
            "cast": "",
            "genre_ID": "nil",
            "video_file": "nil",
            "poster": "nil",
            "trailer_video": "nil",
            "content_type": "nil",
            "is_premium": false,
            "release_date": "",
        });
    
        const clearInputValues = () => {
            setValues({
                "title": "",
                "description": "",
                "year": null,
                "duration": "",
                "quality": "",
                "language": "",
                "subtitles": "",
                "cast": "",
                "genre_ID": "",
                "video_file": "",
                "poster": "",
                "trailer_video": "",
                "content_type": "",
                "is_premium": false,
                "release_date": "",
            });
        }
    
        const handleInputChange = (event)=>{
            setValues({
                ...values,
                [event.target.name]: event.target.value
            });
        };
    
        const handleSubmit = async()=>{
                // const newContent = {name, description};
                await updateContent(id, values);
                // console.log(response.data);
                clearInputValues();
                //onAdd(response.data);
                navigate('/');
        };
    

        return(
            <>
            <div className="row m-4" >
                <div  className="col-md-6">
                <h2>Edit Content</h2>
    
                <div className="mb-3">
                        <input type="text" name="title" placeholder="Enter title" className="form-control" onChange={handleInputChange} value={values.title} />
                </div>
    
                <div className="mb-3">
                        <input type="text" name="description" placeholder="Enter description" className="form-control" onChange={handleInputChange} value={values.description} />
                </div>
    
                <div className="mb-3">
                        <input type="text" name="year" placeholder="Enter year" className="form-control" onChange={handleInputChange} value={values.year} />
                </div>
    
                <div className="mb-3">
                        <input type="text" name="duration" placeholder="Enter duration" className="form-control" onChange={handleInputChange} value={values.duration} />
                </div>
    
                <div className="mb-3">
                        <input type="text" name="quality" placeholder="Enter quality" className="form-control" onChange={handleInputChange} value={values.quality} />
                </div>
    
                <div className="mb-3">
                        <input type="text" name="language" placeholder="Enter language" className="form-control" onChange={handleInputChange} value={values.language} />
                </div>
    
                <div className="mb-3">
                        <input type="text" name="subtitles" placeholder="Enter subtitles" className="form-control" onChange={handleInputChange} value={values.subtitles} />
                </div>
    
                <div className="mb-3">
                        <input type="text" name="cast" placeholder="Enter cast" className="form-control" onChange={handleInputChange} value={values.cast} />
                </div>
    
                <div className="mb-3">
                        <input type="text" name="release_date" placeholder="Enter release date" className="form-control" onChange={handleInputChange} value={values.release_date} />
                </div>
                
                <div>
                    <button className="btn btn-primary" onClick={handleSubmit}>Update</button>
                </div>
    
                </div>
    
    
    
    
            </div>
            </>
        );
}

export default EditContent;