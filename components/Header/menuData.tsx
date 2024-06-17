import React, { useState } from 'react';
import { Menu } from "@/types/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuComponentProps {
  role: string;
}

const MenuComponent: React.FC<MenuComponentProps> = ({ role }) => {
  let menuData: Menu[] = [];
  const [openIndex, setOpenIndex] = useState(-1);


  if (role === 'admin') {
    menuData = [
      {
        id: 1,
        title: "Utilisateurs",
        path: "/admin/users",
        newTab: false,
      },
      {
        id: 2,
        title: "Demandes",
        path: "/admin/demandes",
        newTab: false,
      },
    ];
  } else if (role === 'technician') {
    menuData = [
      {
        id: 1,
        title: "Demandes",
        path: "/technician",
        newTab: false,
      },
      {
        id: 2,
        title: "Mes Demandes",
        path: "/technician/mesdemandes",
        newTab: false,
      },
    ];
  }
  else if (role === 'delivery') {
    menuData = [
      {
        id: 1,
        title: "Demandes",
        path: "/delivery",
        newTab: false,
      },
      {
        id: 2,
        title: "Mes Demandes",
        path: "/delivery/mesdemandes",
        newTab: false,
      },
    ];
  }
  else if (role === 'client') {
    menuData = [
      {
        id: 1,
        title: "Accueil",
        path: "/",
        newTab: false,
      },
      {
        id: 2,
        title: "A propos",
        path: "/about",
        newTab: false,
      },
      {
        id: 3,
        title: "Support",
        path: "/contact",
        newTab: false,
      },
      {
        id: 4,
        title: "Demandes",
        path: "/client",
        newTab: false,
      },
    ];
  }
  else {
    menuData = [
      {
        id: 1,
        title: "Accueil",
        path: "/",
        newTab: false,
      },
      {
        id: 2,
        title: "A propos",
        path: "/about",
        newTab: false,
      },
      {
        id: 3,
        title: "Support",
        path: "/contact",
        newTab: false,
      },
    ]
  }
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  return (
    <ul className="block lg:flex lg:space-x-12">
      {menuData.map((menuItem, index) => (
        <li key={index} className="group relative">
          {menuItem.path ? (
            <Link
              href={menuItem.path}
              className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${usePathName === menuItem.path
                ? "text-primary dark:text-white"
                : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                }`}
            >
              {menuItem.title}
            </Link>
          ) : (
            <>
              <p
                onClick={() => handleSubmenu(index)}
                className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
              >
                {menuItem.title}
                <span className="pl-3">
                  <svg width="25" height="24" viewBox="0 0 25 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </p>
              <div
                className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${openIndex === index ? "block" : "hidden"
                  }`}
              >
                {menuItem.submenu.map((submenuItem, index) => (
                  <Link
                    href={submenuItem.path}
                    key={index}
                    className="block rounded py-2.5 text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                  >
                    {submenuItem.title}
                  </Link>
                ))}
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default MenuComponent;