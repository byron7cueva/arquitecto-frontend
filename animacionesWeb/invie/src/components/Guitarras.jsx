import React, {Component} from 'react';

class Guitarras extends Component {
  render() {
    return (
      <section id="guitarras" className="guitarras contenedor">
      <h2>Nuestra guitarras</h2>
      {
        this.props.guitarras.map((guitarra, guitarraIndex) => {
          return (
            <article className="guitarra" key={guitarraIndex}>
              <img className="guitarra-image" src={guitarra.img}  alt={guitarra.alt} width="350"/>
              <div className="contenedor-guitarra">
                <h3 className="guitarra-name">{guitarra.name}</h3>
                <ol>
                  {
                    guitarra.features.map((feature, featureIndex) => {
                      return (
                      <li key={featureIndex}>{feature}</li>
                      ) 
                    })
                  }
                </ol>
              </div>
            </article>
          )
        })
      }
    </section>
    );
  }
}

export default Guitarras;