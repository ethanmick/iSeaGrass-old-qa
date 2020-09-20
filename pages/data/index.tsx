import { ChevronLeft, DataError, Download, Loading } from 'components'
import { compact } from 'lodash'
import { Trip } from 'models'
import moment from 'moment'
import Link from 'next/link'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { Col, Container, ListGroup, Row } from 'reactstrap'
import useSWR from 'swr'

const fetcher = (url: string, after: Date, before: Date) =>
  fetch(`${url}?after=${after}&before=${before}`).then((r) => r.json())

const NoTrips = () => (
  <div className="mt-5">
    <Col className="text-center">
      <h3>No Found Trips</h3>
      <div>No trips were found in this date range.</div>
    </Col>
  </div>
)

interface TripItemProps {
  trip: Trip
}

const TripItem = ({ trip }: TripItemProps) => {
  const onClick = (href: string) => (e: React.MouseEvent<any>) => {
    var a = document.createElement('a')
    a.setAttribute('href', href)
    a.setAttribute('target', '_blank')
    a.dispatchEvent(
      new MouseEvent('click', { view: window, bubbles: true, cancelable: true })
    )
  }

  return (
    <div className="list-group-item text-dark p-2">
      <Row>
        <Col xs="10">
          <div>Trip with {compact(trip.crew).join(', ')}</div>
          <small className="text-muted">
            {moment(trip.date).format('MMMM Do, YYYY')}
          </small>
        </Col>
        <Col xs="2" className="d-flex align-items-center">
          <a
            className="btn btn-primary"
            color="primary"
            target="_blank"
            onClick={onClick(`/api/csv/${trip.uuid}`)}
          >
            <div className="d-flex align-items-center justify-content-center">
              <Download />
              <span className="ml-2 d-none d-md-inline-block">Download</span>
            </div>
          </a>
        </Col>
      </Row>
    </div>
  )
}

export default () => {
  const [after, setAfter] = useState(moment().subtract(1, 'year').toDate())
  const [before, setBefore] = useState(new Date())
  const { data: trips, error } = useSWR(
    ['/api/download', after.toISOString(), before.toISOString()],
    fetcher
  )

  if (error) return <DataError error={error.message} />
  let body
  if (!trips) {
    body = <Loading />
  } else if (trips && trips.length == 0) {
    body = <NoTrips />
  } else {
    body = (
      <ListGroup flush className="px-2 mt-5">
        {trips.map((trip, i) => (
          <TripItem trip={trip} key={trip.uuid} />
        ))}
      </ListGroup>
    )
  }
  return (
    <>
      <Container>
        <Link href="/">
          <a className="d-flex align-items-center ml-2 py-2">
            <ChevronLeft />
            <span>Back to Home</span>
          </a>
        </Link>
        <Row noGutters className="justify-content-between p-3">
          <Col xs="12">
            <h3 className="font-weight-light text-center">
              Download Trip Data
            </h3>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex" xs="12" md="6">
            <h4 className="mr-2 mb-0 font-weight-normal">Trip taken After:</h4>
            <ReactDatePicker
              selected={after}
              onChange={(date: Date) => setAfter(date)}
            />
          </Col>
          <Col className="d-flex mt-3 mt-md-0" xs="12" md="6">
            <h4 className="mr-2 mb-0 font-weight-normal">Trip taken Before:</h4>
            <ReactDatePicker
              selected={before}
              onChange={(date: Date) => setBefore(date)}
            />
          </Col>
        </Row>
        {body}
      </Container>
    </>
  )
}
