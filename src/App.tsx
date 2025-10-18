import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { lazy, Suspense } from "react";

// Lazy load route components for code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Agents = lazy(() => import("./pages/Agents"));
const CreateAgent = lazy(() => import("./pages/CreateAgent"));
const Knowledge = lazy(() => import("./pages/Knowledge"));
const Tools = lazy(() => import("./pages/Tools"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen w-full bg-background">
    <Sidebar />
    <main className="flex-1 p-8">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-pulse text-muted-foreground">Loading...</div></div>}>
        {children}
      </Suspense>
    </main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/agents" element={<Layout><Agents /></Layout>} />
          <Route path="/agents/new" element={<Layout><CreateAgent /></Layout>} />
          <Route path="/agents/:id/edit" element={<Layout><CreateAgent /></Layout>} />
          <Route path="/knowledge" element={<Layout><Knowledge /></Layout>} />
          <Route path="/tools" element={<Layout><Tools /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
