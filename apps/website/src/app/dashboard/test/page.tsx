import {
  AlertTriangle,
  Ghost,
  HelpCircle,
  Layers,
  List,
  ListCollapse,
  Menu,
  MessageSquare,
  Minus,
  MousePointerClick,
  PanelRight,
  Square,
  Tag,
  TextCursor,
  ToggleRight,
  Type,
  User,
  UserCircle,
} from "lucide-react";

export default function IndexesPage() {
  const components = [
    {
      title: "Accordion",
      href: "/dashboard/test/accordion",
      icon: ListCollapse,
    },
    { title: "Alert", href: "/dashboard/test/alert", icon: AlertTriangle },
    { title: "Avatar", href: "/dashboard/test/avatar", icon: UserCircle },
    { title: "Badge", href: "/dashboard/test/badge", icon: Tag },
    {
      title: "Button",
      href: "/dashboard/test/button",
      icon: MousePointerClick,
    },
    { title: "Card", href: "/dashboard/test/card", icon: Square },
    { title: "Dialog", href: "/dashboard/test/dialog", icon: MessageSquare },
    {
      title: "Dropdown Menu",
      href: "/dashboard/test/dropdown-menu",
      icon: Menu,
    },
    { title: "Input", href: "/dashboard/test/input", icon: TextCursor },
    { title: "Label", href: "/dashboard/test/label", icon: Type },
    { title: "Select", href: "/dashboard/test/select", icon: List },
    { title: "Separator", href: "/dashboard/test/separator", icon: Minus },
    { title: "Sheet", href: "/dashboard/test/sheet", icon: PanelRight },
    { title: "Skeleton", href: "/dashboard/test/skeleton", icon: Ghost },
    { title: "Switch", href: "/dashboard/test/switch", icon: ToggleRight },
    { title: "Tabs", href: "/dashboard/test/tabs", icon: Layers },
    { title: "Tooltip", href: "/dashboard/test/tooltip", icon: HelpCircle },
    { title: "User Menu", href: "/dashboard/test/user-menu", icon: User },
  ];

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
          UI Component Laboratory
        </h1>
        <p className="text-zinc-500 max-w-2xl">
          Test and preview all UI components.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Components</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {components.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="p-4 rounded-xl border border-white/5 bg-zinc-900/20 hover:bg-white/5 hover:border-cyan-500/30 transition-all group flex flex-col gap-3 items-center justify-center text-center h-32"
            >
              <item.icon className="w-8 h-8 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
              <span className="font-bold text-zinc-400 group-hover:text-white transition-colors">
                {item.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
