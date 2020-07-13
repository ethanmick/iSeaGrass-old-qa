import { DatabaseContext } from 'contexts/DatabaseContext'
import { Database } from 'db'
import { IDBPDatabase } from 'idb'
import { Trip } from 'models'
import { useContext, useEffect, useState } from 'react'

export const useDB = () => useContext(DatabaseContext)

interface QueryHook<T> {
  result: T
  error: Error
}

export type UseTripsAccessor = (db: IDBPDatabase<Database>) => any
export const useQuery = <T>(fn: UseTripsAccessor): QueryHook<T> => {
  const { db } = useDB()
  const [result, setResult] = useState<T | undefined>(undefined)
  const [error, setError] = useState<Error | undefined>(undefined)
  useEffect(() => {
    if (db) fn(db).then(setResult).catch(setError)
  }, [db])
  return { result, error }
}

interface TripHook {
  trip?: Trip
  error?: Error
  loading: boolean
}

export const useTrip = (id?: number): TripHook => {
  console.log('Use trip hook', id)
  const { db } = useDB()
  const [loading, setLoading] = useState<boolean>(true)
  const [trip, setTrip] = useState<Trip | undefined>(undefined)
  const [error, setError] = useState<Error | undefined>(undefined)
  useEffect(() => {
    ;(async function () {
      if (db && id) {
        await db.get('trips', id).then(setTrip).catch(setError)
        setLoading(false)
      }
    })()
  }, [db])
  return { loading, trip, error }
}
