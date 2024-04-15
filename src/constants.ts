import type { IconProps } from '@types'
import { FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi'
import { LiaSpotify } from 'react-icons/lia'
import { FaXTwitter, FaThreads } from 'react-icons/fa6'

// MARK: Social Icons Array
export const SocialIcons: IconProps[] = [
  {
    icon: FiGithub,
    name: 'Github',
    href: 'https://github.com/redpwilliams/'
  },
  {
    icon: LiaSpotify,
    name: 'Spotify',
    href: 'https://open.spotify.com/user/jpw918?si=9641a1c3c57b4e04',
    style: {
      transform: 'scale(1.4)' // Spotify logo is weird for whatever reason
    }
  },
  {
    icon: FiInstagram,
    name: 'Instagram',
    href: 'https://www.instagram.com/red.williams18/'
  },
  {
    icon: FiLinkedin,
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/redwilliams18/'
  },
  {
    icon: FaXTwitter,
    name: 'Twitter',
    href: 'https://twitter.com/redpw_'
  },
  {
    icon: FaThreads,
    name: 'Threads',
    href: 'https://www.threads.net/@red.williams18'
  }
]
