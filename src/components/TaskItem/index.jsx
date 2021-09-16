import styles from './TaskItem.module.scss';
import FormAdd from "../FormAdd";
import {useState} from 'react';

function TaskItem({id, data, checked, ...props}){
  let [showDetail, setShowDetail] = useState(false);

  const ShowHideFormUpdate = () => {
    setShowDetail(!showDetail);
  }

  const removeItem = () => {
    checked = false
    props.onDelete(id);
  };

  const updateItem = (data) => {
    props.onUpdate(data)
  }

  const chooseItem = (e) => {
    checked = e.target.checked;
    props.onChoose({
      checked : e.target.checked,
      id : id
    });
  }

  return(
    <div className={`${styles.wrap}`} >
      <div className={styles.box}>
        <div className={styles.checkbox}>
          <input type="checkbox" onChange={chooseItem} checked={checked}/>
        </div>
        <div className={styles.title}>
          <h4>{data.name ?? ''} <small style={{fontSize: "14px"}}>(Due: {data.due})</small></h4>
        </div>
        <div className={styles.action}>
          <button className="btn btn-success" onClick={ShowHideFormUpdate}>{showDetail ? 'Close detail' : 'Detail'}</button>
          <button className="btn btn-danger" onClick={removeItem}>Remove</button>
        </div>
      </div>
      {
        showDetail ? (
          <div className={styles.detail}>
            <FormAdd type="update" id={id} data={data} onUpdate={updateItem}/>
          </div>
        ) : ''
      }
    </div>
  )
}

export default TaskItem;
