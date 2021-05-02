type HistoryProps = {
  history: string[];
};

function HistoryComponent({ history }: HistoryProps) {
  return (
    <>
      {!history.length && <p>Your postal code search history is empty.</p>}
      <ul>
        {history.map((listitem, index) => (
          <li key={index}>{listitem}</li>
        ))}
      </ul>
    </>
  );
}

export default HistoryComponent;
