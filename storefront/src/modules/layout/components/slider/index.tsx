const Slider = () => {
  const brands = [
    "A-COLD-WALL",
    "Fear of God",
    "Off-White",
    "Maison Margiela",
    "Hender Scheme",
    "Rhude",
    "1017 ALYX 9SM",
    "Salomon",
    "Ambush",
    "Kiko Kostadinov",
    "No Vacancy Inn",
    "Rick Owens",
    "Y-3",
  ]

  return (
    <>
      <div className="bg-black relative overflow-hidden text-white py-1">
        <div
          className="flex items-center animate-[scroll-left_40s_linear_infinite]"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {brands.concat(brands).map((brand, index) => (
            <div key={index} className="flex items-center ">
              <span className="text-sm">{brand}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                focusable="false"
                className="w-3 h-3 fill-orange-500 mx-[0.438rem]"
              >
                <g fill="#44b865">
                  <path d="M240,128a15.79,15.79,0,0,1-10.5,15l-63.44,23.07L143,229.5a16,16,0,0,1-30,0L89.94,166.06,26.5,143a16,16,0,0,1,0-30L89.94,89.94,113,26.5a16,16,0,0,1,30,0l23.07,63.44L229.5,113A15.79,15.79,0,0,1,240,128Z"></path>
                </g>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Slider
