import { useEffect, useState } from 'react';
import {
  Typography, Tag, Space, Button, Modal, Select, List, Spin,
} from 'antd';
import { getContent } from '../../services/movieService';
import { APP_URL, Token_name } from '../../constants/api_settings';
import { useParams } from 'react-router-dom';
import {
  HeartOutlined, PlusOutlined, PlayCircleOutlined, VideoCameraOutlined
} from '@ant-design/icons';
var authToken = localStorage.getItem(Token_name);

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const Watch = () => {
  const { id } = useParams(); // movie ID from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedSeason, setSelectedSeason] = useState(1);

  const isSeries = false;

  const handlePlayVideo = (url) => {
    setVideoUrl(url);
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setVideoUrl('');
  };

  const handleSeasonChange = (value) => {
    setSelectedSeason(value);
  };

  const fetchContent = async (id, token) => {
          try{
            const response = await getContent(id, token);
            setMovie(response.data);
            setLoading(false);
          }
          catch(err){
            console.log(err);
          }
        };

  useEffect(() => {
        authToken = localStorage.getItem(Token_name);
          fetchContent(id, authToken);
        }, [id]);
  if (loading) {
    return (
      <div className="watch-loading">
        <Spin size="large" tip="Loading movie..." />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="watch-error">
        <Title level={3} type="danger">Movie not found.</Title>
      </div>
    );
  }
console.log(movie);

    

  const handlePlay = () => {
    setIsModalVisible(true);
  };


  return (
    <div className="container-fluid bg-black text-white min-vh-100 d-flex flex-column flex-md-row p-0">
      {/* Poster */}
      <div className="col-12 col-md-6 p-0 position-relative" style={{ maxHeight: '100vh', overflow: 'hidden' }}>
        <img
          src={APP_URL + movie.poster}
          alt={movie.title}
          className="img-fluid h-100 w-100 object-fit-cover"
        />
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.1))' }} />

        {/* Play Full Button */}
        {!isSeries && (
          <Button
            type="primary"
            shape="circle"
            icon={<PlayCircleOutlined />}
            size="large"
            className="position-absolute top-50 start-50 translate-middle"
            onClick={() => handlePlayVideo(APP_URL + movie.video_file)}
            style={{ fontSize: '2rem', backgroundColor: 'rgba(255, 255, 255, 0.2)', border: 'none' }}
          />
        )}
      </div>

      {/* Details */}
      <div className="col-12 col-md-6 px-4 py-5" style={{ background: 'linear-gradient(to left, #000000, #111111)' }}>
        <Space direction="vertical" size="middle" style={{ maxWidth: '600px', width: '100%' }}>
          <Title level={1} style={{ color: '#fff', marginBottom: 0 }}>{movie.title}</Title>
          <div className="text-muted">
            {movie.year} • {movie.duration}
          </div>

          <div>
            {movie.genre_ID.map((genre) => (
              <Tag key={genre._id} color="volcano">{genre.name}</Tag>
            ))}
          </div>

          <Paragraph style={{ color: '#bbb' }}>
            {movie.description}
          </Paragraph>

          <Space wrap>
            <Button
              type="primary"
              icon={<VideoCameraOutlined />}
              ghost
              onClick={() => handlePlayVideo(APP_URL + movie.trailer)}
            >
              Watch Trailer
            </Button>

            <Button
              type="default"
              icon={<HeartOutlined />}
              ghost
            >
              Like
            </Button>

            <Button
              type="default"
              icon={<PlusOutlined />}
              ghost
            >
              Add to Watchlist
            </Button>
          </Space>

          {/* SERIES ONLY: Season/Episode Listing */}
          {isSeries && movie.seasons && (
            <>
              <div className="mt-4">
                <Title level={4} style={{ color: '#fff' }}>Seasons</Title>
                <Select
                  value={selectedSeason}
                  onChange={handleSeasonChange}
                  style={{ width: 200 }}
                >
                  {movie.seasons.map((season, index) => (
                    <Option key={index + 1} value={index + 1}>
                      Season {index + 1}
                    </Option>
                  ))}
                </Select>
              </div>

              <List
                itemLayout="horizontal"
                dataSource={movie.seasons[selectedSeason - 1].episodes}
                renderItem={episode => (
                  <List.Item
                    actions={[
                      <Button type="link" onClick={() => handlePlayVideo(APP_URL + episode.video)}>
                        <PlayCircleOutlined /> Play
                      </Button>
                    ]}
                    style={{ borderBottom: '1px solid #333', color: '#fff' }}
                  >
                    <List.Item.Meta
                      title={<span style={{ color: '#fff' }}>{episode.title}</span>}
                      description={<span style={{ color: '#aaa' }}>{episode.duration}</span>}
                    />
                  </List.Item>
                )}
              />
            </>
          )}
        </Space>
      </div>

      {/* Video Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleClose}
        footer={null}
        centered
        width={800}
        bodyStyle={{ padding: 0, backgroundColor: 'black' }}
      >
        <video
          controls
          autoPlay
          style={{ width: '100%' }}
          src={videoUrl}
        />
      </Modal>
    </div>
  );
};

export default Watch;
