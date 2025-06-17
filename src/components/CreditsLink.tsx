
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const CreditsLink = () => {
  return (
    <Link to="/credits" className="hidden">
      <Button variant="ghost" size="sm">
        <Info className="w-4 h-4 mr-2" />
        Créditos
      </Button>
    </Link>
  );
};

export default CreditsLink;
