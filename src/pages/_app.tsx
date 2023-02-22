import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from '@next/font/google';
import {Provider} from "react-redux";
import {wrapper} from "../../store";

const montserrat = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700'] });

export function App({ Component, ...rest }: AppProps) {
    const {store, props} = wrapper.useWrappedStore(rest);
  return (
      <Provider store={store}>
        <Component className={montserrat.className} {...props.pageProps} />
      </Provider>
  )
}

export default App;
