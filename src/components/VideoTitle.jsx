const VideoTitle = ({ title, overview }) => {
    return (
      <div className="w-screen aspect-video pt-[20%] px-4 md:px-24 lg:px-32 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold">{title}</h1>
        <div className="py-6 text-base md:text-lg lg:text-xl w-full md:w-auto lg:w-1/3 md:flex md:flex-row">
          <p className="w-full md:w-auto md:mr-4">{overview}</p>
        </div>
        <div className="flex flex-col md:flex-row">
          <button className="bg-white text-black p-2 px-6 md:px-8 lg:px-10 text-lg md:text-xl lg:text-2xl rounded-lg hover:bg-opacity-80 mb-2 md:mb-0">
            <i className="fa-solid fa-play"></i> Play
          </button>
          <button className="mx-0 md:mx-2 lg:mx-4 bg-gray-500 text-white p-2 px-6 md:px-8 lg:px-10 text-lg md:text-xl lg:text-2xl bg-opacity-50 rounded-lg">
            <i className="fa-solid fa-exclamation"></i> More Info
          </button>
        </div>
      </div>
    );
  };
  export default VideoTitle;
  