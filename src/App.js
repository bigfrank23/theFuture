import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Footer from "./components/Footer/Footer";
import Posts from "./pages/posts/Posts";
import ProfilePage from "./pages/profilePage/ProfilePage";
import NavMenu from "./components/NavMenu/NavMenu";
import Post from "./pages/posts/post/Post";
import LivePage from "./pages/livePage/LivePage";
import ProfilePageUpdate from "./pages/profilePage/profilePageUpdate/ProfilePageUpdate";
import Auth from "./pages/auth/Auth";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Gallery from "./pages/gallery/Gallery";
import EditAccount from "./pages/settings/EditAccount";
import ScrollIndicator from "./components/scrollIndicator/ScrollIndicator";
import WelcomePage from "./pages/welcomePage/WelcomePage";


function App() {
  return (
    <div className="App">
      <Router>
      <NavMenu />
      <ScrollIndicator />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path={['/posts', '/general','/sport','/music', '/business','/travels', '/movies']} component={Posts} />
          <Route path='/post' component={Post} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/profile_update' component={ProfilePageUpdate} />
          <Route path='/live_page' component={LivePage} />
          <Route path={['/jan_gallery', '/feb_gallery', '/mar_gallery', '/apr_gallery','/may_gallery','/jun_gallery', '/jul_gallery', '/aug_gallery', '/sep_gallery', '/oct_gallery', '/nov_gallery', '/dec_gallery']} component={Gallery} />
          <Route path='/auth' component={Auth} />
          <Route path='/reset_password' component={ForgotPassword} />
          <Route path='/edit_account' component={EditAccount} />
          <Route path='/welcome_page' component={WelcomePage} />
        </Switch>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
