export default function Navbar() {
  return (
    <nav className="anim-fade-down fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 h-16 border-b border-white/10"
      style={{background: 'rgba(14,12,10,0.85)', backdropFilter: 'blur(12px)', animationDelay: '0.1s'}}>
      <a href="/" className="text-white text-sm font-medium tracking-wide hover:opacity-70 transition-opacity">
        Randy Dawn Tai
      </a>
      <ul className="flex items-center gap-10 list-none">
        <li><a href="/"        className="text-white/60 text-sm hover:text-white transition-colors">Home</a></li>
        <li><a href="/#work"   className="text-white/60 text-sm hover:text-white transition-colors">Works</a></li>
        <li><a href="/#about"  className="text-white/60 text-sm hover:text-white transition-colors">About</a></li>
        <li><a href="/#contact" className="text-white/60 text-sm hover:text-white transition-colors">Contact</a></li>
      </ul>
    </nav>
  )
}
