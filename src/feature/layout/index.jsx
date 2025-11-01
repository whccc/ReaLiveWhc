const Layout = ({ children }) => {
  return (
    <div>
      {children}
      <footer className="bg-gradient-to-r from-slate-800 via-gray-900 to-slate-800 border-t border-white/20 shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/5 to-indigo-900/10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-b-full opacity-60"></div>

        <div className="flex items-center justify-center gap-3 text-gray-300 text-base relative z-10">
          <span className="font-medium">Desarrollado con ❤️ por</span>
          <a
            href="https://www.linkedin.com/in/wilson-herney-castro-cabrera-73560a19a/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-5 py-3 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:scale-110 hover:rotate-1 border border-blue-500/30 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

            <svg
              className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>

            <div className="flex flex-col">
              <span className="text-white font-bold text-sm">
                Wilson Herney Castro Cabrera
              </span>
              <span className="text-blue-200 text-xs font-medium">
                Full Stack Developer
              </span>
            </div>

            <svg
              className="w-4 h-4 text-white opacity-70 group-hover:opacity-100 transform group-hover:translate-x-1 group-hover:scale-125 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
