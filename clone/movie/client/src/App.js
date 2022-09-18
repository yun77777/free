import { Layout } from 'antd';
import React from 'react';
import MainImage from './components/views/MainImage/MainImage';

const { Header, Footer, Content } = Layout;

const App = () => (
  <>
    <Layout>
      <Header className="header">
        <MainImage/>
      </Header>
      <Content className="content">Content</Content>
      <Footer className="footer">Footer</Footer>
    </Layout>
  </>
);

export default App;