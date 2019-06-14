import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Loader,
  Segment,
  Dimmer,
  Card,
  Container,
  Header,
  List
} from 'semantic-ui-react';

class Film extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Query
        query={
          gql`
          {
            film(id: "${this.props.match.params.id}") {
              id
              episodeID
              title
              openingCrawl
              director
              producers
              releaseDate
              characterConnection {
                characters {
                  name
                  mass
                  birthYear
                  id
                }
              }
              starshipConnection{
                starships{
                  name
                  id
                }
              }
              planetConnection{
                planets{
                  name
                  id
                }
              }
            }
          }
          `
        }
      >
        {({ loading, error, data }) => {
          if (loading) return(
            <Segment>
              <Dimmer active>
                <Loader />
              </Dimmer>
            </Segment>
          );
          if (error) return <p>Error</p>;

          return (
            <Container>
              <Segment>
                <Card.Content>
                  <Card.Header>SWAPI GraphQL </Card.Header>
                </Card.Content>
                <Card.Content extra>
                </Card.Content>
              </Segment>
              <Header as='h1'> {data.film.title} </Header>
              <p> Episodio: {data.film.episodeID} </p>
              <p> Director: {data.film.director} </p>
              <p> Productores: {data.film.producers} </p>
              <p> Lanzamiento: {data.film.releaseDate} </p>
              <p> Opening Crawl: {data.film.openingCrawl} </p>              
              <Header as='h2'> Personajes </Header>
              <Card.Group centered>
                {data.film.characterConnection.characters.map(({id, name}) => (
                <Card key={id} as={Link} to={`/characters/${id}`} >
                  <Card.Content>
                    <Card.Header>{name}</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                  </Card.Content>
                </Card>
                ))}
              </Card.Group>
              <Header as='h2'> Naves </Header>
              <Card.Group centered>
                {data.film.starshipConnection.starships.map(({id, name}) => (
                <Card key={id} as={Link} to={`/starships/${id}`} >
                  <Card.Content>
                    <Card.Header>{name}</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                  </Card.Content>
                </Card>
                ))}
              </Card.Group>
              <Header as='h2'> Planetas </Header>
              <Card.Group centered>
                {data.film.planetConnection.planets.map(({id, name}) => (
                <Card key={id} as={Link} to={`/planets/${id}`} >
                  <Card.Content>
                    <Card.Header>{name}</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                  </Card.Content>
                </Card>
                ))}
              </Card.Group>
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default Film;