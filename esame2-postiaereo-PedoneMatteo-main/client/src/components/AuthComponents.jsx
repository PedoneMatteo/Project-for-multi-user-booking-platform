import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API';

function LoginForm(props) {
  const [username, setUsername] = useState('user1@gmail.com');
  const [password, setPassword] = useState('password');
  const [errorMessage, setErrorMessage] = useState('') ;

  const navigate = useNavigate();

  const doLogIn = (credentials) => {
    API.logIn(credentials)
      .then( user => {
        setErrorMessage('');
        props.loginSuccessful(user);
      })
      .catch(err => {
        // NB: Generic error message, should not give additional info (e.g., if user exists etc.)
        setErrorMessage('Username e/o password errata');
      })
  }
  
  const handleSubmit = (event) => {
      event.preventDefault();
      setErrorMessage('');
      const credentials = { username, password };

      // SOME VALIDATION, ADD MORE if needed (e.g., check if it is an email if an email is required, etc.)
      let valid = true;
      if(username === '' || password === '')
          valid = false;
      
      if(valid)
      {
        doLogIn(credentials);
      } else {
        // TODO: show a better error message...
        setErrorMessage('Campi nel form mancanti o non validi')
      }
  };

  return (
      <Container fluid>
          <Row>
              <Col xs={1}></Col>
              <Col xs={10}>
                  <h2>Login</h2>
                  <Form onSubmit={handleSubmit}>
                      {errorMessage ? <Alert variant='danger' dismissible onClick={()=>setErrorMessage('')}>{errorMessage}</Alert> : ''}
                      <Form.Group controlId='username'>
                          <Form.Label>Email</Form.Label>
                          <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} className="text-center" />
                      </Form.Group>
                      <Form.Group controlId='password'>
                          <Form.Label>Password</Form.Label>
                          <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} className="text-center"/>
                      </Form.Group>
                      <Button className='my-2' type='submit' >Login</Button>
                      <Button className='my-2 mx-2' variant='danger' onClick={()=>navigate('/')}>Cancel</Button>
                  </Form>
              </Col>
              <Col xs={1}></Col>
          </Row>
      </Container>
    )
}

export { LoginForm };