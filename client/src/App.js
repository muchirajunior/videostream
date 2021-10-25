import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Stream from "./videostream/stream";
import Home from "./zoomish/home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}  />
        <Route  exact path='/live' component={Stream}  />
      </Switch>
    </Router>
  )
}

export default App;
