import { useRef, useState } from "react";
const Api_key = 'your openweather apikey hear';

function WeatherApi() {

  const inputRef = useRef(null);
  const [ApiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setloading] = useState(false);

  const weatherType = [
    {
      "type": "Thunderstorm",
      "img": "https://www.weatherbit.io/static/img/icons/t01d.png"
    },
    {
      "type": "Drizzle",
      "img": "https://www.weatherbit.io/static/img/icons/r01d.png"
    },
    {
      "type": "Rain",
      "img": "https://www.weatherbit.io/static/img/icons/r04d.png"
    },
    {
      "type": "Snow",
      "img": "https://www.weatherbit.io/static/img/icons/s01d.png"
    },
    {
      "type": "Mist",
      "img": "https://www.weatherbit.io/static/img/icons/f01d.png"
    },
    {
      "type": "Smoke",
      "img": "https://www.weatherbit.io/static/img/icons/f01d.png"
    },
    {
      "type": "Haze",
      "img": "https://www.weatherbit.io/static/img/icons/f01d.png"
    },
    {
      "type": "Dust",
      "img": "https://www.weatherbit.io/static/img/icons/f01d.png"
    },
    {
      "type": "Fog",
      "img": "https://www.weatherbit.io/static/img/icons/f01d.png"
    },
    {
      "type": "Sand",
      "img": "https://www.weatherbit.io/static/img/icons/f01d.png"
    },
    {
      "type": "Ash",
      "img": "https://www.weatherbit.io/static/img/icons/f01d.png"
    },
    {
      "type": "Squall",
      "img": "https://www.weatherbit.io/static/img/icons/f01d.png"
    },
    {
      "type": "Tornado",
      "img": "https://www.weatherbit.io/static/img/icons/f01d.png"
    },
    {
      "type": "Clear",
      "img": "https://www.weatherbit.io/static/img/icons/c01d.png"
    },
    {
      "type": "Clouds",
      "img": "https://www.weatherbit.io/static/img/icons/c03d.png"
    }
  ];




  const fatchWeather = async () => {

    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&APPID=${Api_key}`;

    setloading(true)
    fetch(URL).then((res) => res.json())
      .then((data) => {
        //console.log(data, '--data');
        setApiData(null);

        if (data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "not found",
              img: "https://cdn-icons-png.flaticon.com/512/3585/3585596.png",
            }
          ]);
        }
        setShowWeather(
          weatherType.filter((weather) => weather.type === data.weather[0].main)
        )
        setApiData(data)
        setloading(false)
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setloading(false)
      })
  }

  return (
    <>
      <div className="bg-gray-500 h-screen grid place-items-center">

        <div className="bg-white w-96 p-4 rounded-md ">

          <div className="flex items-center justify-between">

            <input
              type="text"
              ref={inputRef}
              placeholder="Enter your location..."
              className="text-xl border-b p-1 border-gray-200 font-semibold uppercase flex-1" />

            <button onClick={fatchWeather}>
              <img src="https://cdn.pixabay.com/photo/2021/09/06/22/42/touch-6602643_1280.png" alt="logp" className="w-12 ring-black" />


            </button>

          </div>
          <div className={` duration-300 delay-75 overflow-hidden ${showWeather} ? "h-[24rem]": h-0" `}>
            {
              loading ? (
                <div className="grid place-items-center h-full">
                  <img src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png" alt="" className="w-14 mx-auto animate-spin" />

                </div>
              ) : (


                showWeather && (
                  <div className="text-center flex flex-col gap-6 mt-10">

                    {
                      ApiData && (<p className="text-xl font-semibold">{ApiData?.name} , {ApiData?.sys.country}</p>
                      )}
                    <img src={showWeather[0]?.img} alt="..." className="w-52 mx-auto" />
                    <h3 className="text-2xl font-bold text-zinc-800">
                      {showWeather[0]?.type}

                    </h3>
                    <div className="flex justify-center">
                      <img src="https://www.shutterstock.com/image-vector/temperature-level-heat-levels-icon-260nw-462657802.jpg" alt="..." className="h-9 mt-1" />

                      <h2 className="text-4xl font-extrabold">{ApiData?.main?.temp} &#176;c</h2>
                    </div>
                  </div>


                )

              )
            }

          </div>

        </div>
      </div>


    </>
  )

}

export default WeatherApi;
