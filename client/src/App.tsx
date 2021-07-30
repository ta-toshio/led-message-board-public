import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import Top from './pages/top'

const App: React.FC = () => {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <div className="App">
      <Top />
    </div>
  );
}

export default App;
