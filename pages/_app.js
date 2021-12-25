import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="#" className="flex">
            <span className="self-center text-lg font-semibold whitespace-nowrap">Fibbo Marketplace</span>
          </a>
          <div className="hidden w-full md:block md:w-auto">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <Link href="/">
                <li>
                  <a className="block py-2 pl-3 pr-4 text-gray-700 text-base border-b border-gray-100 hover:bg-gray-50 cursor-pointer md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Home</a>
                </li> 
              </Link>

              <Link href="/create-item">
                <li>
                  <a className="block py-2 pl-3 pr-4 text-gray-700 text-base border-b border-gray-100 hover:bg-gray-50 cursor-pointer md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Create NFT</a>
                </li>
              </Link>

              <Link href="/my-nfts">
                <li>
                  <a className="block py-2 pl-3 pr-4 text-gray-700 text-base border-b border-gray-100 hover:bg-gray-50 cursor-pointer md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">My NFTs</a>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
