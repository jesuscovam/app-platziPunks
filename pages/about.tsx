import { ReactNode } from 'react'

function OutsideLink({
  children,
  url,
}: {
  children: ReactNode
  url: string
}): JSX.Element {
  return (
    <a
      href={url}
      target="_blank"
      rel="no opener"
      className="px-1 text-indigo-500 underline"
    >
      {children}
    </a>
  )
}

export default function About(): JSX.Element {
  return (
    <div className="w-2/4">
      <h1 className="text-lg font-bold">About</h1>
      <p>
        Esta es una versión hecha con Nextjs 12 y con los paquetes de
        @web3-react versión 8 de un proyecto Original de
        <OutsideLink url="https://platzi.com">Platzi</OutsideLink>
        por el profesor
        <OutsideLink url="https://twitter.com/ernestognw">
          ernestognw.eth
        </OutsideLink>
      </p>
    </div>
  )
}
