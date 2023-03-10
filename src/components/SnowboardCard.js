import React, {useState} from 'react'
import {Button, Card} from 'react-bootstrap'

function SnowboardCard({countLikes, likes, removeBoard, brand, price, gender, description, category, image, year, id}) {
  const [boardLikes, setBoardLikes] = useState(likes)

  function addToCart(){
    const cartItem ={
      image: image,
      description: description,
      gender: gender,
      price: price,
      category: category
    }
    fetch("http://localhost:3000/cart", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(cartItem)
    })

  }

  function addLikes() {
    const newLikes = boardLikes + 1

    fetch(`http://localhost:3000/snowboards/${id}`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({likes:newLikes})
    })
    .then(r => r.json())
    .then(data => {
      countLikes(data)
      setBoardLikes(newLikes)

    })
  }
  function handleDelete() {
    removeBoard(id)
    fetch(`http://localhost:3000/snowboards/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
  }

  return (
<Card style={{ width: '10rem' }}>
      <Card.Body>
        <Card.Title>{brand}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{gender}</Card.Subtitle>
        <Card.Img className='img-fluid' style={{ width: "auto", height: "200px",  }} src={image} alt={description} />
        <Card.Text>
          {description} <br />
          {year}
        </Card.Text>
        <Card.Text>{`$ ${price}.00`}</Card.Text>
        <Button variant="primary" onClick={addLikes}>
          💙 {boardLikes}
        </Button>
        <Button onClick={addToCart} variant="success">Add to Cart</Button>
        <Button variant="danger" onClick={() => handleDelete(id)}>
          X
        </Button>
      </Card.Body>
    </Card>
  )
}

export default SnowboardCard
