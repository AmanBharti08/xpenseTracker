import "./App.css";
import ExpenseTracker from "./Component/ExpenseTracker/ExpenseTracker";
import RecentTransation from "./Component/RecentTransaction";

function App() {
  return (
    <div>
      <ExpenseTracker />
      <div className="belowContainer">
        <RecentTransation />
      </div>
    </div>
  );
}

export default App;
