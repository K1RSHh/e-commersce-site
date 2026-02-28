function BestSeller() {
  const firstImg = "/home/aperture-black-and-white-camera-camera-lens.jpg";

  const secondImg =
    "/home/gde-v-ukraine-vygodno-kupit-naushniki-s-keshbekom-do-20-01-usap.jpg";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 md:grid-rows-1 gap-4 bg-no-repeat">
      <div
        className="md:w-100 w-95 h-65 bg-cover rounded-2xl p-6 text-white text-left "
        style={{ backgroundImage: `url(${firstImg})` }}
      >
        <p className="text-xl mb-2">Best Seller</p>
        <p className="text-4xl mb-2">Camera</p>
        <button className="bg-white p-3 text-black rounded-md cursor-pointer">
          Button
        </button>
      </div>
      <div
        className="col-span-2 bg-cover bg-center rounded-2xl p-6 text-white text-left"
        style={{ backgroundImage: `url(${secondImg})` }}
      >
        <p className="text-xl mb-2">Best Seller</p>
        <p className="text-4xl mb-2">Headphones</p>
        <button className="bg-white p-3 text-black rounded-md cursor-pointer">
          Button
        </button>
      </div>
    </div>
  );
}

export default BestSeller;
