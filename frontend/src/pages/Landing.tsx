import TopAppBar from "@/components/TopAppBar";

const Landing = () => {
  return (
    <div className="bg-[#dcdde1] min-h-screen px-5 py-6 font-sans">
      {/* Top App Bar */}
      <TopAppBar />

      {/* Hero Section */}
      <div className="text-6xl font-black leading-tight mb-10">
        WELCOME TO THE WORLD OF
        <br />
        ANIME MADNESS
      </div>

      <div className="grid grid-cols-3 gap-6 justify-between">
        {/* Left Image */}
        <div>
          <img
            src="./fireBoy.png"
            alt="Anime Fire Character"
            className="rounded-xl shadow-xl"
          />
        </div>

        {/* Right Image */}
        <div>
          <img
            src="./goldBoy.png"
            alt="Anime Lightning Character"
            className="rounded-xl shadow-xl"
          />
        </div>

        {/* Info Card */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Vote for Your Favorite Anime
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Ever wondered who the top anime characters, songs, or series
              really are? Now’s your chance to decide!
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Sign up for free and explore epic anime competitions that fuel
              your passion. From legendary moments to trending battles — your
              vote matters!
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Join us to participate in exciting debates, discover top-tier
              content, and help crown the true icons of anime culture.
            </p>
          </div>

          <div className="flex items-center justify-between">
            {/* Social icons */}
            <div className="flex gap-3">
              <a href="#">
                <img src="/icons/twitter.svg" alt="Twitter" className="h-6" />
              </a>
              <a href="#">
                <img src="/icons/youtube.svg" alt="YouTube" className="h-6" />
              </a>
              <a href="#">
                <img
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  className="h-6"
                />
              </a>
            </div>

            <button className="bg-black text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition">
              Let's go <span className="text-purple-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
