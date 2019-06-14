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

class Planet extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Query
        query={
          gql`
          {
            planet(id: "${this.props.match.params.id}") {
              name
              diameter
              rotationPeriod
              orbitalPeriod
              gravity
              population
              climates
              terrains
              surfaceWater
              residentConnection{
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
              <Header as='h1'> {data.planet.name} </Header>
              <p> Diámetro: {data.planet.diameter} </p>
              <p> Periodo Rotacion: {data.planet.rotationPeriod} </p>
              <p> Periodo Orbital: {data.planet.orbitalPeriod} </p>
              <p> Gravedad: {data.planet.gravity} </p>
              <p> Población: {data.planet.population} </p>
              <p> Clima: {data.planet.climates} </p>
              <p> Terreno: {data.planet.terrains} </p>
              <p> Superficie de Agua: {data.planet.surfaceWater} </p>
              <Header as='h2'> Residents </Header>
              <Card.Group centered>
                {data.planet.residentConnection.edges.map(({ node }) => (
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
                {data.planet.filmConnection.edges.map(({ node }) => (
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

export default Planet;