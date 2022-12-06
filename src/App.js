
import './App.css';
import Table from './Components/Home';

export const config = {
  backendpoint: "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
}

function App() {
  return (
    <div className='App'>
      <Table />
    </div>
  );
}

export default App;
