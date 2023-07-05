import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <header className="flex p-5 items-center justify-between border-b-2  bg-slate-900 text-white">
      <Link to="/">
        <h1 className="text-3xl">Work Lab</h1>
      </Link>
      <nav>
        {user?.email && (
          <div>
            <span className="mr-2">{user?.email}</span>
            <button
              className=" transition ease-in-out duration-75 hover:scale-110 border border-amber-700 rounded-lg text-center px-2 py-1 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500 font-semibold"
              onClick={handleClick}
            >
              Log Out
            </button>
          </div>
        )}
        {!user?.email && (
          <div className="grid grid-cols-2 gap-2">
            <Link
              className=" transition ease-in-out duration-75 hover:scale-110 border border-cyan-700 rounded-lg text-center px-2 py-1 bg-gradient-to-tr from-emerald-300 via-blue-500 to-purple-600 hover:from-purple-600 hover:to-green-300 font-semibold "
              to="/signup"
            >
              Sign up
            </Link>
            <Link
              className=" transition ease-in-out duration-75 hover:scale-110 border border-emerald-700 rounded-lg text-center px-2 py-1 bg-gradient-to-tr from-emerald-500 to-emerald-700 hover:from-emerald-700 hover:to-emerald-500 font-semibold "
              to="/login"
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
