import Header from '../components/common/header';
import Footer from '../components/common/footer';
import Head from 'next/head';
import {Layout} from 'antd';
import stylesheet from '../static/styles/main.scss';
import Nav from '../components/common/nav'

const {Content} = Layout;
const BaseLayout = (props) => (
  <div>
    <Head>
      <meta name="theme-color" content="#0000ff"/>
      <title>{props.title}</title>
      <meta charSet='utf-8'/>
      <meta name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
      <link href="//fonts.googleapis.com/css?family=Open+Sans:400,600,700" rel="stylesheet"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous"/>
      <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
    </Head>
    <Content>
      <Header/>
      <div>
        {props.children}
      </div>
    </Content>
  </div>
);

export default BaseLayout
