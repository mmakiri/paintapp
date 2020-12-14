import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class MyForm extends React.Component {
  render() {
    return (
      <form>
        <h1>Maalilaskuri</h1>
        <p>Maalin nimi:</p>
        <input
          type="text"
        />

        <p>Hinta (€/L)</p>
        <input
          type="text"
        />

        <p>Riittoisuus (m2/L)</p>
        <input
          type="text"
        />

        <p>Maalauskerrat</p>
        <input
          type="text"
        />
        <p></p>
        <input
          type='submit'
        />

        <h1>TO DO:</h1>
        <p>CSS tyylitys</p>
        <p>Aktuaalinen funktionaalisuus</p>
        <p>Laskuri joka ottaa arvot formista ja sitten näyttää tulokset</p>

      </form>
    );
  }
}
ReactDOM.render(<MyForm />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
