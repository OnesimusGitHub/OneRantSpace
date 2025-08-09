import {useRants} from '../rants/useRants';
import { useState, useEffect } from 'react';
import { RefreshCwIcon } from 'lucide-react';
import AdminPagination from '../components/AdminPagination';
import ReactPlayer from 'react-player';
import AddRantForm from '../components/AddRantForm';
import { PlusCircleIcon } from 'lucide-react';
function AdminRantSection() {
    const {rants, loading, error, fetchRants, resetFormData} = useRants();
    const [hoveredVideo, setHoveredVideo] = useState(null);
    const [playerInstance, setPlayerInstance] = useState(null);
    const [isVideoMuted, setIsVideoMuted] = useState(true);

    useEffect(() => {
        fetchRants();
    },[fetchRants])

    useEffect(() => {
        setIsVideoMuted(true);
    }, [hoveredVideo]);


    const getYouTubeVideoId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
        return match ? match[1] : null;
    };

    const videoId = getYouTubeVideoId(hoveredVideo);

    const toggleVideoAudio = () => {
        if (isVideoMuted) {
       
            const iframe = document.querySelector('iframe[title="Background Video"]');
            if (iframe) {
            
                iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                setIsVideoMuted(false);
            }
        } else {
        
            const iframe = document.querySelector('iframe[title="Background Video"]');
            if (iframe) {
                iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
                setIsVideoMuted(true);
            }
        }
    };

    return (
        <section className="min-h-screen py-20 px-5 sm:px-10 relative">
            
            {hoveredVideo && videoId && (
                <div className='fixed inset-0 z-0'>
                    
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            border: 'none'
                        }}
                        allow="autoplay; encrypted-media"
                        title="Background Video"
                        onLoad={() => {
                     
                            setTimeout(() => {
                                const iframe = document.querySelector('iframe[title="Background Video"]');
                                if (iframe) {
                                    iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                                }
                            }, 1000);
                        }}
                    />
                    <div className='absolute inset-0 bg-black/70 z-10'/>
                    
                   
                    <div className='absolute top-5 right-5 z-20'>
                        <button
                            onClick={toggleVideoAudio}
                            className='bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200'
                            title={isVideoMuted ? 'Unmute Video' : 'Mute Video'}
                        >
                            {isVideoMuted ? (
                              
                                <svg className='w-6 h-6' fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                                </svg>
                            ) : (
                              
                                <svg className='w-6 h-6' fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            )}
            
           
            {hoveredVideo && !videoId && (
                <div className='fixed inset-0 z-0'>
                    <ReactPlayer
                        url={hoveredVideo}
                        playing={true}
                        loop={true}
                        muted={false}
                        width="100vw"
                        height="100vh"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}
                        config={{
                            youtube: {
                                playerVars: {
                                    autoplay: 1,
                                    controls: 0,
                                    disablekb: 1,
                                    fs: 0,
                                    modestbranding: 1,
                                    rel: 0,
                                    mute: 1,
                                    playsinline: 1,
                                    iv_load_policy: 3,
                                    showinfo: 0,
                                    start: 0,
                                    enablejsapi: 1
                                }
                            }
                        }}
                        onReady={(player) => {
                            setPlayerInstance(player);
                            
                          
                            setTimeout(() => {
                                try {
                                  
                                    player.seekTo(0);
                                    
                                    
                                    const youtubePlayer = player.getInternalPlayer();
                                    if (youtubePlayer && youtubePlayer.playVideo) {
                                        youtubePlayer.mute();
                                        youtubePlayer.playVideo();
                                    }
                                } catch (err) {
                                  
                                }
                            }, 500);
                        }}
                        onStart={() => {
                            
                        }}
                        onError={(error) => {
                           
                        }}
                        onPlay={() => {
                            
                        }}
                    />
                    <div className='absolute inset-0 bg-black/70 z-10'/>
                </div>
            )}

            <div className='max-w-7xl mx-auto relative z-10'>
              
                <div className='flex justify-between items-center mb-12'>
                    <button 
                        className=' flex items-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 transition-colors duration-200' 
                        onClick={() => {
                            resetFormData(); // Clear any existing form data
                            document.getElementById('add_rant_modal').showModal();
                        }}
                    >
                        <PlusCircleIcon className='size-5 mr-2' />
                        Add Rant
                    </button>
                    <button 
                        className='bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-3 transition-colors duration-200' 
                        onClick={fetchRants}
                    >
                        <RefreshCwIcon className='w-5 h-5 text-white' />
                    </button>
                </div>

                <AddRantForm />
   
                {error && (
                    <div className='bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-8'>
                        {error}
                    </div>
                )}

              
                {loading ? (
                    <div className='flex justify-center items-center h-64'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white'></div>
                    </div>
                ) : (
                    
                    <AdminPagination rants={rants} onHoverVideo={setHoveredVideo}/>
                )}
            </div>
        </section>
    )
}

export default AdminRantSection;