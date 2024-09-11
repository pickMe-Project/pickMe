export default function Footer() {
    return (
      <footer className="bg-white text-black py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-md font-nunito tracking-wide">
              &copy; {new Date().getFullYear()} pickMe! All rights reserved.
            </div>
            <div className="flex space-x-6 font-cousine text-md">
              <a href="#" className="hover:text-yellow-400 transition-colors duration-300 ease-in-out">Terms</a>
              <a href="#" className="hover:text-yellow-400 transition-colors duration-300 ease-in-out">Privacy</a>
              <a href="#" className="hover:text-yellow-400 transition-colors duration-300 ease-in-out">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  