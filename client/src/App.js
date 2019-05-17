import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import Dashboard from '../src/components/Dashboard';
import CreatePost from '../src/components/CreatePost';
import EditPost from '../src/components/EditPost';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
      
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/create" component= {CreatePost}/>
        <Route exact path="/edit/:id" component= {EditPost}/>
      </div>
    </Router>
  </Provider>
  );
}

export default App;
