import React, { useState } from "react";
import './App.css';

function App() {
  const [searchValue, setVal] = useState("");
  const [result, setResult] = useState({});

  // utils
  const fetchResults = async e => {
    e.preventDefault();
    // console.log(searchValue);
    try {
      const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${encodeURIComponent(searchValue)}`);
      const data = await response.json();
      console.log(data.query);
      setResult(data.query);
    } catch(err) {
      console.log(err);
      alert("Sorry something went wrong");
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <a href="https://wikipedia.com">
          <img src="https://en.wikipedia.org/static/images/project-logos/enwiki.png" className="logo" alt="logo" />
        </a>
        <form onSubmit={fetchResults}>
          <input type="text" placeholder="Search..." value={searchValue} onChange={(e) => setVal(e.target.value)}/>
        </form>
      </header>
      <div className="Results">
        {
          result.search ? <div>
            <div>About <b>{result.searchinfo.totalhits}</b> search results</div>
            {result.searchinfo.suggestion ? <div>Related Search - <b>{result.searchinfo.suggestion}</b></div> : null}
            <div>{result.search.map((i, idx) => <div key={idx}  className="resItem">
              <h3 className="title">
                <a href={`https://en.wikipedia.org/?curid=${i.pageid}`}>
                  {i.title}
                </a>
              </h3>
              <a href={`https://en.wikipedia.org/?curid=${i.pageid}`} className="result-link" target="_blank" rel="noreferrer">{`https://en.wikipedia.org/?curid=${i.pageid}`}</a>
              <span className="result-snippet" dangerouslySetInnerHTML={{__html: i.snippet}}></span><br></br>
            </div>)}</div>
            <a href="https://en.wikipedia.org">Powered By Wikipedia.</a>
          </div> : null
        }
      </div>
    </div>
  );
}

export default App;
