// Composant Tbody
class Tbody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 3000);
  }
  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <tr aria-hidden="true">
          <td colSpan="4" className="card-body">
            <p className="card-text placeholder-glow">
              {this.props.table.map((todo) => (
                <span className="placeholder rounded py-3 my-1 col-12"></span>
              ))}
            </p>
          </td>
        </tr>
      );
    }
    return (
      <tbody>
        {this.props.table.map((todo) => (
          <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.userId}</td>
            <td>{todo.title}</td>
            <td className="bg-primary text-white text-center">
              {todo.completed ? 'True' : 'False'}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

// Composant Tableau
class Tableau extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="p-3  border-opacity-25 m-auto table-responsive-md shadow ">
        <h4 className="p-2 my-4 bg-primary text-light text-center">
          Récupération des données de l'API Placeholder
        </h4>
        <table className="w-100 table table-striped table-hover border ">
          <thead className="border">
            <tr className="border border-black border-start-0 border-top-0 border-end-0 border-1">
              <th className="fw-bold p-2 ">User Id</th>
              <th className="fw-bold p-2 ">Id</th>
              <th className="fw-bold p-2 ">Todo</th>
              <th className="fw-bold p-2 ">Completed</th>
            </tr>
          </thead>
          <Tbody table={this.props.table} />
        </table>
      </div>
    );
  }
}

// Composant de base
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => {
        data.map((tab) => {
          this.setState((prev) => ({
            table: [...prev.table, tab],
          }));
        });
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des données de l'API.",
          error
        );
      });
  }
  render() {
    return (
      <div className="container">
        <Tableau table={this.state.table} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
