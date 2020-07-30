import { DatabaseContext } from 'contexts/DatabaseContext'
import {
  Database,
  DROP_FRAME_STORE,
  SAMPLE_STORE,
  STATION_STORE,
  STORES,
  TRIP_STORE
} from 'db'
import { IDBPDatabase } from 'idb'
import { DropFrame, Sample, Station, Trip } from 'models'
import { useContext, useEffect, useState } from 'react'
import { QueryParam, useQuery } from './useQuery'

export const useDB = () => useContext(DatabaseContext)

interface QueryHook<T> {
  result: T
  error: Error
}

export type UseTripsAccessor = (db: IDBPDatabase<Database>) => any
export const useDBQuery = <T>(fn: UseTripsAccessor): QueryHook<T> => {
  const { db } = useDB()
  const [result, setResult] = useState<T | undefined>(undefined)
  const [error, setError] = useState<Error | undefined>(undefined)
  useEffect(() => {
    if (db) fn(db).then(setResult).catch(setError)
  }, [db])
  return { result, error }
}

interface StoreByKeyHook<T> {
  db: IDBPDatabase<Database>
  value?: T
  error?: Error
  loading: boolean
}

const useStoreByKey = <T>(
  store: STORES,
  param: QueryParam
): StoreByKeyHook<T> => {
  const id = useQuery(param)
  const { db } = useDB()
  const [loading, setLoading] = useState<boolean>(true)
  const [value, setValue] = useState<T | undefined>(undefined)
  const [error, setError] = useState<Error | undefined>(undefined)
  useEffect(() => {
    ;(async function () {
      if (db && id) {
        try {
          setValue((await db.get(store, id)) as any)
        } catch (err) {
          setError(err)
        } finally {
          setLoading(false)
        }
      }
    })()
  }, [db, id])
  return { db, loading, value, error }
}

// useTrip loads the trip from the query param `tripId`.
// This should be used throughout the app in any component you want to load
// the trip. Most often this is the top level pages.
export const useTrip = (): StoreByKeyHook<Trip> =>
  useStoreByKey(TRIP_STORE, 'tripId')

// useStation
export const useStation = (): StoreByKeyHook<Station> =>
  useStoreByKey(STATION_STORE, 'stationId')

// useDropFrame
export const useDropFrame = (): StoreByKeyHook<DropFrame> =>
  useStoreByKey(DROP_FRAME_STORE, 'dropFrameId')

// useSample
export const useSample = (): StoreByKeyHook<Sample> =>
  useStoreByKey(SAMPLE_STORE, 'sampleId')
