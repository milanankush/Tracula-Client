import './App.css';
import Home from './pages/Home';
import Login from './pages/users/Login';
import Register from './pages/users/Register';
import AddIncome from "./pages/income/AddIncome";
import AddExpense from "./pages/expense/AddExpense";
import Profile from "./pages/users/Profile";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from './components/Navigation/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import NotAdmin from "./components/NotAdmin";
import DashboardData from './pages/users/DashboardData';
import AdminRoute from './components/Navigation/Private/AdminRoute';
import ExpensesList from './pages/expense/ExpensesList';
import IncomeList from './pages/income/IncomeList';
import EditContent from './components/EditContent';
import UserProfileExpList from './pages/users/UserProfileExpList';
import UserProfileIncList from './pages/users/UserProfileIncList';
import UpdateProfile from './pages/users/UpdateProfile';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <AdminRoute exact path="/expenses" component={ExpensesList} />
        <AdminRoute exact path="/incomes" component={IncomeList} />
        <ProtectedRoute exact path="/user-income" component={UserProfileIncList} />
        <ProtectedRoute exact path="/user-expenses" component={UserProfileExpList} />
        <Route exact path= '/edit' component={EditContent} />
        <ProtectedRoute exact path= '/update-profile' component={UpdateProfile} />
        <AdminRoute exact path="/dashboard" component={DashboardData} />
        <Route exact path="/not-found" component={NotAdmin} />
        <ProtectedRoute exact path="/add-income" component={AddIncome} />
        <ProtectedRoute exact path="/add-expense" component={AddExpense} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
