type SearchResultProps = {
  address: string;
  distance: string;
};

function SearchResultComponent({ address, distance }: SearchResultProps) {
  return (
    <>
      {address && <h5>Address</h5>}
      <p>{address}</p>
      {distance && <h5>Distance to Heathrow airport</h5>}
      <p>{distance}</p>
    </>
  );
}

export default SearchResultComponent;
