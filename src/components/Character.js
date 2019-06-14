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

class Character extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Query
        query={
          gql`
          {
            person(id: "${this.props.match.params.id}") {
              name
              birthYear
              gender
              eyeColor
              hairColor
              skinColor
              height
              mass
              homeworld{
                id
                name
              }
              starshipConnection{
                starships{
                  name
                  id
                }
              }
              filmConnection{
                films{
                  title
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
              <Header as='h1'> {data.person.name} </Header>
              <p> Nacimiento: {data.person.birthYear} </p>
              <p> Género: {data.person.gender} </p>
              <p> Color de ojos: {data.person.eyeColor} </p>
              <p> Color de pelo: {data.person.hairColor} </p>
              <p> Color de piel: {data.person.skinColor} </p>
              <p> Altura: {data.person.height} </p>
              <p> Peso: {data.person.mass} </p>
              <Header as='h2'> Planeta Natal </Header>
              <Card as='h6' as={Link} to={`/planets/${data.person.homeworld.id}`}> 
              <Card.Content>
                <Card.Header>{data.person.homeworld.name}</Card.Header>
              </Card.Content>
              </Card>
              <Header as='h2'> Naves </Header>
              <Card.Group centered>
                {data.person.starshipConnection.starships.map(({id, name}) => (
                <Card key={id} as={Link} to={`/starships/${id}`} >
                  <Card.Content>
                    <Card.Header>{name}</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                  </Card.Content>
                </Card>
                ))}
              </Card.Group>
              <Header as='h2'> Películas </Header>
              <Card.Group centered>
                {data.person.filmConnection.films.map(({id, title}) => (
                <Card key={id} as={Link} to={`/films/${id}`} >
                  <Card.Content>
                    <Card.Header>{title}</Card.Header>
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

export default Character;