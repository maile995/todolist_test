import {Col, Row} from "react-bootstrap";
import moment from "moment";
import {useState} from "react";
import {Redirect} from 'react-router-dom';
import Swal from "sweetalert2";
import {softListTask} from "../../helper/helper";

function FormAdd({type='', id="", data={}, ...props}){
  let [redirect, setRedirect] = useState(false)
  let [inputDate, setInputDate] = useState(data.due ?? moment().format('yyyy-MM-DD'));
  let [nameValid, setNameValid] = useState('');

  const handleChange = (event) => {
    setInputDate(event.target.value);
  }

  const submitForm = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    if (formData.get('name')){
      setNameValid('')
      let dataAdd = {
        name: formData.get('name'),
        desc: formData.get('desc'),
        due: formData.get('due'),
        priority: formData.get('priority')
      }

      let dataStorage = window.localStorage.getItem('data') ?? '[]';
      dataStorage = JSON.parse(dataStorage);
      if (Array.isArray(dataStorage)){
        switch (type){
          case "update":
            dataStorage[id] = dataAdd;
            dataStorage = softListTask(dataStorage)
            window.localStorage.setItem('data', [JSON.stringify(dataStorage)])
            props.onUpdate(dataStorage)
            break;
          default:
            dataStorage.push(dataAdd);
            dataStorage = softListTask(dataStorage);
            window.localStorage.setItem('data', [JSON.stringify(dataStorage)])
            Swal.fire({
              icon: "success",
              title: 'Add Task success',
            }).then(()=>{
              setRedirect('/');
            })
        }
      }else {
        console.log('Error: Data in LocalStorage is not array!')
      }
    }else {
      setNameValid('Trường tên không được để trống!')
    }
  }


  if (redirect){
    return <Redirect to={redirect}/>
  }else {
    return(
      <form onSubmit={submitForm}>
        <div className="form-group mb-3">
          <label htmlFor="task_name" className="form-label">Task title</label>
          <input type="text" name="name" id="task_name" defaultValue={data.name ?? ''} placeholder="Add new task..." className="form-control"/>
          <div className="invalid-feedback d-block">{nameValid}</div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="task_desc" className="form-label">Description</label>
          <textarea name="desc" id="task_desc" rows="5" placeholder="Desc..." className="form-control" defaultValue={data.desc ?? ''}/>
        </div>
        <Row>
          <Col sm={6}>
            <div className="form-group mb-3">
              <label htmlFor="task_due" className="form-label">Due Date</label>
              <input type="date"
                     name="due"
                     id="task_due"
                     className="form-control"
                     onChange={handleChange}
                     min={moment().format('yyyy-MM-DD')}
                     value={inputDate}/>
            </div>
          </Col>
          <Col sm={6}>
            <div className="form-group mb-3">
              <label htmlFor="task_priority" className="form-label">Priority</label>
              <select name="priority" id="task_priority" className="form-control" defaultValue={data.priority ?? 2}>
                <option value="1">Low</option>
                <option value="2">Normal</option>
                <option value="3">High</option>
              </select>
            </div>
          </Col>
        </Row>
        <button type="submit" className="btn btn-primary d-block w-100">Add</button>
      </form>
    )
  }
}

export default FormAdd
