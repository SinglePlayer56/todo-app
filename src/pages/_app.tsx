import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from '@next/font/google';
import {Provider} from "react-redux";
import {store} from "../../store";

const montserrat = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <Component className={montserrat.className} {...pageProps} />
      </Provider>
  )
}
