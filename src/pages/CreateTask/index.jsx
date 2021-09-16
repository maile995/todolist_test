import FormAdd from "../../components/FormAdd";
import styles from './CreateTask.module.scss';
import {NavLink} from "react-router-dom";


function CreateTask(){
  return (
    <div className={styles.layout}>
      <h1 className={styles.title}>New Task</h1>
      <FormAdd type="add"/>
      <div className="text-center">
        <NavLink to="/">Go to List task</NavLink>
      </div>
    </div>
  )
}

export default CreateTask
