import React from 'react'
import Link from 'next/link'

export default function Projects() {
  return (
    <main>
      <Link href='/projects/pokedex'>Pokedex</Link>
      <Link href='/projects/space-trivia'>Space Trivia</Link>
    </main>
  )
}
