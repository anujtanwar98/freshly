import React from "react";
import Nav from "./src/components/Nav";

// only temporary use just to record screen
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Nav />
  );
}

export default App;