import MarqueeLanding from "@/components/MarqueeLanding";
import AOSWrapper from "@/components/AosWrapper";
export default function Home() {

  return (
    <>
      <AOSWrapper>
        {/* Header */}
        <div className="flex justify-between">
          <div className="w-[80vh] h-screen flex items-center justify-center" data-aos="fade-right">
            <img
              className="w-[65vh] h-[93vh] object-cover"
              src="https://images.unsplash.com/photo-1593698054498-56898cbad8af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="1st image"
            />
          </div>
          <div className="w-1/2 h-screen mt-[30vh]" data-aos="fade-down">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-[3rem] italic font-black font-libre">Road to Rockstar!</h1>
              <img
                className="w-[80vh] h-[75vh] object-cover"
                src="https://images.unsplash.com/photo-1644280930023-aeb3df02f310?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="2nd image"
              />
            </div>
          </div>
          <div className="w-[60vh] h-screen flex items-start justify-end mt-[5vh]" data-aos="fade-left">
            <img
              className="w-[50vh] h-[90vh] object-cover"
              src="https://images.unsplash.com/photo-1593697972422-9d9cb386afd8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="3rd image"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex justify-start items-center px-[15vh]" data-aos="fade-up">
          <div className="w-[65%] h-[40vh]">
            <p className="text-xl font-normal font-cousine">
              pickMe! is your ultimate online destination for mastering the guitar with ease. Whether you're a beginner
              looking to strum your first chord or an experienced player aiming to perfect your skills, pickMe! offers an
              extensive library of guitar tabs and chords tailored for every level. With an intuitive interface, users can
              easily find songs, learn finger placements, and explore various styles. Join a community of passionate
              guitar learners, access expert-curated lessons, and elevate your guitar playing journey today with pickMe!
              where every chord is a step towards mastery.
            </p>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative" data-aos="fade-left">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
          <MarqueeLanding />
        </div>
      </AOSWrapper>
    </>
  );
}
