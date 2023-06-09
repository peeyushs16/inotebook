import { Notes } from './Notes';

const Home = () => {
  return (
    <>
      <div className="container my-3">
        <h4>Add Notes</h4>
          <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
    </div>
    
    <div className="container">
    <Notes />
    </div>
    </>
  )
}

export default Home