// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import './App.scss';
import ColorBox from './components/ColorBox';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import PostList from './components/PostList';
import Pagination from './components/Pagination'
import PostFilterForms from './components/PostFilterForms';
import Clock from './components/Clock';
import BetterClock from './components/BetterClock';


function App() {

  const [todoList, setTodoList] = useState([
    {id:1, title:'I luv u 3000'},
    {id:2, title:'I miss u so much'},
    {id:3, title:'I want to kiss u'},
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _limit:10,
    _page:1,
  });

  useEffect(() => {
    async function fetchPostList() {
      try{
        const paramString = queryString.stringify(filters);
        const requestURL = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const respone = await fetch(requestURL);
        const responeJSON = await respone.json();
        console.log({responeJSON});
      
        const {data, pagination} = responeJSON;
        console.log('PostList effect');
        setPostList(data);
        setPagination(pagination);
      }catch(error){
        console.log('Failed to fetch post list', error.message);
      }
    }
    fetchPostList();
  }, [filters]);

  useEffect(() => {
    console.log('ToDoList effect');
  });

  function handelPageChange(newPage) {
    console.log('New page: ',newPage);
    setFilters({
      ...filters,
      _page: newPage,
    })
  }

  function handleToDoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex( x =>x.id === todo.id );
    if(index < 0) return;

    const newToDoList = [...todoList];
    newToDoList.splice(index,1);
    setTodoList(newToDoList);
  }

  function handleTodoForm(formValue) {
    console.log('Form submit: ', formValue);
    // add new todo to current todo list
    const newTodo = {
      id:todoList.length + 1,
      ...formValue,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handleFiltersChange(newFilters) {
    console.log('New: ', newFilters);
    setFilters({
      ...filters,
      _page:1,
      title_like: newFilters.searchTerm
    });
  }

  const [showClock, setShowClock] = useState(true);

  return (
    <div className="App">
      <h1>React Hook - Clock</h1>
      {/* <ColorBox/> */}
      
      {/* <TodoForm onsubmit={handleTodoForm}/>
      <TodoList todos={todoList} onToDoClick={handleToDoClick}/> */}
      {/* <PostFilterForms onSubmit={handleFiltersChange}/>
      <PostList posts={postList}/>
      <Pagination
        pagination = {pagination}
        onPageChange = {handelPageChange}
      /> */}
      {showClock && <Clock/>}
      <BetterClock/>
      <div>
        <button onClick={() => setShowClock(false)}>
          Hide clock
        </button>
      </div>
      
    </div>
  );
}

export default App;
