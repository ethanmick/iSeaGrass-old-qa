import 'bootstrap/dist/css/bootstrap.min.css'
import { Layout } from 'components'
import { DatabaseContext } from 'contexts/DatabaseContext'
import { connect, Database } from 'db'
import { IDBPDatabase } from 'idb'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import 'styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [db, setDB] = useState<IDBPDatabase<Database>>(undefined)
  const [tripId, setTripId] = useState<number | undefined>(undefined)
  // Open connection on app initialization
  useEffect(() => {
    connect().then(setDB)
  }, [])
  return (
    <DatabaseContext.Provider value={{ db, setDB, tripId, setTripId }}>
      <Head>
        <title>Eelgrass</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DatabaseContext.Provider>
  )
}

export default MyApp
