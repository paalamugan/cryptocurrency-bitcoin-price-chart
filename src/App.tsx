import { Header } from './components/Header';
import CoinMarketCard from './components/CoinMarketCard';
import { Footer } from './components/Footer';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="wrapper-container full-bleed bg-gray-100 py-10">
        <CoinMarketCard />
      </main>
      <Footer />
    </div>
  );
};

export default App;
