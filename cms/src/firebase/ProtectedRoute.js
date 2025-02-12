import { useEffect, useState } from "react";
import { auth, db } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const [isAllowed, setIsAllowed] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists() && userDoc.data().role === requiredRole) {
        setIsAllowed(true);
      } else {
        navigate("/unauthorized"); // Redirect non-admins
      }
    };
    checkUserRole();
  }, [navigate, requiredRole]);

  return isAllowed ? children : null;
};

export default ProtectedRoute;