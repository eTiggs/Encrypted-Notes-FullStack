import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const NoteModifiers = ({ timeActive, handleTimeChange, reads, handleReadsChange, infiniteReads, handleInfiniteChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit} className="write-note-form-group">
      <Row>
        <Col>
          <Form.Group controlId="formTimeActive">
            <Form.Label>Time Active</Form.Label>
            <Form.Control as="select" value={timeActive} onChange={handleTimeChange} required>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="360">6 hours</option>
              <option value="720">12 hours</option>
              <option value="1440">1 day</option>
              <option value="4320">3 days</option>
              <option value="10080">1 week</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formReads">
            <Form.Label>No of Reads (Up to 99)</Form.Label>
            <Form.Control
              type="number"
              min="0"
              max="99"
              value={reads}
              onChange={handleReadsChange}
              disabled={infiniteReads}
              required={!infiniteReads}
            />
          </Form.Group>
          <Form.Group controlId="formInfiniteReads">
            <Form.Check
              type="checkbox"
              label="Infinite Reads"
              checked={infiniteReads}
              onChange={handleInfiniteChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit" className="write-note-button">
        Create & Encrypt Note
      </Button>
    </Form>
  );
};

export default NoteModifiers;
