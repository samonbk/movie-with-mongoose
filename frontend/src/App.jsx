import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./Page/Home.jsx";
import Movie from "./Page/Movie.jsx";
import TvShow from "./Page/TvShow.jsx";
import Genere from "./Page/Genere.jsx";
import MoviePlay from "./Component/MoviePlay/MoviePlay.jsx";
import GenereAll from "./Component/GenerePage/GenereAll.jsx";
import GenereScifi from "./Component/GenerePage/GenereScifi.jsx";
import GenereCartoon from "./Component/GenerePage/GenereCartoon.jsx";
import GenereAction from "./Component/GenerePage/GenereAction.jsx";
import GenereRomance from "./Component/GenerePage/GenereRomance.jsx";
import DashBoard from "./Component/Admin/DashBoard.jsx";
import Login from "./Component/Admin/Login.jsx";
import Signup from "./Component/Admin/Signup.jsx";
import Layout from "./Layout/Layout.jsx";
import Error from "./Component/Error/Error.jsx";
import About from "./Page/About.jsx";
import Profile from "./Component/Admin/Profile.jsx";
import GenereHorror from "./Component/GenerePage/GenereHorror.jsx";
import DashboardLayout from "./Component/Admin/DashboardLayout.jsx";
import Table from "./Component/Admin/Table.jsx";
import AddMovie from "./Component/Admin/AddMovie.jsx";
import UpdateMovie from "./Component/Admin/UpdateMovie.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />} errorElement={<Error />}>
          <Route index element={<Home />} />
          <Route path="/movie/page/:pageId" element={<Movie />} />
          <Route path="/movie/playpage/:name" element={<MoviePlay />} />
          <Route path="/tv-show/playpage/:name" element={<MoviePlay />} />
          <Route path="/tv-show/page/:pageId" element={<TvShow />} />
          <Route path="/about" element={<About />} />
          <Route path="/genere" element={<Genere />}>
            <Route index element={<GenereAll />} />
            <Route path="sci-fi" element={<GenereScifi />} />
            <Route path="cartoon" element={<GenereCartoon />} />
            <Route path="action" element={<GenereAction />} />
            <Route path="romance" element={<GenereRomance />} />
            <Route path="horror" element={<GenereHorror />} />
          </Route>
        </Route>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="table" element={<Table />} />
          <Route path="add_movie" element={<AddMovie />} />
          <Route path="update_movie/:id" element={<UpdateMovie />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
