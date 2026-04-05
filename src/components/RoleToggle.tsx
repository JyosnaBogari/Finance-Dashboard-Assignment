import { Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore, Role } from "@/store/useStore";

const RoleToggle = () => {
  const role = useStore((s) => s.role);
  const setRole = useStore((s) => s.setRole);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={role === "admin" ? "default" : "outline"}
        size="sm"
        onClick={() => setRole("admin")}
      >
        <Shield className="h-4 w-4 mr-1" /> Admin
      </Button>
      <Button
        variant={role === "viewer" ? "default" : "outline"}
        size="sm"
        onClick={() => setRole("viewer")}
      >
        <Eye className="h-4 w-4 mr-1" /> Viewer
      </Button>
    </div>
  );
};

export default RoleToggle;
