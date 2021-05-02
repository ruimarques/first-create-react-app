import classNames from 'classnames';
import { useState } from 'react';

export interface SearchResult {
  admin_county: string;
  admin_district: string;
  admin_ward: string;
  country: string;
  region: string;
  parish: string;
  nuts: string;
  latitude: number;
  longitude: number;
}

type SearchProps = {
  onSearch: (a: SearchResult) => void;
  onCancel: () => void;
};

function SearchComponent({ onSearch, onCancel }: SearchProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (input: string) => {
    if (!input) {
      return;
    }

    setLoading(true);

    fetch(`http://api.postcodes.io/postcodes/${input}`)
      .then((data) => data.json())
      .then(
        (data: { status: number; result: SearchResult; error?: string }) => {
          if (data.status === 200) {
            onSearch(data.result);
          } else {
            alert(
              `An error occured while retrieving the postal code '${input}': "${data.error}"`
            );
          }

          setLoading(false);
        }
      );
  };

  return (
    <>
      <div className="field">
        <input
          className="input"
          type="text"
          placeholder="Postal Code"
          value={input}
          onInput={(e) => setInput(e.currentTarget.value)}
        ></input>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            onClick={() => handleSearch(input)}
            className={classNames({
              button: true,
              'is-info': true,
              'is-small': true,
              'is-outlined': true,
              'is-loading': loading,
            })}
          >
            Search
          </button>
        </div>
        <div className="control">
          <button onClick={() => onCancel()} className="button is-small">
            Clear
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchComponent;
