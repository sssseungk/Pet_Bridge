import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/Auth";
import router from "./routes";

function App() {

  return (
    <>
      <AuthProvider>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </>
  )
}

export default App