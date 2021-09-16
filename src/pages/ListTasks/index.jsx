import {useState, useEffect} from 'react';
import TaskItem from "../../components/TaskItem";
import styles from './ListTask.module.scss';
import {NavLink} from 'react-router-dom';
import {softListTask} from "../../helper/helper";
import {Row, Col} from "react-bootstrap";

function ListTasks(){

  let [listData, setListData] = useState(JSON.parse(window.localStorage.getItem('data') ?? '[]'));
  // let [listDataFilter, setListDataFilter] = useState([...listData]);
  let [dataChoose, setDataChoose] = useState([]);

  const removeItemChoose = (listChoose, id) => {
    let index = listChoose.indexOf(id);
    if (index > -1) {
      listChoose.splice(index, 1);
    }
    setDataChoose(listChoose);
  }

  const onDeleteItem = (id) => {
    let list = [...listData];
    let listChoose = [...dataChoose];

    list.splice(id, 1);
    let listDataSort = softListTask(list);
    setListData(listDataSort)
    if (listChoose.includes(id)){
      removeItemChoose(listChoose, id)
    }
    window.localStorage.setItem('data', JSON.stringify(listDataSort));
  }

  const onUpdateItem = (data) => {
    setListData(data);
  }

  const onChooseItem = (data) => {
    let listChoose = [...dataChoose];
    if (data.checked){
      if (!listChoose.includes(data.id)){
        listChoose.push(data.id)
        setDataChoose(listChoose);
      }
    }else {
      removeItemChoose(listChoose, data.id)
    }
  }

  const onDeleteItemsChoose = () => {
    let list = [...listData];
    let listChoose = [...dataChoose];
    dataChoose.map((value) => {
      let index = listChoose.indexOf(value);
      if (index > -1) {
        list.splice(index, 1);
        listChoose.splice(index, 1)
      }
    })

    let listDataSort = softListTask(list);
    setListData(listDataSort);
    setDataChoose(listChoose);
    window.localStorage.setItem('data', JSON.stringify(listDataSort));
  }

  const filterTasks = (e) => {
    let val = e.target.value;

    let listTaskFilter = listData.filter((task) => {
      return task.name.includes(val)
    })

    // setListDataFilter(listTaskFilter)

  }

  let renderList = listData.map((item, inx)=>{
    return <TaskItem key={inx}
                     id={inx}
                     data={item}
                     // filterShow={listDataFilter.includes(item)}
                     checked={dataChoose.includes(inx)}
                     onChoose={onChooseItem}
                     onDelete={onDeleteItem}
                     onUpdate={onUpdateItem}/>
  })

  return(
    <div className={styles.layout}>
      <h1 className={styles.title}>List Tasks</h1>
      <Row>
        <Col>
          <input type="text" placeholder="Nhập từ khoá tìm kiếm" className="form-control" onKeyUp={filterTasks}/>
        </Col>
        <Col>
          <div className={styles.action}>
            {
              dataChoose.length ? (
                <>
                  <button className="btn btn-success">Done</button>
                  <button className="btn btn-danger" onClick={onDeleteItemsChoose}>Delete</button>
                </>
              ) : ''
            }
            <NavLink to="/create" className="btn btn-info">+ Thêm mới</NavLink>
          </div>
        </Col>
      </Row>
      <hr/>
      {renderList.length ? renderList : "Empty list"}
    </div>
  )
}

export default ListTasks
