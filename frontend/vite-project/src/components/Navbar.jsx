import React from 'react'
import { background, Button, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div className='max-w-["1140px"] flex items-center justify-between mx-2 mt-1 lg:mx-10 xl:mx-20'>
        <div className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent uppercase text-center'>Product Store 🛒
        </div>
        <div className="flex items-center gap-2">
            <Link to={"/create"}>
                <Button>
                    <PlusSquareIcon fontSize={20} />
                </Button>
            </Link>
            <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <IoMoon className='text-gray-500'/> : <LuSun className='text-yellow-400'/> }
            </Button>
        </div>
    </div>
  )
}

export default Navbar