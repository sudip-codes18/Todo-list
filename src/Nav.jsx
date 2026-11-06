function Nav() {
  return (
    <nav className="p-4 sticky z-50 border flex justify-center">
      
      <div className="flex justify-center items-center gap-20 px-6 py-2 rounded-full bg-stone-900 text-white shadow-xl transition-all duration-300 ">
        <a href="#intro" className="hover:text-blue-400 hover:scale-110 transition-transform duration-300">
          Intro
        </a>
        <a href="#projects" className="hover:text-blue-400 hover:scale-110 transition-transform duration-300">
          Projects
        </a>
        <a href="#blog" className="hover:text-blue-400 hover:scale-110 transition-transform duration-300">
          Blog
        </a>
        <a href="#skills" className="hover:text-blue-400 hover:scale-110 transition-transform duration-300">
          Skills
        </a>
      </div>
    </nav>
  );
}

export default Nav;