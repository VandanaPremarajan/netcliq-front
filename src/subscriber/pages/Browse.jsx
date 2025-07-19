import Header from "../../components/browse/Header";
import { getAllContent } from "../../services/movieService";
import { Token_name } from "../../constants/api_settings";
import { useEffect, useState } from "react";
import CarouselBanner from "../../components/browse/CarouselBanner";
import MovieCardsCarousel from "../../components/browse/CardsCarousel";
import { Footer } from "antd/es/layout/layout";
var authToken = localStorage.getItem(Token_name);

const Browse = ({ setIsAuthenticated }) => {
  const [movies, setMovies] = useState([]);
  const fetchContent = async () => {
      try{
        console.log(authToken)
        const response = await getAllContent(authToken);
        console.log(response.data)
        setMovies(response.data);
      }
      catch(err){
        console.log(err);
      }
    };
    useEffect(() => {
      authToken = localStorage.getItem(Token_name);
        fetchContent();
      }, []);
  return (
    <div className="dark_bg">
      <Header setIsAuthenticated={setIsAuthenticated} />
      <CarouselBanner movies={movies}/>
      <MovieCardsCarousel movies={movies}/>
      <Footer className="footer">
          Netcliq ©{new Date().getFullYear()}
        </Footer>
    </div>
  );
};
export default Browse;
