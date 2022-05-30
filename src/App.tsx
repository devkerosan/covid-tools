import { Tabs } from 'antd';
import React from 'react';
import './App.css';
import DisplayJHUData from './DisplayJHUData';
import DisplaySurveyData from './DisplaySurveyData';
const { TabPane } = Tabs;

const App: React.FC = () => {
  return (
    <div className="App">
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="海外アンケート" key="1">
          <DisplaySurveyData />
        </TabPane>
        <TabPane tab="諸外国の感染状況" key="2">
          <DisplayJHUData />
        </TabPane>
      </Tabs>

    </div>
  );
}

export default App;
