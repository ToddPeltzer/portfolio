import React from 'react';

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
}

async function getPokemonDetails(id: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    next: {
      revalidate: 60,
    },
  });
  return res.json();
}

interface PokemonDetailsProps {
  params: {
    id: string;
  };
}

const PokemonDetails: React.FC<PokemonDetailsProps> = async ({ params }) => {
  const pokemon: Pokemon = await getPokemonDetails(params.id);

  return (
    <div>
      <h2>Pokemon Details</h2>
      <div>
        <h2>Number: {pokemon.id}</h2>
        <h3>{pokemon.name}</h3>
        {pokemon.types[0].type.name}
      </div>
    </div>
  );
};

export default PokemonDetails;
