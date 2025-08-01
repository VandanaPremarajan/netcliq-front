// import { APP_URL } from '../../constants/api_settings';

// const CarouselBanner = ({ movies }) => {
//   return (
//     <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
//       <div className="carousel-inner">
//         {movies.map((movie, idx) => (
//           <div
//             className={`carousel-item ${idx === 0 ? 'active' : ''}`}
//             key={movie._id}
//           >
//             <div className="position-relative" style={{ height: '92vh', overflow: 'hidden' }}>
//               <img
//                 src={APP_URL+movie.poster}
//                 className="d-block w-100"
//                 alt={movie.title}
//                 style={{ objectFit: 'cover', height: '100%' }}
//               />
//               <div
//                 className="carousel-caption d-none d-md-block text-start"
//                 style={{
//                   background: 'rgba(0,0,0,0.6)',
//                   padding: '20px',
//                   borderRadius: '10px',
//                   maxWidth: '600px',
//                 }}
//               >
//                 <h2>{movie.title}</h2>
//                 <p>{movie.description}</p>
//                 <div className="mt-3">
//                   <button className="btn btn-danger me-2">▶ Play</button>
//                   <button className="btn btn-light">More Info</button>
//                 </div>
//                 <p className="mt-2 small text-muted">
//                   {movie.year} • {movie.duration} • {movie.quality}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
//         <span className="carousel-control-prev-icon" />
//         <span className="visually-hidden">Previous</span>
//       </button>
//       <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
//         <span className="carousel-control-next-icon" />
//         <span className="visually-hidden">Next</span>
//       </button>
//     </div>
//   );
// };

// export default CarouselBanner;

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import './css/CarouselBanner.css';
import { APP_URL } from '../../constants/api_settings';
import { useNavigate } from 'react-router-dom';

const CarouselBanner = ({ movies }) => {
  const navigate = useNavigate();
  const handleWatch = (id) => {
    navigate('/subscriber/watch/'+id);
  }
  return (
    <div className="carousel-wrapper">
      <div className="gradient-left"></div>
      <Swiper
        modules={[EffectFade, Autoplay, Navigation]}
        effect="fade"
        navigation
        loop
        autoplay={{ delay: 5000 }}
        className="fullscreen-swiper"
      >
        {movies.map(movie => (
          <SwiperSlide key={movie._id}>
            <div
              className="slide-background"
              style={{ backgroundImage: `url(${APP_URL+movie.poster})` }}
            >
              <div className="overlay">
                <h1>{movie.title}</h1>
                <p>{movie.description}</p>
                <button onClick={() => handleWatch(movie._id)}>Watch Now</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="gradient-right"></div>
    </div>
  );
};

export default CarouselBanner;

