import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Main from "./features/main/Main";
import Home from "./ui/Home";
import Explainer from "./features/main/Explainer";
import HistoryItem from "./features/history/HistoryItem";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CollectionItem from "./features/history/CollectionItem";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { element: <Home />, path: "/" },
      {
        element: <Main />,
        path: "/main",
        children: [
          { element: <Explainer />, path: "explainer" },
          { element: <HistoryItem />, path: "history/:historyId" },
          {
            element: <CollectionItem />,
            path: "collection/:collectionName/:explainedId",
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          success: { duration: 1000 },
        }}
        position="top-center"
      />
    </QueryClientProvider>
  );
}

export default App;
