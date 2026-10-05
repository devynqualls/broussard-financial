import {useState} from 'react';

type Props = {videoId: string; title: string; duration: string};
export default function LearningVideo({videoId,title,duration}: Props) {
  const [loaded,setLoaded] = useState(false);
  return <figure className="learning-video">
    <div className="learning-video-frame">
      {loaded ? <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`} title={title} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/> :
        <button type="button" className="learning-video-preview" onClick={()=>setLoaded(true)} aria-label={`Watch ${title}, ${duration}`}>
          <span className="learning-video-play" aria-hidden="true">▶</span>
          <strong>{title}</strong><span>Watch the video · {duration}</span>
        </button>}
    </div>
    <figcaption><span>Video · {duration}</span> · <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">Watch on YouTube (new tab)</a></figcaption>
    <p className="tool-note">Select the preview to load the YouTube player, then press play. Loading the player connects to YouTube. AI-assisted educational video; individual circumstances vary.</p>
  </figure>;
}
