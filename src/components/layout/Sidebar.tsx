import { NavLink } from "react-router-dom";
import { Bot, Home, Settings, Database, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Agents", href: "/agents", icon: Bot },
  { name: "Knowledge Bases", href: "/knowledge", icon: Database },
  { name: "Tools", href: "/tools", icon: Wrench },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Bedrock Studio
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Agent Management</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-sidebar-accent",
                isActive
                  ? "bg-sidebar-accent text-primary font-medium"
                  : "text-sidebar-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-card rounded-lg p-4 shadow-card">
          <p className="text-xs text-muted-foreground">AWS Region</p>
          <p className="text-sm font-medium mt-1">us-east-1</p>
        </div>
      </div>
    </aside>
  );
};
