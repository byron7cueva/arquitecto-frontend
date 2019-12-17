import React, {Component} from 'react';
import './css/Invie.css';
import Portada from './components/Portada';
import Guitarras from './components/Guitarras';
import Footer from './components/Footer';

import logo from './images/invie.png';
import acustic from './images/invie-acustica.png';
import classic from './images/invie-classic.png';

const data = {
  logo: logo,
  menu: [
    {
      href: 'index.html',
      title: 'Home'
    },
    {
      href: '#guitarras',
      title: 'Guitarras'
    },
    {
      href: 'precios.html',
      title: 'Precios'
    }
  ],
  guitarras: [
    {
      img: acustic,
      alt: 'Guitarra Invie Acustica',
      name: 'Invie Acustica',
      features: [
        'Estilo vintage',
        'Madera pura',
        'Incluye estuche invisible de aluminio'
      ]
    },
    {
      img: classic,
      alt: 'Guitarra Invie Classic',
      name: 'Invie Classic',
      features: [
        'Estilo vintage',
        'Liviana',
        'Inicia tu camino como Rockstar'
      ]
    }
  ]
};

class App extends Component {
  render() {
    return (
      <section>
        <Portada logo={data.logo} menu={data.menu} />
        <Guitarras guitarras={data.guitarras} />
        <Footer/>
      </section>
    );
  }
}

export default App;
