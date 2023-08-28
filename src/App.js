
import './App.css';
import {useState, useEffect} from 'react';
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from "react-icons/bs";

//Constante URL da API
const API = "http://localhost:5000";

function App() {

  //consulta o título e atualiza o valor do titulo assim coomo os demais "" string vazia 
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  // [] array vazio para ser inserido os todos aqui dentro
  const [todos, setTodos] = useState([]);
  // loading animation valor false
  const [loading, setLoading] = useState(false);

  // Load todos on page load  
  useEffect(() => {

    // função que utiliza o fecth API e traz os dados
    const loadData = async() =>{

      setLoading(true);
      // variavel que guardar os dados do fecth, não configura a requisição pois o padrão e GET
      const res = await fetch(API + "/todos")
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
      
      setLoading(false);

      setTodos(res);
      
    };

    loadData();
    
  }, []); // => array de dependencias quando está vazio a página recarrega

  // parametro "e" não permite recarregar a página quando envia o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    }

    //envio POST para API
    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },

    });

    // prevState atualiza com estado anterior ao State, quando clica no submit a tarefa e atualizada
    setTodos((prevState) => [...prevState, todo]);

    // ao clicar no submit torna o input vazio novamente;
    setTitle("");
    setTime("");

  };

  const handleDelete = async (id) => {
    //envio DELETE para API
    await fetch(API + "/todos/" + id, {
      method: "DELETE",
      
    });
    // função em que pega todos os todos e faz a comparação, se o ID for diferente o que veio pela requisição, retorno o todo se não fica sem retorno
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };  

  const handleEdit = async (todo) => {
    // troca e destroca todo
    todo.done = !todo.done;

    //envio UPDATE para API
    const data = await fetch(API + "/todos/" + todo.id, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodos((prevState) =>
      prevState.map((t) => (t.id === data.id ? (t = data) : t))
    );

  };

  // condição para não mostrar o paragrafo "não há tarefas", e somente "Carregando..."
  // NÃO FUNCIONOU
  if(loading){
    return (<p>Carregando...</p>);
  }

  return (
    <div className="App">
      <div className="tabela-app">
        <div className="todo-header">
          <h1>APP Todo</h1>
        </div>
        <div className="form-todo">
          <h2>Insira a sua próxima tarefa:</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="title">O que você vai fazer?</label>
              <input 
              type="text" 
              name="title" 
              placeholder="Título da tarefa"
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
              required
              />
            </div>
            <div className="form-control">
              <label htmlFor="time">Duração:</label>
              <input 
              type="text" 
              name="time" 
              placeholder="Tempo estimado (em horas)"
              onChange={(e) => setTime(e.target.value)}
              value={time || ""}
              required
              />
            </div>
            <input type="submit" value="Criar Tarefa"/>
          </form>
        </div>
        <div className="list-todo back-table">
          <h2>Lista de Tarefas:</h2>
          {todos.length === 0 && <p>Não há tarefas!</p>}
          <table className="tg-prev">
            <thead>
              <tr>
                <th className="tg-9kle">Tarefa</th>
                <th className="tg-9kle">Duração</th>
                <th className="tg-9h44">Feito</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                  <tr className="tg-73oq" key= {todo.id}>
                    <td className={todo.done ? "todo-done" : ""}>{todo.title}</td>
                    <td>{todo.time}</td>
                    <td>
                      <div className="actions">
                        <span onClick={() => handleEdit(todo)} className="mark">
                        {!todo.done ? <BsBookmarkCheck/> : <BsBookmarkCheckFill/>}</span>
                        {/* Função como arrow function porque só será executada quando o usuário clicar, diferentemente de usar handleDelete direto porque ao ler o componente executa direto */}
                        <span className="lixeira"><BsTrash onClick={() => handleDelete(todo.id)} /></span>
                      </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
