import React, { useState, useEffect, useMemo } from "react";

const PoliticCard = React.memo(({name, image, position, biography}) => {
  return (
    <div className="card">
      <div><img className="img-politico" src={image} alt={name} /></div>
      <div>
        <h3>Nome: {name}</h3>
        <p>Posizione: {position}</p>
        <p>Breve biografia: {biography}</p>
      </div>
    </div>
  );
});


function App() {

  const [politici, setPolitici] = useState([]);

  const [cerca, setCerca] = useState('');

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
    .then(res => res.json())
    .then(data => setPolitici(data))
    .catch(error => console.log(error))
  }, []);

  console.log(politici);

  const filtraPolitici = useMemo(() => {
    return politici.filter(politico => {
      const nomePolitico = politico.name.toLowerCase().includes(cerca.toLowerCase());
      const biographyPolitico = politico.biography.toLowerCase().includes(cerca.toLowerCase());
      return nomePolitico || biographyPolitico;
    });
  }, [politici, cerca]);

  return (
    <>
      <div>
        <input 
          type="text"
          placeholder="Cerca politico"
          value={cerca}
          onChange={event => setCerca(event.target.value)}
        />
        <h2>Lista Politici</h2>
        <div>
          {filtraPolitici.map(politico => (
            <PoliticCard key={politico.id} {...politico} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App


//  Premessa: Stai costruendo una pagina per visualizzare una lista di politici. Tuttavia, vuoi evitare calcoli inutili e 
// ottimizzare la performance del tuo componente. Segui le milestone per migliorare progressivamente il codice

//   Milestone 1: Recuperare e visualizzare i dati
//  Effettua una chiamata API a
//  http://localhost:3333/politicians

//  Salva la risposta in uno stato React (useState).

//  Mostra i politici in una lista di card, visualizzando almeno le seguenti proprietà:

//  Nome (name)
//  Immagine (image)
//  Posizione (position)
//  Breve biografia (biography)

//  Obiettivo: Caricare e mostrare i politici in un’interfaccia chiara e leggibile.

//  Milestone 2: Implementare la ricerca ottimizzata
//  Aggiungi un campo di ricerca (<input type="text">) sopra la lista dei politici.
//  Permetti all’utente di filtrare i risultati in base a nome o biografia (se il testo cercato è incluso). Suggerimento: Creare un array derivato filtrato, che viene aggiornato solo quando cambia la lista di politici o il valore della ricerca.
//  ❌ Non usare useEffect per aggiornare l’array filtrato.

//  Obiettivo: Migliorare le prestazioni evitando ricalcoli inutili quando il valore della ricerca non cambia.

//  Milestone 3: Ottimizzare il rendering delle card con React.memo
//  Attualmente, ogni volta che l’utente digita nella barra di ricerca, tutte le card vengono ri-renderizzate, anche quelle che non sono cambiate.
//  Usa React.memo() per evitare il ri-render delle card quando le loro props non cambiano.
//  Aggiungi un console.log() dentro il componente Card per verificare che venga renderizzato solo quando necessario.

//  Obiettivo: Se la lista filtrata cambia, solo le nuove card devono essere renderizzate, mentre le altre rimangono in memoria senza essere ridisegnate.
