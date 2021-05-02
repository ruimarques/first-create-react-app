import './App.css';
import { useState } from 'react';
import { getDistance } from 'geolib';
import 'bulma/css/bulma.min.css';
import HistoryComponent from './History';
import SearchComponent, { SearchResult } from './Search';
import SearchResultComponent from './SearchResult';

const DESTINATION_LAT = 51.4700223;
const DESTINATION_LONG = -0.4542955;

function App() {
  const [address, setAddress] = useState('');

  const [distance, setDistance] = useState('');

  const [history, setHistory] = useState([] as string[]);

  const buildAddress = (data: SearchResult) => {
    return `${data.parish} - ${data.region}, ${data.country}`;
  };

  const buildDistance = (data: SearchResult) => {
    const distanceKm =
      getDistance(
        { latitude: data.latitude, longitude: data.longitude },
        { latitude: DESTINATION_LAT, longitude: DESTINATION_LONG }
      ) / 1000;
    const distanceMiles = Math.round(distanceKm * 0.62137 * 100) / 100;

    return distanceKm + 'km or ' + distanceMiles + 'miles';
  };

  const updateHistory = (value: string) => {
    if (history.length > 2) {
      setHistory([value, ...history.slice(0, -1)]);
    } else {
      setHistory([value, ...history]);
    }
  };

  const handleSearch = (result: SearchResult) => {
    const address = buildAddress(result);

    const distance = buildDistance(result);

    setAddress(address);
    setDistance(distance);

    updateHistory(address + ` (${distance} to Heathrow) `);
  };

  const handleCancel = () => {
    setAddress('');
    setDistance('');
    setHistory([]);
  };

  return (
    <div className="App">
      <header className="hero is-info">
        <div className="hero-body">
          <h1 className="title"> Postlr </h1>
          <p className="subtitle">
            Your UK postal code <strong>assistant</strong>
          </p>
        </div>
      </header>
      <section className="section">
        <div className="tile is-ancestor">
          <div className="tile is-4 is-vertical is-parent">
            <div className="tile is-child box">
              <p className="title">Search</p>
              <p className="subtitle">Lookup UK postal code information</p>
              <SearchComponent
                onSearch={handleSearch}
                onCancel={handleCancel}
              />

              <section className="section">
                <div className="content">
                  <SearchResultComponent
                    address={address}
                    distance={distance}
                  />
                </div>
              </section>
            </div>
          </div>
          <div className="tile is-parent">
            <div className="tile is-child box">
              <p className="title">History</p>
              <div className="content">
                <HistoryComponent history={history} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
