import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { updateGenre , getGenre} from "../../services/genreService";
import { useNavigate } from "react-router-dom";

function EditGenre(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

        const fetchContent = useCallback(async() => {
            const response = await getGenre(id);
            setName(response.data.name);
            setDescription(response.data.description);
        },[id]);
        
        useEffect(()=>{ 
            fetchContent();
        },[fetchContent]);
    
        const handleNameChange = (event)=>{
            setName(event.target.value);
        };
        const handleDescChange = (event)=>{
            setDescription(event.target.value);
        };
    
        const handleSubmit = async()=>{
                console.log(name);
                console.log(description);
                const newGenre = {name, description};
                const response = await updateGenre(id, newGenre);
                console.log(response.data);
                setName("");
                setDescription("");
                //onAdd(response.data);
                navigate('/listGenre');
        };
    

    return(
        <>
        <h1>{id}</h1>
        <div className="row m-4" >
            <div  className="col-md-6">
            <h2>Edit Genre</h2>

            <div className="mb-3">
                    <input type="text" placeholder="Enter name" className="form-control" onChange={handleNameChange} value={name} />
            </div>

            <div className="mb-3">
                    <input type="text" placeholder="Enter description" className="form-control" onChange={handleDescChange} value={description} />
            </div>

            <div>
                <button className="btn btn-primary" onClick={handleSubmit}>Update</button>
            </div>

            </div>




        </div>
        </>
    );
}

export default EditGenre;