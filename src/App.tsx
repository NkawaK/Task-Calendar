import React from "react";

import { FirebaseAuth, signInWithGoogle, signInWithTwitter } from "./FirebaseAuth";
import TaskCalender from "./pages/TaskCalendar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const NotSignedIn = React.useCallback(() => {
    return (
      <div>
        <Header />
        <div className="signin">
          <div className="signin_head">
            <span className="signin_head_title">
              Sign in
            </span>
            <div className="google_title">
              <span>G</span>
              <span>o</span>
              <span>o</span>
              <span>g</span>
              <span>l</span>
              <span>e</span>
            </div>
            <div className="login_button" onClick={() => signInWithGoogle()}>
              <img src={"./btn_google_light_normal_ios.svg"} alt="logo"/>
              <span>Sign in with Google</span>
            </div>
            <div className="twitter_title">
              Twitter
            </div>
            <div className="login_button" onClick={() => signInWithTwitter()}>
              <img src={"./Twitter_Logo_Blue.svg"} alt="logo" width="46px" height="46px"/>
              <span>Sign in with Twitter</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }, []);

  const Loading = React.useCallback(() => {
    return <div>loading now...</div>
  }, []);

  return (
    <FirebaseAuth NotSignedIn={NotSignedIn} Loading={Loading}>
      <Header />
      <TaskCalender />
      <Footer />
    </FirebaseAuth>
  );
};

export default App;