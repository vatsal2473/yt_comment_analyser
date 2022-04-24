import { useState } from 'react';
import Lottie from 'react-lottie';
import axios from 'axios';
import '../styles/home.css';
import Card from '../components/Card';
import States from '../components/States';
import load from '../assets/loading.json';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  const [link, setLink] = useState(null);
  const [id, setId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const l = getId(link);
        setId(l);
        const res = await axios.get(`http://127.0.0.1:5000/${l}`);
        console.log(res);
        setData(res.data);
        setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setLink(e.target.value);
  };

  function getId(url) {
    let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    return regex.exec(url)[3];
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: load,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className='home_page'>
      <div className='page_info'>
        <h2>You Tuber</h2>
        <h3>Find Your Real Audience</h3>
      </div>

      <div className='searchbar_cont'>
        <form onSubmit={handleSubmit} className='searchbar'>
          <input
            placeholder='Past your link here'
            type='text'
            name='text'
            onChange={handleChange}
          />
          <button type='submit' name='submit'>
            <img src={require('../assets/search.png')} alt='' />
          </button>
        </form>
      </div>

      {id ? (
        <div className='video_cont'>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameborder='0'
            allow='autoplay; encrypted-media'
            allowFullscreen
            title='video'
          />
        </div>
      ) : null}

      {!loading && data ? (
        <States data={data} />
      ) : loading ? (
        <div>
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            isStopped={false}
            isPaused={false}
          />
        </div>
      ) : (
        <div> We Help You Find Your Real Audience </div>
      )}

      <button className='graph_btn' onClick={() => setShowGraph(!showGraph)}>
        Show Analysis
      </button>

      {showGraph ? (
        <>
          <h2 className='sec_title'>Visual Representation</h2>
          <div className='graph_states'>
            <Card>
              <img
                src='https://github-readme-stats.vercel.app/api/top-langs/?username=mohit9486'
                alt='Most used Languages svg'
                className='lng_card'
              />
            </Card>
            <Card>
              <img
                src='https://github-readme-stats.vercel.app/api?username=mohit9486&count_private=true&show_icons=true&include_all_commits=true'
                alt='Profile State svg'
                className='state_card'
              />
            </Card>
          </div>
        </>
      ) : null}

      <div className='work_info'>
        <h2>We are Team Tensors</h2>
        <h3>@IIIT Lucknow</h3>
      </div>
    </div>
  );
}
