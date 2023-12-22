import { lazy } from "react";

const Login = lazy(() => import("../views/Login"));
const Information = lazy(() => import("../views/Information"));

// DARAJA 1

const TaskOneQuestion1 = lazy(() =>
  import("../views/Tasks/TaskOne/Question1"),
);
const TaskOneQuestion2 = lazy(() =>
  import("../views/Tasks/TaskOne/Question2"),
);
const TaskOneQuestion3 = lazy(() =>
  import("../views/Tasks/TaskOne/Question3"),
);
const TaskOneQuestion4 = lazy(() =>
  import("../views/Tasks/TaskOne/Question4"),
  );
const TaskOneQuestion5 = lazy(() =>
import("../views/Tasks/TaskOne/Question5"),
);
const TaskTwo = lazy(() => import("../views/Tasks/TaskTwo"));
const TaskThreeQuestion1 = lazy(() =>
import("../views/Tasks/TaskThree/Question1"),
);
const TaskThreeQuestion2 = lazy(() =>
  import("../views/Tasks/TaskThree/Question2"),
);
const TaskThreeQuestion3 = lazy(() =>
  import("../views/Tasks/TaskThree/Question3"),
);
const TaskThreeQuestion4 = lazy(() =>
  import("../views/Tasks/TaskThree/Question4"),
);
const TaskThreeQuestion5 = lazy(() =>
  import("../views/Tasks/TaskThree/Question5"),
);

// DARAJA 2
const ArabicKidsQuestion1 = lazy(() =>
  import("../views/Arabic_kids/TaskOne/Question1"),
);
const ArabicKidsQuestion2 = lazy(() =>
  import("../views/Arabic_kids/TaskOne/Question2"),
);
const ArabicKidsQuestion3 = lazy(() =>
  import("../views/Arabic_kids/TaskOne/Question3"),
);
const ArabicKidsQuestion4 = lazy(() =>
  import("../views/Arabic_kids/TaskOne/Question4"),
  );
const ArabicKidsQuestion5 = lazy(() =>
import("../views/Arabic_kids/TaskOne/Question5"),
);
const ArabicKidsTwo = lazy(() => import("../views/Arabic_kids/TaskTwo"));
const ArabicThreeQuestion1 = lazy(() =>
import("../views/Arabic_kids/TaskThree/Question1"),
);
const ArabicThreeQuestion2 = lazy(() =>
  import("../views/Arabic_kids/TaskThree/Question2"),
);
const ArabicThreeQuestion3 = lazy(() =>
  import("../views/Arabic_kids/TaskThree/Question3"),
);
const ArabicThreeQuestion4 = lazy(() =>
  import("../views/Arabic_kids/TaskThree/Question4"),
);
const ArabicThreeQuestion5 = lazy(() =>
  import("../views/Arabic_kids/TaskThree/Question5"),
);

const Router = lazy(() => import("./Router"));

const Navbar = lazy(() => import("./Navbar"));
const Loading = lazy(() => import("./Loading"));
const ErrorPage = lazy(() => import("./404"));

export {
  Login,
  Information,
  // DARAJA_1
  TaskOneQuestion1,
  TaskOneQuestion2,
  TaskOneQuestion3,
  TaskOneQuestion4,
  TaskOneQuestion5,
  TaskTwo,
  TaskThreeQuestion1,
  TaskThreeQuestion2,
  TaskThreeQuestion3,
  TaskThreeQuestion4,
  TaskThreeQuestion5,
  // DARAJA_2
  ArabicKidsQuestion1,
  ArabicKidsQuestion2,
  ArabicKidsQuestion3,
  ArabicKidsQuestion4,
  ArabicKidsQuestion5,
  ArabicKidsTwo,
  ArabicThreeQuestion1,
  ArabicThreeQuestion2,
  ArabicThreeQuestion3,
  ArabicThreeQuestion4,
  ArabicThreeQuestion5,
  Router,
  Navbar,
  Loading,
  ErrorPage,
};
