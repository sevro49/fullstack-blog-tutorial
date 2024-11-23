import { Link } from "react-router-dom"
import { Icon } from '@iconify/react';

const socialLinks = [
  {
    id: 1,
    title: "Portfolio",
    url: "https://emreguler.com.tr/",
    icon: "ant-design:link-outlined"
  },
  {
    id: 2,
    title: "GitHub",
    url: "https://github.com/sevro49",
    icon: "mdi:github"
  },
  {
    id: 3,
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/sevro49/",
    icon: "uil:linkedin"
  },
  {
    id: 4,
    title: "X",
    url: "https://x.com/sevro49dev",
    icon: "fa6-brands:x-twitter"
  }
]

const Footer = () => {
  return (
    <footer className="bg-stone-400 text-stone-700 px-4 sm:px-12 md:px-16 lg:px-28 xl:px-36 2xl:px-52 pt-20">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
        <Link to="/">
          <h2 className="text-4xl font-bold">Blog</h2>
        </Link>
        <div>
          <p className="text-2xl mb-4 text-center md:text-start">Social</p>
          <ul className="flex flex-col gap-2">
            {socialLinks.map((link) => (   
              <li key={link.id}>
                <Link to={link.url} target="_blank" className="flex items-center gap-3">
                  <span>
                    <Icon icon={link.icon} className="text-2xl group-hover:text-white"/>
                  </span>
                  <span>{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full mt-20 pb-5">
        <p className="text-center">&copy; 2024 All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer