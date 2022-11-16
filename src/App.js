import "./App.css";
import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

function App() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const files = form[0].files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await ipfs.add(file);

    setUploadedImages([
      ...uploadedImages,
      {
        cid: result.cid,
        path: result.path,
      },
    ]);

    form.reset();
  };

  return (
    <div className="app">
      <div className="app__container">
        {ipfs ? (
          <div className="container">
            <h1>IPFS uploader</h1>
            <form onSubmit={onSubmitHandler}>
              <label for="file-upload" class="custom-file-upload">
                Select File
              </label>
              <input id="file-upload" type="file" name="file" />
              <button className="button" type="submit">
                Upload file
              </button>
            </form>
          </div>
        ) : null}
        <div className="data">
          {uploadedImages.map((image, index) => (
            <>
              <img
                className="image"
                alt={`Uploaded #${index + 1}`}
                src={"https://skywalker.infura-ipfs.io/ipfs/" + image.path}
                style={{ maxWidth: "400px", margin: "15px" }}
                key={image.cid.toString() + index}
              />
              <h4>Link to IPFS:</h4>
              <a href={"https://skywalker.infura-ipfs.io/ipfs/" + image.path}>
                <h3>{"https://skywalker.infura-ipfs.io/ipfs/" + image.path}</h3>
              </a>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
