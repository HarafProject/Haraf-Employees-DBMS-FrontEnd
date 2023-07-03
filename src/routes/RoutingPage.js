// import { Children } from "react";
import {
  createBrowserRouter,
  Route,
  // Router,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";




const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path="/">
    //   <Route path="/" element={<LandingPage />} ></Route>
    //   <Route path="/login" element={<LoginForm />}>
    //   </Route>
    //   <Route path="/register" element={<Registration />} >

    //   </Route>
    //   <Route path="dashboard/*" element={<Dashboard />} />
    // </Route>
  )
)

function RoutingPage({ user }) {
  return (
    <div>

      <RouterProvider router={router} context={{ user }} />
    </div>
  )
}
export default RoutingPage;
