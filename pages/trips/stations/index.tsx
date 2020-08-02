import { ChevronLeft, DataError, Loading } from 'components'
import { Weather } from 'components/Weather'
import { useStation } from 'hooks'
import { Station } from 'models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'

export default () => {
  const router = useRouter()
  const { loading, db, value, error } = useStation()
  const [station, setStation] = useState<Station>(undefined)
  useEffect(() => {
    if (value) setStation(value)
  }, [value])

  // TODO: Move to a component
  //const { latitude, longitude, error: gpsError } = usePosition()
  // useWeather()

  /*
  useEffect(() => {
    if (latitude || longitude) {
      setStation({
        ...station,
        latitude: latitude.toFixed(6),
        longitude: longitude.toFixed(6),
        gpsDevice: 'phone'
      })
    }
  }, [latitude, longitude])
  */

  if (error) return <DataError error={error.message} />
  if (loading) return <Loading />
  if (!loading && !station) {
    router.replace('/')
    return null
  }

  const save = async (e?: React.FormEvent) => {
    e?.preventDefault()
  }

  return (
    <>
      <div className="py-2">
        <Link
          href={{ pathname: '/trips', query: { id: station.tripId } }}
          as={`/trips?id=${station.tripId}`}
        >
          <a className="d-flex align-items-center ml-2">
            <ChevronLeft />
            <span>Back to Trip</span>
          </a>
        </Link>
      </div>
      <Form onSubmit={save} className="px-3">
        <h3 className="font-weight-light">Station {station.id}</h3>
        <FormGroup>
          <Label for="station">Station Number</Label>
          <Input
            type="number"
            id="station"
            required={true}
            inputMode="decimal"
            value={station.id}
            onChange={(e) => {
              setStation({ ...station, stationId: e.target.value })
              save()
            }}
          />
        </FormGroup>
        <FormGroup>
          <div>
            <Label for="indicator">Indicator Station?</Label>
          </div>
          <ButtonGroup className="btn-group-toggle d-flex">
            <Label
              className={`btn btn-secondary ${
                station.isIndicatorStation ? 'active' : ''
              }`}
            >
              <Input
                type="radio"
                autoComplete="off"
                checked={station.isIndicatorStation}
                onChange={(e) =>
                  setStation({
                    ...station,
                    isIndicatorStation: true
                  })
                }
              />
              Yes
            </Label>
            <Label
              className={`btn btn-secondary ${
                !station.isIndicatorStation ? 'active' : ''
              }`}
            >
              <Input
                type="radio"
                autoComplete="off"
                checked={!station.isIndicatorStation}
                onChange={(e) =>
                  setStation({
                    ...station,
                    isIndicatorStation: false
                  })
                }
              />
              No
            </Label>
          </ButtonGroup>
        </FormGroup>
        <FormGroup>
          <Label for="harbor">Harbor</Label>
          <Input
            type="text"
            id="harbor"
            required={true}
            value={station.harbor}
            onChange={(e) => setStation({ ...station, harbor: e.target.value })}
          />
        </FormGroup>
        <FormGroup row>
          <Col xs="12">
            <Label for="location">Location</Label>
          </Col>
          <Col xs="6">
            <Input
              type="number"
              id="latitude"
              inputMode="decimal"
              required={true}
              placeholder="Latitude"
              value={station.latitude}
              onChange={(e) =>
                setStation({ ...station, latitude: e.target.value })
              }
            />
          </Col>
          <Col xs="6">
            <Input
              type="number"
              id="longitude"
              inputMode="decimal"
              required={true}
              placeholder="Longitude"
              value={station.longitude}
              onChange={(e) =>
                setStation({ ...station, longitude: e.target.value })
              }
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="gpsDevice">GPS Device</Label>
          <Input
            type="text"
            id="gpsDevice"
            required={true}
            value={station.gpsDevice}
            onChange={(e) =>
              setStation({ ...station, gpsDevice: e.target.value })
            }
          />
        </FormGroup>
      </Form>
      <Weather weather={null} />
      <h1>Frames</h1>
      <Button>Add Drop Frame</Button>
    </>
  )
}
