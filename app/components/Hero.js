import TypedText from './TypedText'

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-8 md:px-16">
      <p
        className="anim-fade-up text-xs tracking-[0.25em] uppercase text-white/40 mb-6"
        style={{ animationDelay: '0.4s' }}
      >
        Product Designer · Bangkok
      </p>
      <h1
        className="anim-fade-up text-5xl md:text-6xl font-light leading-snug tracking-tight max-w-3xl"
        style={{ fontFamily: 'var(--font-sans)', animationDelay: '0.65s' }}
      >
        Aspiring to make<br />
        functional designs a little more{' '}
        <TypedText text="fun." delay={1400} speed={130} />
      </h1>
    </section>
  )
}
