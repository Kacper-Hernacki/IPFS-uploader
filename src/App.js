import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <div className="container">
          <h1>IPFS uploader</h1>
          <form onSubmit={() => {}}>
            <label for="file-upload" class="custom-file-upload">
              Select File
            </label>
            <input id="file-upload" type="file" name="file" />
            <button className="button" type="submit">
              Upload file
            </button>
          </form>
        </div>

        <div className="data"></div>
      </div>
    </div>
  );
}

export default App;
