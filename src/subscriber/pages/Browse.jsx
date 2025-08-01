// import Header from "../../components/browse/Header";
import { getLatestContent } from "../../services/movieService";
import { Token_name } from "../../constants/api_settings";
import { useEffect, useState } from "react";
import CarouselBanner from "../../components/browse/CarouselBanner";
import MovieCardsCarousel from "../../components/browse/CardsCarousel";
import { Footer } from "antd/es/layout/layout";
var authToken = localStorage.getItem(Token_name);

const Browse = () => {
  // const [movies, setMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const fetchContent = async () => {
      // try{
      //   const response = await getAllContent(authToken);
      //   setMovies(response.data);
      // }
      // catch(err){
      //   console.log(err);
      // }
      try{
        const response = await getLatestContent(authToken);
        setLatestMovies(response.data);
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
      <CarouselBanner movies={latestMovies}/>
      <MovieCardsCarousel movies={latestMovies}/>
      <Footer className="footer">
          Netcliq ©{new Date().getFullYear()}
        </Footer>
    </div>
  );
};
export default Browse;
