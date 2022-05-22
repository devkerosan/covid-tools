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
        <TabPane tab="海外アンケート" key="1">
          <DisplaySurveyData />
        </TabPane>
        <TabPane tab="海外の新規陽性者数" key="2">
          <DisplayJHUData />
        </TabPane>
      </Tabs>

    </div>
  );
}

export default App;
