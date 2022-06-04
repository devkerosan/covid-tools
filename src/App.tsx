import { UserOutlined } from '@ant-design/icons';
import { Menu, MenuProps, Tabs } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { useState } from 'react';
import './App.css';
import DisplayJHUData from './DisplayJHUData';
import DisplayMHLWWeeklyData from './DisplayMHLWWeeklyCases';
import DisplayNYCData from './DisplayNYCData';
import DisplaySurveyData from './DisplaySurveyData';

const items: MenuProps['items'] = [
  "ニューヨーク感染状況",
  "諸外国の感染状況(β版)",
  "諸外国アンケート(β版)",
  "年代別・都道府県別感染状況",
].map((icon, index) => ({
  key: String(index + 1),
  label: `${icon}`,
}));

const App: React.FC = () => {
  const [menu, setMenu] = useState<string>("1")
  const handleMenuClick = (e: any) => {
    setMenu(e.key);
  }
  return (
    <div className="App">
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}>
          <div>Covid-19 Tools</div>
          <Menu theme="dark" mode="inline" items={items} onClick={handleMenuClick}></Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content>
            <DisplayNYCData display={menu === "1" ? "block" : "none"} />
            <DisplayJHUData display={menu === "2" ? "block" : "none"} />
            <DisplaySurveyData display={menu === "3" ? "block" : "none"} />
            <DisplayMHLWWeeklyData display={menu === "4" ? "block" : "none"} />
          </Content>
        </Layout>
      </Layout>


    </div>
  );
}

export default App;
