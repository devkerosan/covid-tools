import { Tabs } from 'antd';
import React from 'react';
import './App.css';
import DisplayJHUData from './DisplayJHUData';
import DisplaySurveyData from './DisplaySurveyData';
const { TabPane } = Tabs;

const App: React.FC = () => {
  return (
    <div className="App">
      <Tabs defaultActiveKey="1">
        <TabPane tab="IHME" key="1">
          <DisplaySurveyData />
        </TabPane>
        <TabPane tab="JHU" key="2">
          <DisplayJHUData />
        </TabPane>
      </Tabs>

    </div>
  );
}

export default App;
