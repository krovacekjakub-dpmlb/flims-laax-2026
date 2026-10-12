import { LightboxProvider } from './components/Lightbox';
import { Nav } from './components/Nav';
import { Hero, Overview } from './components/Overview';
import { Transport } from './components/Transport';
import { Stays } from './components/Stays';
import { Trips } from './components/Trips';
import { Footer, Why } from './components/Why';

export default function App() {
  return (
    <LightboxProvider>
      <a className="skip" href="#prehled">Přeskočit na obsah</a>
      <Nav />
      <main>
        <Hero />
        <Overview />
        <Transport />
        <Stays />
        <Trips />
        <Why />
      </main>
      <Footer />
    </LightboxProvider>
  );
}
