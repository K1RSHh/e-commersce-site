function Exploring() {
  const bgImageUrl = "/home/TECH-GAGDETS.jpg";
  return (
    <div
      className="relative h-130 max-w-312.5 flex rounded-2xl bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      <div className="absolute right-0 bottom-10">
        <div className="text-right mr-10">
          <p className="text-6xl md:text-7xl font-bold mb-8">Exploring</p>
          <p className="font-bold text-lg w-60 md:w-full">
            Your Source for Innovation, Insights, and Expertise
          </p>
        </div>
      </div>
    </div>
  );
}

export default Exploring;
