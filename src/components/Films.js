import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Loader,
  Segment,
  Dimmer,
  Card,
  Container,
  Header
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Films extends Component {
  render() {
    return (
      <Query
        query={
          gql`
          {
            allFilms {
              edges {
                node {
                  title
                  releaseDate
                  director
                  producers
                  episodeID
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
              <Header as='h1'> Películas </Header>
              <Card.Group centered>
                {data.allFilms.edges.map(({ node }) => (
                <Card key={node.id} as={Link} to={`/films/${node.id}`}>
                  <Card.Content>
                    <Card.Header>{node.title}</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                  <p> Episodio: {node.episodeID} </p>
                  <p> Lanzamiento: {node.releaseDate} </p>
                  <p> Director: {node.director} </p>
                  <p> Productores: {node.producers} </p>
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
export default Films;