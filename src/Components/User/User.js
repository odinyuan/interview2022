import {useLocalStore , Observer} from 'mobx-react';
import React from 'react';
import Container from '@material-ui/core/Container';
import { Button, Paper } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { makeObservable,observable,computed,action, } from "mobx";
import { TextField } from '@material-ui/core';
import ReactDOM from 'react-dom'
import RenderCounter from 'react-render-counter';



/* const StoreContext = React.createContext();

const StoreProvider = ({children}) => {
  const store = useLocalStore(() => ({
    Todos: ["Learn React"],
    addTodo: (todo_thing) => {
      store.Todos.push(todo_thing);
    },
    get todoCount(){
      return store.Todos.length;
    }
  }));

  return(
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const Todoboard = observer(() =>{
  const store = React.useContext(StoreContext);
  return(
    <h1>There are {store.todoCount} things waited.</h1>
  )

})

const TodoList = observer(() => {
  const store = React.useContext(StoreContext);
  
  return(
    <ul>
      {store.Todos.map(todo_thing => (
      <li key={todo_thing}>{todo_thing}</li>
      ))}
    </ul>
  );
})

const TodoForm = () => {
  const store = React.useContext(StoreContext);
  const [todo_thing, addTodo] = React.useState("");
  return(
    <form
      onSubmit = { e => {
        store.addTodo(todo_thing);
        addTodo("");
        e.preventDefault();
      }}
      >
        <input type="text"
        value={todo_thing}
        onChange={ e => {
          addTodo(e.target.value);
        }}
        />
      
      <Button variant="contained" color="primary" type = "submit">
      Confirm
    </Button>
    </form>
  );
};

export default function Todo(){
  return (
    <Container maxWidth="sm" className="UserPage">
      <Paper>
        <StoreProvider>
          <main>
            <Todoboard />
            <TodoList />
            <TodoForm />
          </main>
        </StoreProvider>
      </Paper>
    </Container> 
  );
} */

class TodoStore {
  todos = [];
  newtodo = 'hello';

  constructor() {
    makeObservable(this, {
      todos: observable,
      completedTodosCount: computed,
      report: computed,
      addTodo: action,
      newtodo: observable
    });
  }

  get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === false
    ).length;
  }

  get report() {
    return `There are ${this.completedTodosCount} todo(s) are waiting`;
    /* if (this.todos.length === 0)
      return "<none>";
    const nextTodo = this.todos.find(todo => todo.completed === false);
    return `Next todo: "${nextTodo ? nextTodo.task : "<none>"}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`; */
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
    });
  }

  changeValue(value){
    this.newtodo = value;
  }

  set settodo(value){
    this.newtodo = value;
  }

}

const todoStore = new TodoStore();
todoStore.addTodo("read MobX tutorial");

const TodoList = observer(({store}) => {



  const onNewTodo = () => {
    store.addTodo(prompt('Enter a new todo:','coffee plz'));
  }


  const onhandleChange = (props) =>{
    store.changeValue(props.value);
  }

  return (
    <div>
      { store.report }
      <ul>
        { store.todos.map(
          (todo, idx) => <TodoView todo={ todo } key={ idx } />
        ) }
      </ul>
      <Button variant="contained" color="primary" onClick={onNewTodo}>
      Add a todo issue.
    </Button>
      <small> (double-click a todo to edit)</small>
      
    </div>
  );
})


const TodoView = observer(({todo}) => {
  const onToggleCompleted = () => {
    todo.completed = !todo.completed;
  }



  return (
    <li>
      <input
        type='checkbox'
        checked={ todo.completed }
        onChange={ onToggleCompleted }
      />
      { todo.task }
      { todo.assignee
        ? <small>{ todo.assignee.name }</small>
        : null
      }
      
    </li>
  );
})



export default function User(){
  const Astore = new TodoStore();
  Astore.addTodo("newone");
  Astore.addTodo("newnewone");
  return(
    <Paper>
      <main>
      < TodoList store = {Astore}/>
      </main>
    </Paper>
    
    
    /* <Paper>
    <ul>
      {store.todos.map(home => <div>{home.task}</div>)}
    </ul>
    </Paper> */
  );
};


/* function User(){
    return (
      <h2>User</h2>
    );
  }
  export default User; */  