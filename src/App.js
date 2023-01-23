import "./App.css";
import Banner from "./components/Banner";
import Rows from "./components/Rows";
import requests from "./utils/requests";

function App() {
  return (
    <div className="App bg-stone-900 h-full">
      {/* NAV */}
      {/* BANNER */}
      <Banner />
      {/* ROWS*/}
      <Rows moviescategory={"Trending"} fetchUrl={requests.fetchTrending} />
      <Rows moviescategory={"Top Rated"} fetchUrl={requests.fetchTopRated} />
      <Rows
        moviescategory={"Netflix Originals"}
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Rows
        moviescategory={"Documentaries"}
        fetchUrl={requests.fetchDocumentaries}
      />
      <Rows
        moviescategory={"Action Movies"}
        fetchUrl={requests.fetchActionMovies}
      />
      <Rows
        moviescategory={"Commedies"}
        fetchUrl={requests.fetchComedyMovies}
      />
      <Rows
        moviescategory={"Horror Movies"}
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Rows moviescategory={"Romance"} fetchUrl={requests.fetchRomanceMovies} />
    </div>
  );
}

export default App;
