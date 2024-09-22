import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import styled from 'styled-components';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Widget = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
`;

const App = () => {
  const [layout, setLayout] = useState([
    { i: 'widget1', x: 0, y: 0, w: 2, h: 2 },
    { i: 'widget2', x: 2, y: 0, w: 2, h: 2 },
    { i: 'widget3', x: 4, y: 0, w: 2, h: 2 },
  ]);
  const [layouts, setLayouts] = useState({});
  const [currentProfile, setCurrentProfile] = useState('default');

  useEffect(() => {
    const savedLayouts = localStorage.getItem('savedLayouts');
    if (savedLayouts) {
      setLayouts(JSON.parse(savedLayouts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedLayouts', JSON.stringify(layouts));
  }, [layouts]);

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
    setLayouts(prevLayouts => ({
      ...prevLayouts,
      [currentProfile]: newLayout
    }));
  };

  const saveLayout = () => {
    const profileName = prompt('Enter a name for this layout profile:');
    if (profileName) {
      setLayouts(prevLayouts => ({
        ...prevLayouts,
        [profileName]: layout
      }));
      setCurrentProfile(profileName);
    }
  };

  const loadLayout = (profileName) => {
    if (layouts[profileName]) {
      setLayout(layouts[profileName]);
      setCurrentProfile(profileName);
    }
  };

  return (
    <div className="App">
      <h1>React Dashboard</h1>
      <select value={currentProfile} onChange={(e) => loadLayout(e.target.value)}>
        {Object.keys(layouts).map(profile => (
          <option key={profile} value={profile}>{profile}</option>
        ))}
      </select>
      <button onClick={saveLayout}>Save Current Layout</button>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={onLayoutChange}
      >
        <Widget key="widget1">Widget 1</Widget>
        <Widget key="widget2">Widget 2</Widget>
        <Widget key="widget3">Widget 3</Widget>
      </ResponsiveGridLayout>
    </div>
  );
};

export default App;

