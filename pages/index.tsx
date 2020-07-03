import { useQuery } from 'hooks'
import { Trip } from 'models'
import moment from 'moment'
import Link from 'next/link'
import { Col, ListGroup, Row, Spinner } from 'reactstrap'

const NoTrips = () => (
  <Row className="mt-5">
    <Col className="text-center">
      <h3>No Current Trips</h3>
      <div>You haven't taken any trips yet.</div>
      <Link href="/trips">
        <a className="btn btn-primary mt-2" role="button">
          Start New Trip
        </a>
      </Link>
    </Col>
  </Row>
)

const Loading = () => <Spinner color="primary" />

export default function Home() {
  const trips = useQuery<Trip[]>((db) => db.getAll('trips'))

  if (!trips) return Loading()
  if (trips.length == 0) return NoTrips()

  return (
    <>
      <Row noGutters className="justify-content-between p-3">
        <Col xs="auto">
          <h3 className="m-0">Your Trips</h3>
        </Col>
        <Col xs="auto">
          <Link href="/trips">
            <a className="btn btn-primary" role="button">
              Start New Trip
            </a>
          </Link>
        </Col>
      </Row>
      <ListGroup flush>
        {trips.map((trip) => (
          <Link
            key={trip.id}
            href={{ pathname: '/trips/id', query: { id: trip.id } }}
            as={`/trips/id?id=${trip.id}`}
          >
            <a className="list-group-item text-dark p-2">
              <div>
                <div>Trip {trip.id}</div>
                <small>{moment(trip.date).format('MMMM Do, YYYY')}</small>
              </div>
            </a>
          </Link>
        ))}
      </ListGroup>
      <Row className="justify-content-center">
        <Col xs="auto"></Col>
      </Row>
      <button onClick={() => window.location.reload(true)}>RELOAD</button>
    </>
  )
}
