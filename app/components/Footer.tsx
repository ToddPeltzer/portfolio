import React from 'react'
import GitHubIcon from '../assets/GitHubIcon'
import LinkedInIcon from '../assets/LinkedInIcon'

export default function Footer() {
  return (
    <div>
        <ul className='flex flex-row'>
            <li>
                <GitHubIcon />
            </li>
            <li>
                <LinkedInIcon />
            </li>
        </ul>
    </div>
  )
}
