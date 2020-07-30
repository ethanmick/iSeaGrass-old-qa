export interface SechiDrop {
  depth: number
  hitBottom: boolean
}

export interface Secchi {
  waterDepth: number
  units: 'm'
  time: Date
  drops: SechiDrop[]
  notes: string
}

export interface Wind {
  speed: string
}

export interface Sea {
  waves: string
}

export interface Clouds {
  clouds: string
}

export interface Tide {
  state: string
}

export interface Weather {
  wind: Wind
  sea: Sea
  clouds: Clouds
  tide: Tide
}

// What is this?
export interface IndicatorShoot {}

export interface Sample {
  units: 'm'
  picture: boolean
  pictureTakenAt: Date
  diseaseCoverage: string
  shoots: IndicatorShoot[]
}

// DropFrame
export interface DropFrame {
  picture: boolean
  pictureTakenAt: Date
  sediments: string[]
  coverage: string
  notes: string
}

// Station
export interface Station {
  id: string | number
  longitude: string | number
  latitude: string | number
  gpsDevice: string
  harbor: string
  isIndicatorStation: boolean
}

export interface Trip {
  id?: number
  date: Date
  harbor: string
  boat: string
  crew: string[]
  stations?: Station[]
}
