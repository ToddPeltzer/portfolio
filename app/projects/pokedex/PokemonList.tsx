"use client"

import React, { useState, useEffect } from 'react';
import './styles/pokedex.css';

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{ type: { name: string } }>;
  abilities: PokemonAbility[];
}

function PokemonComponent() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [input, setInput] = useState<string>('bulbasaur');

  // API call to get pokemon results
  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setPokemon(res);
      })
      .catch(console.error);
  }, [input]);

  function handleInput(e: React.FormEvent) {
    e.preventDefault();
    let textInput = document.querySelector<HTMLInputElement>('#pokemonInput');
    if (textInput) {
      setInput(textInput.value);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleInput(e);
    }
  }

  if (!pokemon || (!pokemon.sprites.other["official-artwork"].front_default && !pokemon.types)) {
    return (
      <div className='main-container'>
        LOADING....
      </div>
    );
  } else {
    return (
      <div className='main-container'>
        <div className='pokedex-container'>
          <div className='left-container'>
            <div className='top-left-screen'>
              <img src={pokemon.sprites.other["official-artwork"].front_default} alt={`Sprite of ${pokemon.name}`} />
            </div>
            <div className='search-container'>
              <button type="submit" onClick={handleInput}>GO</button>
              <input type="text" id="pokemonInput" placeholder="Search Pokedex" onKeyPress={(e) => handleKeyPress(e)}/>
            </div>
            <div className='bottom-left-screen'>
              <h3 className='name'>Name: {pokemon.name}</h3>
              <h3 className='type'>Type: {pokemon.types[0].type.name}</h3>
            </div>
          </div>
          <div className='right-container'>
            <div className='right-screen'>
              <h3>Number: {pokemon.id}</h3>
              <div>
                <h3 className='abilities'>Abilities:
                  <ul>
                    <li>{pokemon.abilities[0].ability.name}</li>
                    <li>{pokemon.abilities[1].ability.name}</li>
                  </ul>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonComponent;
