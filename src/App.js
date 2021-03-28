import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PostDetails from './Components/PostDetails/PostDetails'
import Blogs from './Components/BlogPage/Blogs'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Blogs} />
        <Route path="/post/:postId" component={PostDetails} />
      </Switch>
    </Router>
  )
}

export default App
