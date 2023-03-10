import React, {useState, useEffect} from 'react'
import SnowboardCard from './SnowboardCard'
import AddNewSnowboardForm from './AddNewSnowboardForm'
import SnowBoardSearch from './SnowBoardSearch'
import { Row, Col } from 'react-bootstrap';

function SnowboardMerch({snowboardUrl}) {
    const [snowboardsList, setSnowboardsList] = useState([])
    const [query, setQuery] = useState('')
    const [showForm, setShowForm] = useState(false);

    function removeBoard (doomedId) {
      const newList = snowboardsList.filter(boardObj => {
        return boardObj.id !== doomedId
      })
      setSnowboardsList(newList)
    }
    function countLikes (likedObj){
      const merchLiked = [...snowboardsList].map(merchObj => {
        if(merchObj.id === likedObj.id){
          return likedObj
        }else{
          return merchObj
        }
      })
      setSnowboardsList(merchLiked)
    }

    function addToState (boardObj){
        setSnowboardsList([boardObj, ...snowboardsList])
    }
    useEffect(()=> {
        fetch(snowboardUrl )
          .then(r=>r.json())
          .then((boardsData) => {

            setSnowboardsList(boardsData)
          })
      },[])

      const search = snowboardsList.filter((snowboard) =>
                     snowboard.brand.toLowerCase().includes(query) ||
                     snowboard.description.toLowerCase().includes(query) ||
                     snowboard.category.toLowerCase().includes(query) ||
                     snowboard.gender.toLowerCase().includes(query) ||
                     snowboard.price.toString().includes(query) ||
                     snowboard.year.toString().includes(query)
      )

      const snowboardComponents = search.map(snowboard => {
        return (
          
            <Col xs={12} md={4}>
              <SnowboardCard key={snowboard.id} {...snowboard} removeBoard={removeBoard} countLikes={countLikes}/>            </Col>
         
        )
      })
      function handleClick() {
        setShowForm((showForm) => !showForm);
      }

  return (
    <div>
        {showForm ? <AddNewSnowboardForm addToState={addToState}/> : null}
        <div className="buttonContainer">
          <button className='rounded' onClick={handleClick}>{showForm ? "Hide Form" : "Add A Snowboard"}</button>
        </div>
        <SnowBoardSearch query={query} setQuery={setQuery}/>
        <br/>
        <br/>
        <Row className="justify-content-md-center">
          {snowboardComponents}
        </Row>

    </div>

  )
}

export default SnowboardMerch