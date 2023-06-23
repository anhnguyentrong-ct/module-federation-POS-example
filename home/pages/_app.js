import App from 'next/app';
import Nav from '../components/nav';
import store from '../../home/store/storeToolkit'
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Provider store={store}>
      <Nav />
      <Component {...pageProps} />
      </Provider>
    </>
  );
}

MyApp.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};
export default MyApp;
