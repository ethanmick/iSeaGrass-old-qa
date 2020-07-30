import { DBSchema, openDB } from 'idb'
import { DropFrame, Sample, Station, Trip } from 'models'

const VERSION = 1

export interface Database extends DBSchema {
  trips: {
    value: Trip
    key: number
  }
  stations: {
    value: Station
    key: number
  }
  drop_frames: {
    value: DropFrame
    key: number
  }
  samples: {
    value: Sample
    key: number
  }
}

export const connect = () =>
  openDB<Database>('seegrass', VERSION, {
    upgrade(db) {
      db.createObjectStore('trips', { keyPath: 'id', autoIncrement: true })
      db.createObjectStore('stations', { keyPath: 'id', autoIncrement: true })
      db.createObjectStore('drop_frames', {
        keyPath: 'id',
        autoIncrement: true
      })
      db.createObjectStore('samples', { keyPath: 'id', autoIncrement: true })
    }
  })
