import { useRouter } from 'next/router'

export const TRIP_QUERY = 'tripId'
export const STATION_QUERY = 'stationId'
export const DROP_FRAME_QUERY = 'dropFrameId'
export const SAMPLE_QUERY = 'sampleId'
export type QueryParam = 'tripId' | 'stationId' | 'dropFrameId' | 'sampleId'

export const useQuery = (q: QueryParam): number | undefined => {
  const router = useRouter()
  return router.query[q] ? parseInt(router.query[q] as string) : undefined
}
