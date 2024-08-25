import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import "./dashboard.css"

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
} from 'chart.js';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title);

function Dashboard() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newWidgetName, setNewWidgetName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData = localStorage.getItem('dashboardData');
        if (savedData) {
          setData(JSON.parse(savedData));
        }else{
          const response = await fetch('./../data/dashboardData.json');
          const result = await response.json();
          setData(result);
          console.log("YE DEKH BHAI", result);

          localStorage.setItem('dashboardData', JSON.stringify(result));
        }
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem('dashboardData', JSON.stringify(data));
    }
  }, [data]);

  const handleShowModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewWidgetName('');
  };

  const handleAddWidget = () => {
    if (newWidgetName.trim() === '' || selectedCategoryId === null) return;

    const updatedData = { ...data };
    const category = updatedData.categories.find(cat => cat.id === selectedCategoryId);

    if (category) {
      const newWidgetId = category.widgets.length ? category.widgets[category.widgets.length - 1].id + 1 : 1;
      const newWidget = {
        id: newWidgetId,
        name: newWidgetName,
        chartData: {
          labels: ["Category 1", "Category 2", "Category 3", "Category 4"],
          datasets: [
            {
              data: [10, 20, 30, 40],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]
            }
          ]
        }
      };
      category.widgets.push(newWidget);
      setData(updatedData);
    }

    handleCloseModal();
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    const updatedData = { ...data };
    const category = updatedData.categories.find(cat => cat.id === categoryId);

    if (category) {
      category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      setData(updatedData);
    }
  };

  // Add console log for debugging
  console.log('Current Data:', data);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Container className='dashboard'>
      {data.categories.map((category) => (
        <div key={category.id}>
          <h4>{category.name}</h4>
          <Row>
            {category.widgets.map(widget => (
              <Col key={widget.id} xs={12} sm={6} md={4}>
                <Card className="mb-3 c">
                  <Card.Body className='cb'>
                   <div className='top'> <Card.Title className='subhead'>{widget.name}</Card.Title>
                    <Button variant="danger" className="mt-2 rmw" onClick={() => handleRemoveWidget(category.id, widget.id)}>
                      X
                    </Button>
                    </div> 
                    {console.log('Widget Chart Data:', widget.chartData)}
                    {/* Check if chartData exists and has necessary properties before rendering */}
                    {widget.chartData && widget.chartData.labels && widget.chartData.datasets ? (
                     <div className='chart'> <Doughnut data={widget.chartData} /> </div>
                    ) : (
                      <p>No data available</p>
                    )}
                   
                  </Card.Body>
                </Card>
              </Col>
            ))}
            <Col xs={12} sm={6} md={4}>
              <Button className='addwidget' onClick={() => handleShowModal(category.id)}>+ Add Widget</Button>
            </Col>
          </Row>
        </div>
      ))}

      {/* Modal for Adding New Widget */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Widget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="widgetName">
              <Form.Label>Widget Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter widget name"
                value={newWidgetName}
                onChange={(e) => setNewWidgetName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='dd-close' variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button className='dd-addwidget' variant="primary" onClick={handleAddWidget}>
            Add Widget
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Dashboard;
