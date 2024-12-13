import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div>
        <div className="navbar bg-base-100 shadow-lg mt-1 mb-4">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
       <Link href={"/"}>Operations</Link>
      <Link href={"/product/ProductList"}>Product List</Link>
      <Link href={"/product/CreateProduct/"}> Create Product </Link> 
       
    
      <Link href={"/about"}> About </Link> 
      <Link href={"/"}> Contact </Link> 
      </ul>
    </div>
    <Link href={"/"} className="text-[midnightblue] font-bold shadow-sm text-xl">  VShop</Link> 
  </div>
  <div className="navbar-center hidden md:flex lg:flex">
    <ul className="menu menu-horizontal px-7 space-x-12 font-bold text-[darkcyan]">
      
      <Link href={"/"}>Operations</Link>
      <Link href={"/product/ProductList"}>Product List</Link>
      <Link href={"/product/CreateProduct"}> Create Product </Link> 
       
    
      <Link href={"/about"}> About </Link> 
      <Link href={"/"}> Contact </Link> 
      
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn btn-primary">Details</a>
  </div>
</div>
    </div>
  )
}

export default Header