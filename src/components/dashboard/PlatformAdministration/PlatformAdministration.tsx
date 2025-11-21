import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Shield,
  Activity,
  Database,
  Clock,
  Lock,
  RefreshCcw,
  Trash2,
  Info,
  RotateCcw,
} from "lucide-react";

export default function PlatformAdministration() {
  const items = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Users",
      desc: "View and update your system users",
      path: "/dashboard/CustomerManagement",
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Roles And Permissions",
      desc: "View and update your roles and permissions",
      path: "/dashboard/AdminRole",
    },
    {
      icon: <Activity className="w-6 h-6 text-blue-600" />,
      title: "Activity Logs",
      desc: "View and delete your system activity logs",
      path: "/admin/activity-logs",
    },

    {
      icon: <Database className="w-6 h-6 text-blue-600" />,
      title: "Backup",
      desc: "Backup database and uploads folder.",
      path: "/admin/backup",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Cronjob",
      desc: "Cronjob allow you to automate certain commands or scripts on your site.",
      path: "/admin/cronjob",
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-600" />,
      title: "Security Settings",
      desc: "Manage cookie security and HTTP headers",
      path: "/admin/security-settings",
    },

    {
      icon: <RefreshCcw className="w-6 h-6 text-blue-600" />,
      title: "Cache Management",
      desc: "Clear cache to make your site up to date.",
      path: "/admin/cache",
    },
    {
      icon: <Trash2 className="w-6 h-6 text-blue-600" />,
      title: "Cleanup System",
      desc: "Cleanup your unused data in database",
      path: "/admin/cleanup",
    },
    {
      icon: <Info className="w-6 h-6 text-blue-600" />,
      title: "System Information",
      desc: "All information about current system configuration.",
      path: "/admin/system-info",
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-blue-600" />,
      title: "System Updater",
      desc: "Update your system to the latest version",
      path: "/admin/updater",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Platform Administration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <Link
            to={item.path}
            key={i}
            className="flex items-start gap-3 p-4 bg-white rounded-lg border hover:shadow-md transition cursor-pointer"
          >
            <div className="bg-blue-100 p-2 rounded-md">{item.icon}</div>

            <div>
              <h3 className="font-semibold text-[16px]">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
