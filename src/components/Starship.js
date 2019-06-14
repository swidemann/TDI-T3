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

class Starship extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Query
        query={
          gql`
          {
            starship(id: "${this.props.match.params.id}") {
              name
              model
              starshipClass
              manufacturers
              costInCredits
              length
              crew
              passengers
              maxAtmospheringSpeed
              hyperdriveRating
              MGLT
              cargoCapacity
              consumables
              pilotConnection{
                edges{
                  node{
                    name
                    id
                  }
                }
              }
              filmConnection{
                edges{
                  node{
                    title
                    id
                  }
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
              <Header as='h1'> {data.starship.name} </Header>
              <p> Modelo: {data.starship.model} </p>
              <p> Clase: {data.starship.starshipClass} </p>
              <p> Fabricantes: {data.starship.manufacturers} </p>
              <p> Costo: {data.starship.costInCredits} </p>
              <p> Largo: {data.starship.length} </p>
              <p> Tripulación: {data.starship.crew} </p>
              <p> Pasajeros: {data.starship.passengers} </p>
              <p> Max. Velocidad Atmosférica: {data.starship.maxAtmospheringSpeed} </p>
              <p> Hyperdrive: {data.starship.hyperdriveRating} </p>
              <p> MGLT: {data.starship.MGLT} </p>
              <p> Capacidad de Carga: {data.starship.cargoCapacity} </p>
              <p> Consumibles: {data.starship.consumables} </p>
              <Header as='h2'> Pilotos </Header>
              <Card.Group centered>
                {data.starship.pilotConnection.edges.map(({ node }) => (
                <Card key={node.id} as={Link} to={`/characters/${node.id}`}>
                  <Card.Content>
                    <Card.Header>{node.name}</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                  </Card.Content>
                </Card>
                ))}
              </Card.Group>
              <Header as='h2'> Películas </Header>
              <Card.Group centered>
                {data.starship.filmConnection.edges.map(({ node }) => (
                <Card key={node.id} as={Link} to={`/films/${node.id}`}>
                  <Card.Content>
                    <Card.Header>{node.title}</Card.Header>
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

export default Starship;